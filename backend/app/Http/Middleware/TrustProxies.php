<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustProxies as Middleware;
use Illuminate\Http\Request;

class TrustProxies extends Middleware
{
    /**
     * The trusted proxies for this application.
     * '*' означает, что мы доверяем любому прокси, что безопасно в контролируемой среде Docker.
     *
     * @var array<int, string>|string|null
     */
    protected $proxies = '*';

    /**
     * The headers that should be used to detect proxies.
     * Эта настройка говорит Laravel искать стандартные заголовки 'X-Forwarded-*',
     * которые отправляет Nginx. Я заменил длинный список на одну стандартную константу.
     *
     * @var int
     */
    protected $headers = Request::HEADER_X_FORWARDED_ALL;
}
