from django.urls import path
from .views import UsuarioCreateView
from .views import PerfilSerializerView
from .views import ObjetivoSerializerView
from .views import comunidadSerializerView
from .views import progresoSerializerView
from .views import MiembroSerializerView
from .views import RetosSerializerView
from .views import UsuarioLoginView
from .views import UsuarioPorId
urlpatterns = [
    path("api/perfil/",PerfilSerializerView.as_view()),
    path("api/objetivo/", ObjetivoSerializerView.as_view()),
    path("api/usuario/",UsuarioCreateView.as_view()),
    path("api/comunidad/", comunidadSerializerView.as_view()), 
    path("api/progreso/", progresoSerializerView.as_view()),
    path("api/miembro/", MiembroSerializerView.as_view()),
    path("api/Retos/", RetosSerializerView.as_view()),
    path("api/login/", UsuarioLoginView.as_view()),
    path("api/usuario/<int:id>/",UsuarioPorId.as_view())

]

