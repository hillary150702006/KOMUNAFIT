from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Retos

Usuario = get_user_model()


class RetoAPITest(APITestCase):

    def setUp(self):
        # Crear usuario
        self.user = Usuario.objects.create_user(
            username="testuser",
            password="testpassword123"
        )

        # Autenticación forzada
        self.client.force_authenticate(user=self.user)

        # URL CORRECTA usando reverse
        self.url = reverse("reto")

        # Reto inicial
        self.reto = Retos.objects.create(
            nombre_reto="Reto Inicial",
            dificultad_reto="Media"
        )

    def test_listar_retos(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["nombre_reto"], "Reto Inicial")

    def test_crear_reto(self):
        data = {
            "nombre_reto": "Reto Avanzado",
            "dificultad_reto": "Alta"
        }

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Retos.objects.count(), 2)

    def test_sin_autenticacion(self):
        self.client.force_authenticate(user=None)

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
