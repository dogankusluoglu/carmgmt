from django.db import models

class Vehicle(models.Model):
    # Django creates an auto-incrementing primary key field named 'id' automatically.
    created_at = models.DateTimeField(auto_now_add=True)
    vehicle_year = models.IntegerField()
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    colour = models.CharField(max_length=50)
    mileage = models.IntegerField()
    origin_location = models.CharField(max_length=100)
    
    # Free-text status (e.g., 'sold', or a mechanic's name)
    status = models.CharField(max_length=100)
    
    registration_number = models.CharField(max_length=50, blank=True, null=True)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    retail_price = models.DecimalField(max_digits=10, decimal_places=2)
    additional_description = models.TextField(blank=True, null=True)
    
    # For sold vehicles
    salesman = models.CharField(max_length=100, blank=True, null=True)
    sold_month = models.CharField(max_length=20, blank=True, null=True)
    
    def profit(self):
        """
        Calculates profit as retail_price - cost - total expenses,
        but only if the status is 'sold' (case-insensitive).
        """
        total_expense = sum(exp.amount for exp in self.expenses.all())
        return self.retail_price - self.cost - total_expense

    def __str__(self):
        return f"{self.make} {self.model} ({self.vehicle_year})"

class Expense(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name="expenses")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    expense_description = models.TextField()

    def __str__(self):
        return f"Expense for Vehicle ID {self.vehicle.id}: {self.expense_description[:30]}"
