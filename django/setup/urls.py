"""
URL configuration for setup project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from app import views

router = routers.DefaultRouter()
router.register(r'firms', views.FirmView, 'firm')
router.register(r'contacted', views.FirmContactedView, 'contacted')
router.register(r'template', views.EmailTemplateView, 'template')
#router.register(r'emails', views.get_where_email_exists, 'emails')

urlpatterns = [
    path("hello/", include("app.urls")),
    path('admin/', admin.site.urls),
    path('api/', include((router.urls, "app.urls"))),
]
