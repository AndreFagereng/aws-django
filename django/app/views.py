from django.shortcuts import render
from django.http import HttpResponse
from .models import FileUploadForm



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
