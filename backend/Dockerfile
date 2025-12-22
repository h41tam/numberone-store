FROM php:8.2-cli

# System dependencies including SSL
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libssl-dev libcurl4-openssl-dev \
    && docker-php-ext-install zip curl \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy source code
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

EXPOSE ${PORT:-10000}

# Start Laravel
CMD sh -c "php artisan config:clear && php artisan storage:link && php -d variables_order=EGPCS artisan serve --host=0.0.0.0 --port=${PORT:-10000}"
