# Generated by Django 4.2.2 on 2023-08-18 21:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_firmcontacted'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='firmcontacted',
            name='firm',
        ),
        migrations.AddField(
            model_name='firmcontacted',
            name='orgnr',
            field=models.CharField(default='', max_length=50),
        ),
    ]