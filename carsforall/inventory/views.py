from rest_framework import generics
from .models      import Vehicle, Expense
from .serializers import VehicleSerializer, ExpenseSerializer

# — Vehicle endpoints —
class VehicleListCreateView(generics.ListCreateAPIView):
    queryset         = Vehicle.objects.all()
    serializer_class = VehicleSerializer

class VehicleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset         = Vehicle.objects.all()
    serializer_class = VehicleSerializer

# — Expense endpoints —
class ExpenseListCreateView(generics.ListCreateAPIView):
    queryset         = Expense.objects.all()
    serializer_class = ExpenseSerializer

class ExpenseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset         = Expense.objects.all()
    serializer_class = ExpenseSerializer

# — Nested: list/create expenses for a given vehicle —
class VehicleExpenseListCreateView(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        return Expense.objects.filter(vehicle_id=self.kwargs['pk'])

    def perform_create(self, serializer):
        # override to attach the vehicle
        vehicle = Vehicle.objects.get(pk=self.kwargs['pk'])
        serializer.save(vehicle=vehicle)
