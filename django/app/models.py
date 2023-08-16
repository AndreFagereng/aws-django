from django.db import models
from django.forms import ModelForm

import time


class Firm(models.Model):
    name = models.CharField(max_length=200)
    orgnr = models.CharField(max_length=50)
    orgtype = models.CharField(max_length=200)
    nace = models.CharField(max_length=200, default=None)
    email = models.CharField(max_length=250)
    telephone = models.CharField(max_length=50)
    website = models.CharField(max_length=200)
    employees = models.IntegerField()
    address = models.CharField(max_length=200, default="Hammersborggata 2")
    postal = models.CharField(max_length=100, default="Oslo")
    postalcode = models.CharField(max_length=10, default="0181")
    municipality = models.CharField(max_length=100, default="Oslo")


class FileUpload(models.Model):
    owner = models.CharField(max_length=50)
    path = models.CharField(max_length=200)
    date = models.DateTimeField("published", auto_now_add=True)

class FileUploadForm(ModelForm):
    class Meta:
        model = FileUpload
        fields = ["owner"]

