from django.db import models

class Car(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, default="")
    year = models.CharField(max_length=4, blank=True, default="")
    model = models.CharField(max_length=100, blank=True, default="")
    colour = models.CharField(max_length=12, blank=True, default="")
    mileage = models.CharField(max_length=6, blank=True, default="")
    reg = models.CharField(max_length=20, blank=True, default="")
    cost = models.CharField(max_length=6, blank=True, default="")
    retail = models.CharField(max_length=6, blank=True, default="")
    date = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

class Expense(models.Model):
    id = models.AutoField(primary_key=True)
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name="expenses")
    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]