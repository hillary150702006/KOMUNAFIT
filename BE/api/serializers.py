from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import (
    Usuario,
    Perfil,
    Objetivo,
    Comunidad,
    Progreso,
    Miembro,
    Clases,
    ComentarioComunidad
)
from .models import Retos,Clases


class UsuarioSerializer(ModelSerializer):
    foto = serializers.ImageField(required=False)
    class Meta:
        model = Usuario
        fields = ["id", "username", "first_name", "last_name", "email", "rol", "foto","fecha_registro", "password"]

    def create(self,validated_data):
        clave = validated_data.pop("password")
        usuario = Usuario(**validated_data)
        usuario.set_password(clave)
        usuario.save()
        return usuario


class PerfilSerializer(ModelSerializer):
    class Meta:
        model = Perfil
        fields = ["usuario", "peso", "altura"]

class ComentarioComunidadSerializer(ModelSerializer):
    nombre_usuario = serializers.CharField(source='usuario.username', read_only=True)
    class Meta:
        model = ComentarioComunidad
        fields = "__all__"


class ObjetivoSerializer(ModelSerializer):
    class Meta:
        model = Objetivo
        fields = ["objetivo", "fecha_inicio", "fecha_fin"]


class ComunidadSerializer(ModelSerializer):
    username = serializers.CharField(source='usuario.username', read_only=True)
    class Meta:
        model = Comunidad
        fields = ["id", "username", "descripcion", "fecha_creacion"]


class ProgresoSerializer(ModelSerializer):
    class Meta:
        model = Progreso
        fields = ["distancia_recorrida", "tiempo_entrenamiento", "fecha_progreso", "tipo_ejercicio"]


class MiembroSerializer(ModelSerializer):
    class Meta:
        model = Miembro
        fields = ["usuario", "comunidad", "actividad", "rol"]

class RetoSerializer(ModelSerializer):
    class Meta:
        model = Retos
        fields = "__all__"

class ClaseSerializer(ModelSerializer):
    class Meta:
        model = Clases
        fields = [ "id", "nombre_clase", "descripcion_clase", "usuario", "fecha_clase", "hora_clase", "duracion_clase"]