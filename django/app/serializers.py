from rest_framework import serializers
from .models import Firm

class FirmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Firm
        fields = ('name', 'orgnr', 'orgtype', 'nace', 'employees', 'email', 'telephone', 'website')
