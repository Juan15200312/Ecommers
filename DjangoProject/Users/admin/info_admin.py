from django.contrib import admin

from Users.models import InfoModel


class InfoAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'birth_date', 'user__role')


admin.site.register(InfoModel, InfoAdmin)