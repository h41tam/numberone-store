FROM php:8.2-cli

# System deps
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev \
    && docker-php-ext-install zip

# MongoDB extension
RUN pecl install mongodb \
    && docker-php-ext-enable mongodb

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy files
COPY . .

# Install deps
RUN composer install --no-dev --optimize-autoloader

# Laravel optimizations
RUN php artisan key:generate || true \
    && php artisan optimize || true

# Render uses port 10000
EXPOSE 10000

# 🚨 THIS IS THE MOST IMPORTANT LINE
CMD php artisan serve --host=0.0.0.0 --port={PORT:-10000}
