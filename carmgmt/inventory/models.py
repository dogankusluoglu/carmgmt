from django.db import models

# Create your models here.

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class Stock(models.Model):
    mal_no = models.CharField(max_length=50, unique=True)
    model_name = models.CharField(max_length=100)
    status = models.CharField(max_length=50)  # e.g., "sold", "available"
    month = models.CharField(max_length=20)   # e.g., "subat2025"
    cost = models.DecimalField(max_digits=10, decimal_places=2)  # Maliyet

    def __str__(self):
        return f"{self.mal_no} - {self.model_name}"

class Record(models.Model):
    stock = models.ForeignKey(Stock, related_name='records', on_delete=models.CASCADE)
    transaction_type = models.CharField(max_length=50)  # e.g., "expense", "sale"
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_date = models.DateField()
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Record for {self.stock.mal_no} on {self.transaction_date}"

@receiver(post_save, sender=Record)
def update_stock_cost(sender, instance, created, **kwargs):
    if created and instance.transaction_type.lower() == 'expense':
        # Adjust the stock cost; modify the calculation as needed.
        instance.stock.cost += instance.amount
        instance.stock.save()