from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from carmanager.views import CarViewSet, ExpenseDetail, ExpenseList

car_list = CarViewSet.as_view({"get": "list", "post": "create"})

car_detail = CarViewSet.as_view(
    {"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"}
)

urlpatterns = [
    path("cars/", car_list),
    path("cars/<int:pk>/", car_detail),
    path("expenses/", ExpenseList.as_view()),
    path("expenses/<int:pk>/", ExpenseDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)