from django.shortcuts import render
from .models import Usuario, Perfil, Objetivo, Comunidad, Progreso, Miembro, Entrenador
from .serializers import (
    UsuarioSerializer,
    PerfilSerializer,
    ObjetivoSerializer,
    ComunidadSerializer,
    ProgresoSerializer,
    MiembroSerializer,
    EntrenadorSerializer,
)
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView

class UsuarioCreateView(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class PerfilSerializerView(ListCreateAPIView):
    queryset = Perfil.objects.all()
    serializer_class = PerfilSerializer

class ObjetivoSerializerView(ListCreateAPIView):
    queryset = Objetivo.objects.all()
    serializer_class = ObjetivoSerializer 

class comunidadSerializerView(ListCreateAPIView):
    queryset = Comunidad.objects.all()
    serializer_class = ComunidadSerializer 

class progresoSerializerView(ListCreateAPIView):
    queryset = Progreso.objects.all()
    serializer_class = ProgresoSerializer 

class MiembroSerializerView(ListCreateAPIView):
    queryset = Miembro.objects.all()
    serializer_class = MiembroSerializer 

class RetosSerializerView(ListCreateAPIView):
    # No hay modelo 'Retos' definido en models.py; exponer Entrenador o eliminar esta vista.
    queryset = Entrenador.objects.all()
    serializer_class = EntrenadorSerializer


class UsuarioLoginView(APIView):
    def post(self,request):
        clave = request.data.get("password")
        nombre_usuario = request.data.get("username")

        usuario = authenticate(username=nombre_usuario,password=clave)

        if usuario is not None:
            return Response({
                "mensaje": "usuario valido",
                "id": usuario.id
            })
        else:
            return Response({
                "mensaje": "usuario NO valido"
            })
        
class UsuarioPorId(ListCreateAPIView):
    serializer_class = UsuarioSerializer

    def get_queryset(self):
        id = self.kwargs["id"]
        return Usuario.objects.filter(id=id)




