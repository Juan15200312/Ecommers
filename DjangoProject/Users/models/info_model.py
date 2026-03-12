import os
from django.db import models
from PIL import Image

def upload_image_to_db(instance, filename):
    ext = os.path.splitext(filename)[1]
    new_filename = f'{instance.user.slug}{ext}'
    return f'images/users_photos/{new_filename}'

class InfoModel(models.Model):
    user = models.OneToOneField('CustomUser', on_delete=models.CASCADE, related_name='info', verbose_name='Usuario')
    phone = models.CharField(max_length=12, null=True, blank=True, verbose_name='Teléfono')
    birth_date = models.DateField(null=True, blank=True, verbose_name='Fecha de nacimiento')
    image = models.ImageField(upload_to=upload_image_to_db, blank=True, null=True, verbose_name='Imagen')

    def __str__(self):
        return self.user.__str__()

    def save(self, *args, **kwargs):
        if self.phone and len(self.phone) == 9:
            self.phone = f'+34{self.phone}'

        super().save(*args, **kwargs)


    class Meta:
        db_table = 'InformaciónUsuario'
        verbose_name = 'Información Usuario'
        verbose_name_plural = '2. Informaciones de usuarios'
