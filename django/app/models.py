from django.db import models
from django.forms import ModelForm

import time


class Firm(models.Model):
    name = models.CharField(max_length=200)
    orgnr = models.CharField(max_length=50, unique=True)
    orgtype = models.CharField(max_length=200)
    nace = models.CharField(max_length=200, default=None)
    email = models.CharField(max_length=250)
    telephone = models.CharField(max_length=50)
    website = models.CharField(max_length=200)
    employees = models.IntegerField()

    stiftelsesdato = models.CharField(max_length=20, default="")

    address = models.CharField(max_length=200, default="")
    postal = models.CharField(max_length=100, default="")
    postalcode = models.CharField(max_length=10, default="")
    municipality = models.CharField(max_length=100, default="")
    municipality_nr = models.CharField(max_length=10, default="")

class FirmContacted(models.Model):
    user_id = models.CharField(max_length=10, default="user_id")
    orgnr = models.CharField(max_length=50, default="")
    contacted = models.BooleanField(default=False)
    # date
    # template used (email, subject, body)


class FileUpload(models.Model):
    owner = models.CharField(max_length=50)
    path = models.CharField(max_length=200)
    date = models.DateTimeField("published", auto_now_add=True)

class FileUploadForm(ModelForm):
    class Meta:
        model = FileUpload
        fields = ["owner"]

