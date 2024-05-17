
from django.contrib import admin
from django.urls import path, include
from django.urls import re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi



schema_view = get_schema_view(
   openapi.Info(
      title="Perfect Lab Backend",
      default_version='v1',
      description="Backend framework for Perfect Lab",
      terms_of_service="https://hilarious-conkies-77c588.netlify.app/",
      contact=openapi.Contact(email="danquahwilliam89@gmail.com"),
      license=openapi.License(name="William Dreams Inc"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include("usersapp.urls")),
   #  path('blog/', include("blogapp.urls")),
    path('perfect/', include("appointmentsapp.urls")),
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

]
