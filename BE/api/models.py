from django.db import models
from django.contrib.auth.models import AbstractUser



class Usuario(AbstractUser):
    ROL_OPCIONES = (
        ("entrenador", "Entrenador"),
        ("usuario", "Usuario"),
    )
    rol = models.CharField(max_length=20, choices=ROL_OPCIONES,default="usuario")
    fecha_registro = models.DateTimeField(auto_now_add=True)


class Perfil(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    peso = models.FloatField()
    altura = models.FloatField()


class Objetivo(models.Model):
    objetivo = models.CharField(max_length=50)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()


class Comunidad(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=50)
    fecha_creacion = models.DateField(auto_now_add=True)

class ComentarioComunidad(models.Model):
    usuario =models.ForeignKey(Usuario,on_delete=models.CASCADE,related_name='usuario_comunidad')
    usuario_comentario =models.ForeignKey(Usuario,on_delete=models.CASCADE,related_name='usuario_comentario')
    comentario = models.CharField(max_length=40)

class Miembro(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    comunidad = models.ForeignKey(Comunidad, on_delete=models.CASCADE)
    actividad = models.TextField(blank=True)
    rol = models.CharField(max_length=50, default="Participante")


class Progreso(models.Model):
    distancia_recorrida = models.FloatField()
    tiempo_entrenamiento = models.FloatField()
    fecha_progreso = models.DateField(auto_now_add=True)
    tipo_ejercicio = models.CharField(max_length=50)


class Retos(models.Model):
    nombre_reto = models.CharField(max_length=50)
    dificultad_reto = models.CharField(max_length=50)


class Clases(models.Model):
    nombre_clase = models.CharField(max_length=50)
    descripcion_clase = models.TextField(blank=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha_clase = models.DateField()
    hora_clase = models.TimeField()
    duracion_clase = models.FloatField()