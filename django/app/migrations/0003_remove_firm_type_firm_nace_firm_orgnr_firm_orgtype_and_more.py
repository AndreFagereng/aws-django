# Generated by Django 4.2.2 on 2023-07-16 20:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_firm_alter_fileupload_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='firm',
            name='type',
        ),
        migrations.AddField(
            model_name='firm',
            name='nace',
            field=models.CharField(default=str, max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='firm',
            name='orgnr',
            field=models.CharField(default=str, max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='firm',
            name='orgtype',
            field=models.CharField(default=str, max_length=200),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='firm',
            name='email',
            field=models.CharField(max_length=250),
        ),
    ]