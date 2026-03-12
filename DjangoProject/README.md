# Instalación

### Instalar venv
- Windows ---> python -m venv .venv 
- Linux ---> python3 -m venv .venv

### Activar venv
- Windows ---> .venv\Scripts\activate 
- Linux ---> source .venv/bin/activate

### Generar el archivo requirements.txt
python -m pip freeze > requirements.txt

### Instalar los librerias
python -m pip install -r requirements.txt

# ENV
SECRET_KEY=django-insecure-xfmc7%6b-vqvti^@8(bo#z=wkdic9)d#!gb)c15s&ne(_hzt+x
DEBUG=True
ALLOWED_HOSTS=8.8.8.8,8.8.6.6
CORS_ALLOWED_ORIGINS=http://localhost:4200,http://127.0.0.1:4200