from rest_framework import routers, urlpatterns
from .api import StockViewSet

router = routers.DefaultRouter()
router.register('api/stocks', StockViewSet, 'stocks')

urlpatterns = router.urls
