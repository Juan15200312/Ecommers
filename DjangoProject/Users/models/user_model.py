import uuid
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, email=None, password=None, **extra_fields):
        if not email:
            raise ValueError('El email es obligatorio')

        if len(password) < 8:
            raise ValueError('La contraseña debe contener al menos 8 caracteres')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', 'ADMIN')
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    class Roles(models.TextChoices):
        ADMIN = 'ADMIN', 'Administrador'
        STAFF = 'STAFF', 'Personal'
        CLIENT = 'CLIENT', 'Cliente'

    first_name = models.CharField(max_length=100, verbose_name='Nombres')
    last_name = models.CharField(max_length=100, verbose_name='Apellidos')
    email = models.EmailField(max_length=255, unique=True, verbose_name='Correo')
    slug = models.SlugField(max_length=255, unique=True, blank=True, null=True)

    role = models.CharField(max_length=10, choices=Roles, default=Roles.CLIENT, verbose_name='Rol')
    is_staff = models.BooleanField(default=False, verbose_name='¿Es del personal?')
    is_superuser = models.BooleanField(default=False, verbose_name='¿Es administrador?')
    is_active = models.BooleanField(default=True, verbose_name='¿Esta activo?')

    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    def save(self, *args, **kwargs):
        from Users.models import InfoModel
        is_new = self.id is None

        if self.password and not self.password.startswith('pbkdf2_'):
            self.set_password(self.password)

        if not self.slug:
            slug_prov = uuid.uuid4().hex

            while CustomUser.objects.filter(slug=slug_prov).exists():
                slug_prov = uuid.uuid4().hex

            self.slug = slug_prov

        super().save(*args, **kwargs)
        if is_new:
            InfoModel.objects.create(user=self)


    class Meta:
        db_table = 'Usuarios'
        verbose_name = 'Usuario'
        verbose_name_plural = '1. Usuarios'

