from rest_framework import serializers
from .models import Firm, FirmContacted, EmailTemplate

class EmailTemplateSerializer(serializers.ModelSerializer):

    class Meta:
        model = EmailTemplate
        fields = "__all__"

class StrictBooleanField(serializers.BooleanField):
    def from_native(self, value):
        if value in ('true', 't', 'True', '1'):
            return True
        if value in ('false', 'f', 'False', '0'):
            return False
        return None

class FirmContactedSerializer(serializers.Serializer):
    contacted = serializers.BooleanField

    class Meta:
        model = FirmContacted
    

class FirmSerializer(serializers.ModelSerializer):
    contacted = serializers.BooleanField()

    class Meta:
        model = Firm
        fields = ('contacted', 'name', 'orgnr', 'orgtype', 'nace', 'employees', 'email', 'telephone', 'website', 'address', 'postal', 'postalcode', 'municipality')
