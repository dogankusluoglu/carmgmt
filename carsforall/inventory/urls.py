from django.urls import path
from .views import (
    VehicleListCreateView, VehicleDetailView,
    ExpenseListCreateView, ExpenseDetailView,
    VehicleExpenseListCreateView,
)

urlpatterns = [
    # Vehicle CRUD
    path('vehicles/',           VehicleListCreateView.as_view(),      name='vehicle-list'),
    path('vehicles/<int:pk>/',  VehicleDetailView.as_view(),          name='vehicle-detail'),
    # Nested expenses under a vehicle
    path('vehicles/<int:pk>/expenses/', VehicleExpenseListCreateView.as_view(), name='vehicle-expenses'),

    # Expense CRUD
    path('expenses/',           ExpenseListCreateView.as_view(),      name='expense-list'),
    path('expenses/<int:pk>/',  ExpenseDetailView.as_view(),          name='expense-detail'),
]
