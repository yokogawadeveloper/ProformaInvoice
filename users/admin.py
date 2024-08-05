from django.contrib import admin
from .models import *

admin.site.register(User)


@admin.register(UserSignature)
class UserSignatureAdmin(admin.ModelAdmin):
    list_display = ('user', 'signature')
