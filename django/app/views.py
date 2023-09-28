from django.shortcuts import render
from django.http import HttpResponse
from django.db.models import Q

from .models import FileUploadForm, FirmContacted
from django.db.models import Q
import json


from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import viewsets
import operator
from functools import reduce


from .serializers import FirmContactedSerializer, FirmSerializer, EmailTemplateSerializer
from .models import Firm, EmailTemplate

from collections import OrderedDict

def to_boolean(string):
    return string == "True"

class EmailTemplateView(viewsets.ModelViewSet):
    pagination_class = None
    serializer_class = EmailTemplateSerializer
    queryset = EmailTemplate.objects.all()


class FirmContactedView(viewsets.ModelViewSet):
    serializer_class = FirmContactedSerializer
    queryset = FirmContacted.objects.all()

    @action(detail=False, methods=['POST'], name='/')
    def update_contacted(self, request):
        try:
            obj, created = FirmContacted.objects.update_or_create(**request.data, defaults={
                "user_id": request.data["user_id"],
                "orgnr": request.data["orgnr"],
                "contacted": not request.data["contacted"]
            })
        except Exception as e:
            return Response(f"Update or create failed: {e}")
        return Response("success")

class FirmView(viewsets.ModelViewSet):
    serializer_class = FirmSerializer
    pagination_class = LimitOffsetPagination
    queryset = Firm.objects.all()


    @action(detail=False, methods=['GET'], name='')
    def custom(self, request):


        queryset = Firm.objects.all().extra(select={'contacted': 'SELECT contacted FROM "app_firmcontacted" WHERE "app_firm".orgnr = "app_firmcontacted".orgnr'})

        if request.GET.get("email", None):
            queryset = queryset.exclude(email="[]")
        if request.GET.get("website", None):
            queryset = queryset.exclude(website="[]")
        if request.GET.get("telephone", None):
            queryset = queryset.exclude(telephone="[]")
        if request.GET.get("naering", None):
            nace_list = request.GET.get("naering").split("æsepæ")
            queryset = queryset.filter(nace__in=nace_list)
        if request.GET.get("employees", None):
            empl = json.loads(request.GET.get("employees"))
            queryset = queryset.filter(employees__gte=empl[0])
            queryset = queryset.filter(employees__lte=empl[1])
        if request.GET.get("municipality", None):
            print(request.GET.get("municipality"))
            municipalities = request.GET.get("municipality").split(",")
            print(municipalities)
            queryset = queryset.filter(municipality_nr__in=municipalities)
        print(queryset.query)
        count = queryset.count()
        queryset = LimitOffsetPagination().paginate_queryset(queryset=queryset, request=request)
        serializer = self.get_serializer(queryset, many=True)
    
        return Response(OrderedDict([
            ("results", serializer.data),
            ("count", count)
        ]))


def index(request):
    items = [f"doc{i}" for i in range(0)]
    if request.method == "POST":

        if request.FILES.get('file', False):

            form = FileUploadForm(request.POST, request.FILES)
            print(form)
            if form.is_valid():
                # Upload to S3 and get path
                path = "s3_path/document.csv"
                model = form.save(commit=False)
                print(model.__dict__)
                model.path = path
                model.save()

            file = request.FILES['file']
            items.append(file)
            return render(request, "app/index.html", {"upload_success": True, "documents": items})

    return render(request, "app/index.html", {"documents": items})
