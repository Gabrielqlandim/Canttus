from django.urls import path
from .views import AssistenteView

urlpatterns = [
    path('assistente/', AssistenteView.as_view()),
]