"""
Django settings for ecommerceapp project.

Generated by 'django-admin startproject' using Django 5.0.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
import cloudinary
import pymysql

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-egf+7kwoh2doyf9)7i$47l8tlupe$8ze5rowp7kwz5=#8h+rlu'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
DATA_UPLOAD_MAX_MEMORY_SIZE = 10485760
# Application definition
CORS_ORIGIN_ALLOW_ALL = True

ALLOWED_HOSTS = [
    '192.168.1.5',
    'http://192.168.1.12:8081', '192.168.1.12','http://192.168.1.7:8081', '192.168.1.7'
    ,'http://192.168.1.8:8081', '192.168.1.8', '192.168.1.6'
]

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'ecommerce.apps.EcommerceConfig',
    'ckeditor',
    'ckeditor_uploader',
    'rest_framework',
    'drf_yasg',
    'cloudinary',
    'oauth2_provider',
    'corsheaders',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
    )
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'ecommerceapp.urls'
AUTH_USER_MODEL = 'ecommerce.User'
MEDIA_ROOT = '%s/ecommerce/static/' % BASE_DIR
CKEDITOR_UPLOAD_PATH = "ckeditors/images/"

cloudinary.config(
    cloud_name="dy4p98hhs",
    api_key="291134368358311",
    api_secret="4TbHPQa7YhS8iSd3sIE3ZyaM9GE"
)

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'ecommerceapp.wsgi.application'

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'ecommercedb',
        'USER': 'root',
        'PASSWORD': '123456',
        'HOST': ''  # mặc định localhost
    }
}

pymysql.install_as_MySQLdb()

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'
OAUTH2_PROVIDER = {
    'OAUTH2_BACKEND_CLASS': 'oauth2_provider.oauth2_backends.JSONOAuthLibCore'
}
# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# 'jh0EnJFe2uGzTc3kY7kbLHtUgW7NILwkcY9dpt17'
# 'GCUhrDHUFqnGiXGXBSrHV2V0Ip3vBoKSL4xoIVa4eLrNPNG64sptXUoEZqF91KBWHCLFJOEbR1SWDENVPzqXARDR24IpprelYyjWmsPOvWkmtzUe21VY3qRYPEWBRqs1'

# 'l9zMXQgw7Zla0uGOQAXD00dzOmKJpEjZkQUO9Rtk'
# 'v0NuFjG03lbFUBlOAaE8cpiju5oNSNnToS7fWU9oKoGVJiSmUUaOJo55SRH0YL9bR9JKNOYAZH1K6YmbYZ1qUiOAfI3QgkGcGzm4XBDYnW5yZvpju8iBFA4KGxFoWxh4'
