from django.urls import path
from .views import UsuarioCreateView
from .views import PerfilSerializerView
from .views import ObjetivoSerializerView
from .views import comunidadSerializerView
from .views import progresoSerializerView
from .views import MiembroSerializerView
from .views import UsuarioLoginView
from .views import UsuarioPorId
from .views import ComentarioComunidadCreateView
from .views import RetoView
from .views import ClaseView
urlpatterns = [
    path("api/perfil/",PerfilSerializerView.as_view()),
    path("api/objetivo/", ObjetivoSerializerView.as_view()),
    path("api/usuario/",UsuarioCreateView.as_view()),
    path("api/comunidad/", comunidadSerializerView.as_view()), 
    path("api/progreso/", progresoSerializerView.as_view()),
    path("api/miembro/", MiembroSerializerView.as_view()),
    path("api/login/", UsuarioLoginView.as_view()),
    path("api/usuario/<int:id>/",UsuarioPorId.as_view()),
    path("api/comentario/",ComentarioComunidadCreateView.as_view()),
    path("api/reto/",RetoView.as_view()),
    path("api/clase/",ClaseView.as_view()),

]

