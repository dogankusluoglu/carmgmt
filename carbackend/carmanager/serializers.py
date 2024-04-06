from rest_framework import serializers

from carmanager.models import Car, Expense


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = "_all_"


class CarSerializer(serializers.ModelSerializer):
    expenses = ExpenseSerializer(many=True, read_only=True)

    class Meta:
        model = Car
        fields = ["id", "name", "created_at", "year", "model", "colour", "mileage", "reg", "cost", "retail", "date", "expenses"]