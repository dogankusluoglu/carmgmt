from rest_framework import serializers
from .models import Vehicle, Expense

class ExpenseSerializer(serializers.ModelSerializer):
    # make the FK read‑only
    vehicle = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Expense
        fields = [
            'id',
            'created_at',
            'vehicle',
            'amount',
            'expense_description',
        ]
        read_only_fields = ('id', 'created_at', 'vehicle')

class VehicleSerializer(serializers.ModelSerializer):
    expenses = ExpenseSerializer(many=True, read_only=True)
    profit   = serializers.SerializerMethodField()

    class Meta:
        model  = Vehicle
        fields = [
            'id', 'created_at', 'vehicle_year', 'make', 'model', 'colour', 
            'mileage', 'origin_location', 'status', 'registration_number', 
            'cost', 'retail_price', 'additional_description', 'salesman', 
            'sold_month', 'expenses', 'profit',
        ]

    def get_profit(self, obj):
        return obj.profit()
