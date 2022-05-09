
from django.core.asgi import get_asgi_application

from channels.routing import ProtocolTypeRouter

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
})