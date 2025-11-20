from rest_framework.serializers import ModelSerializer
from .models import (
    Usuario,
    Perfil,
    Objetivo,
    Comunidad,
    Progreso,
    Miembro,
    Entrenador,
)


class UsuarioSerializer(ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id", "username",'password', "first_name", "last_name", "email", "rol"]

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


class ObjetivoSerializer(ModelSerializer):
    class Meta:
        model = Objetivo
        fields = ["objetivo", "fecha_inicio", "fecha_fin"]


class ComunidadSerializer(ModelSerializer):
    class Meta:
        model = Comunidad
        fields = ["usuario", "descripcion", "fecha_creacion"]


class ProgresoSerializer(ModelSerializer):
    class Meta:
        model = Progreso
        fields = ["distancia_recorrida", "tiempo_entrenamiento", "fecha_progreso", "tipo_ejercicio"]


class MiembroSerializer(ModelSerializer):
    class Meta:
        model = Miembro
        fields = ["usuario", "comunidad", "actividad", "rol"]


class EntrenadorSerializer(ModelSerializer):
    class Meta:
        model = Entrenador
        fields = ["usuario", "especialidad", "experiencia", "disponibilidad", "fecha_registro"]


