# Generated by Django 5.0.3 on 2024-04-07 09:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carmanager', '0006_car_purchasedfrom'),
    ]

    operations = [
        migrations.AddField(
            model_name='car',
            name='vin',
            field=models.CharField(blank=True, default='', max_length=80),
        ),
    ]
