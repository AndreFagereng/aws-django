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

class FileUpload(models.Model):
    owner = models.CharField(max_length=50)
    path = models.CharField(max_length=200)
    date = models.DateTimeField("published", auto_now_add=True)

class FileUploadForm(ModelForm):
    class Meta:
        model = FileUpload
        fields = ["owner"]

