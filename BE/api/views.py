from django.shortcuts import render
from .models import Usuario, Perfil, Objetivo, Comunidad,Clases, Progreso, Miembro, ComentarioComunidad
from rest_framework.generics import DestroyAPIView
from .serializers import RetoSerializer,ClaseSerializer
from .models import Clases,Retos

from .serializers import (
    UsuarioSerializer,
    PerfilSerializer,
    ObjetivoSerializer,
    ComunidadSerializer,
    ProgresoSerializer,
    MiembroSerializer,
    ClaseSerializer, 
    ComentarioComunidadSerializer,
 
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from rest_framework_simplejwt.tokens import RefreshToken

class UsuarioCreateView(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny]

class ComentarioComunidadCreateView(ListCreateAPIView):
    queryset = ComentarioComunidad.objects.all()
    serializer_class = ComentarioComunidadSerializer

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

class UsuarioLoginView(APIView):
    def post(self,request):
        clave = request.data.get("password")
        nombre_usuario = request.data.get("username")

        usuario = authenticate(username=nombre_usuario,password=clave)

        if usuario is not None:
            token_acceso = RefreshToken.for_user(usuario).access_token
            return Response({
                "mensaje": "usuario valido",
                "id": usuario.id,
                "token": str(token_acceso)
            })
        else:
            return Response({
                "mensaje": "usuario NO valido"
            })
        
class UsuarioPorId(ListCreateAPIView):
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        id = self.kwargs["id"]
        return Usuario.objects.filter(id=id)

class RetoView(ListCreateAPIView):
    queryset = Retos.objects.all()
    serializer_class = RetoSerializer

class ClaseView(ListCreateAPIView):
    queryset = Clases.objects.all()
    serializer_class = ClaseSerializer

class EliminarComentarioComunidadView(DestroyAPIView):
    queryset = ComentarioComunidad.objects.all()
    serializer_class = ComentarioComunidadSerializer
    # permission_classes = [IsAuthenticated]
    lookup_field = 'id'
