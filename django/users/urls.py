from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView
from .views import UserDetailsView

app_name = 'users'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
    path('details/', UserDetailsView.as_view(), name='details'),
]
