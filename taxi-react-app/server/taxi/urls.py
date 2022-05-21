
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView # new

from trips.views import SignUpView, LogInView # changed

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/sign_up/', SignUpView.as_view(), name='sign_up'),
    path('api/log_in/', LogInView.as_view(), name='log_in'), # new
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # new
]