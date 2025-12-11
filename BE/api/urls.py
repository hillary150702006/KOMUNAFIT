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
from .views import EliminarComentarioComunidadView
urlpatterns = [
    path("perfil/",PerfilSerializerView.as_view()),
    path("objetivo/", ObjetivoSerializerView.as_view()),
    path("usuario/",UsuarioCreateView.as_view()),
    path("comunidad/", comunidadSerializerView.as_view()),
    path("progreso/", progresoSerializerView.as_view()),
    path("miembro/", MiembroSerializerView.as_view()),
    path("login/", UsuarioLoginView.as_view()),
    path("usuario/<int:id>/",UsuarioPorId.as_view()),
    path("comentario/",ComentarioComunidadCreateView.as_view()),
    path("reto/",RetoView.as_view()),
    path("clase/",ClaseView.as_view()),
    path("comentario/eliminar/<int:id>/", EliminarComentarioComunidadView.as_view()),

]

