from django.contrib import admin
from Users.models import CustomUser

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'is_active', 'role')
    list_editable = ('is_active', 'role')
    search_fields = ('first_name', 'last_name', 'email')
    list_filter = ('is_active', 'role')
    ordering = ('-email', )

    fieldsets = (
        ('Credenciales', {'fields': ('email', 'password')}),
        ('Información Personal', {'fields': ('first_name', 'last_name', 'slug')}),
        ('Permisos', {'fields': ('role', 'is_active', 'is_staff', 'is_superuser')}),
        ('Fechas Importantes', {'fields': ('last_login',)}),
    )

admin.site.register(CustomUser, CustomUserAdmin)
