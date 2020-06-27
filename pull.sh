#!/bin/sh

#activar mantenimiento
php artisan down

# Actualizar proyecto, bajar cambios
git pull

#actualizar dependencias
export COMPOSER_HOME='tmp/composer'
composer install --no-interaction --no-dev --prefer-dist

# limpiamos cache
php artisan cache:clear

# limipiamos configuracion
php artisan config:clear

# Ejecutamos migraciones
php artisan migrate --force

# Terminamos mantenimiento
php artisan up
