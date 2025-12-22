FROM php:8.3-cli

# System deps
RUN apt-get update && apt-get install -y \
    git unzip libssl-dev libcurl4-openssl-dev pkg-config \
    && docker-php-ext-install pdo

# MongoDB PHP extension
RUN pecl install mongodb \
    && docker-php-ext-enable mongodb

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN composer install --no-dev --optimize-autoloader

EXPOSE 10000

CMD php artisan serve --host=0.0.0.0 --port=10000
