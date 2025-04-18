# Generated by Django 5.0.7 on 2025-04-09 17:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mal_no', models.CharField(max_length=50, unique=True)),
                ('model_name', models.CharField(max_length=100)),
                ('status', models.CharField(max_length=50)),
                ('month', models.CharField(max_length=20)),
                ('cost', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Record',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transaction_type', models.CharField(max_length=50)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('transaction_date', models.DateField()),
                ('description', models.TextField(blank=True, null=True)),
                ('stock', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='records', to='inventory.stock')),
            ],
        ),
    ]
