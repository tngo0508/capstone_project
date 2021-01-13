from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'stocks', views.StockView, 'stock')
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/getstock/<str:symbol>/', views.get_stock_info),
    path('api/predict/', views.predict_stock)
]
