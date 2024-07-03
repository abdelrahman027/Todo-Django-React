from django.shortcuts import render

from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import TODO
# Create your views here.

class TodoViewSet(viewsets.ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TodoSerializer

