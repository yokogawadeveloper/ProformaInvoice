"""prod URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from .routers import router
from django.conf import settings
from django.conf.urls.static import static
from wkhtmltopdf.views import PDFTemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^', include('excelupload.urls')),
    url(r'^user/', include('users.urls')),
    url(r'^', include(router.urls)),
    url(r'^pdf/$', PDFTemplateView.as_view(template_name='index.html', filename='Invoice.pdf'), name='pdf'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
