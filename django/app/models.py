from django.db import models
from django.forms import ModelForm

import time


class FileUpload(models.Model):
    owner = models.CharField(max_length=50)
    path = models.CharField(max_length=200)
    date = models.DateTimeField("published", auto_now_add=True)

class FileUploadForm(ModelForm):
    class Meta:
        model = FileUpload
        fields = ["owner"]

