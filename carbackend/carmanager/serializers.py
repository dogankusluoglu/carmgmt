from rest_framework import serializers

from carmanager.models import Car, Expense


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'


class CarSerializer(serializers.ModelSerializer):
    expenses = ExpenseSerializer(many=True, read_only=True)

    class Meta:
        model = Car
        fields = ["id", "vin", "carBrand", "created_at", "year", "model", "colour", "mileage", "reg", "cost", "purchasedFrom", "retail", "date", "expenses", "totalSpent", "salesman", "soldDate", "profit", "soldTo", "notes", "status"]