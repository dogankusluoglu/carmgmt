# Generated by Django 5.0.4 on 2024-04-06 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carmanager', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='car',
            name='year',
            field=models.CharField(blank=True, default='', max_length=4),
        ),
    ]
