from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404

from rest_framework import generics, permissions, viewsets, status

from rest_framework.views import APIView
from rest_framework.response import Response

from carmanager.models import Car, Expense
from carmanager.serializers import CarSerializer, ExpenseSerializer

class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save()

    def post(self, request, *args, **kwargs):
        serializer = CarSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class ExpenseList(generics.ListCreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer


class ExpenseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    """
    Retrieve, update or delete an expense instance.
    """
    # def get_object(self, pk):
    #     try:
    #         return Expense.objects.get(pk=pk)
    #     except Expense.DoesNotExist:
    #         return Response({'message': 'Expense not found'}, status=status.HTTP_404_NOT_FOUND)

    # def get(self, request, pk, format=None):
    #     expense = self.get_object(pk)
    #     if isinstance(expense, Response):
    #         return expense  # Early return if the expense was not found
    #     serializer = ExpenseSerializer(expense)
    #     return Response(serializer.data)
    

    def delete_expense(request, id):
        if request.method == 'DELETE':
            expense = get_object_or_404(Expense, id=id)
            expense.delete()
            return JsonResponse({'message': 'Expense deleted successfully!'}, status=204)
        else:
            return HttpResponseNotAllowed(['DELETE'])