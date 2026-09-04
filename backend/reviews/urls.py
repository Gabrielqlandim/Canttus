from rest_framework.routers import DefaultRouter
from .views import AvaliacaoReservaViewSet

router = DefaultRouter()
router.register('avaliacoes', AvaliacaoReservaViewSet, basename='avaliacao')
urlpatterns = router.urls