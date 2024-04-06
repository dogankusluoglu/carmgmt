from rest_framework import generics, permissions, viewsets

from carmanager.models import Car, Expense
from carmanager.serializers import CarSerializer, ExpenseSerializer

class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save()

class ExpenseList(generics.ListCreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class ExpenseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer