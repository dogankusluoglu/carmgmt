from django.contrib import admin

# Register your models here.
from .models import Stock, Record

admin.site.register(Stock)
admin.site.register(Record)