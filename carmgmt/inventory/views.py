from django.shortcuts import render

# Create your views here.

# inventory/views.py
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Stock, Record
from .serializers import StockSerializer, RecordSerializer

class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ['mal_no', 'status', 'month', 'model_name']
    ordering_fields = ['cost', 'mal_no']
    filterset_fields = ['status', 'month']

class RecordViewSet(viewsets.ModelViewSet):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ['transaction_type', 'description', 'stock__mal_no']
    ordering_fields = ['transaction_date', 'amount']
    filterset_fields = ['transaction_type', 'stock']
