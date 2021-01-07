from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'stocks', views.StockView, 'stock')
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/getstock/', views.get_stock_info)
]
