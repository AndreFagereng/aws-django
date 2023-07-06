from django.db import models
from django.forms import ModelForm

import time


class Firm(models.Model):
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=200)
    email = models.EmailField()
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

