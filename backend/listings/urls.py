from rest_framework.routers import DefaultRouter
from .views import ImovelViewSet, ImagemImovelViewSet

router = DefaultRouter()
router.register('imoveis', ImovelViewSet)
router.register('fotos', ImagemImovelViewSet, basename='foto')

urlpatterns = router.urls