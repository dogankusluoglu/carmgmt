# Generated by Django 5.0.4 on 2024-04-06 22:15

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carmanager', '0003_car_colour_car_cost_car_date_car_mileage_car_model_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='car',
            name='date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]