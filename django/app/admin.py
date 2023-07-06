from django.contrib import admin

from .models import Firm

class FirmAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'employees', 'email', 'telephone', 'website')

# Register your models here.

admin.site.register(Firm, FirmAdmin)