<?php

declare(strict_types=1);

use Framework\TemplateEngine;
use App\Config\Paths;
use App\Services\CalculatorService;
use Framework\{Database, Container};

return [
    TemplateEngine::class => fn () => new TemplateEngine(Paths::VIEW),
    Database::class => fn () => new Database(
        $_ENV['DB_DRIVER'],
        [
            'host' => $_ENV['DB_HOST'],
            'port' => $_ENV['DB_PORT'],
            'dbname' => $_ENV['DB_NAME']
        ],
        $_ENV['DB_USER'],
        $_ENV['DB_PASS']
    ),
    CalculatorService::class => function (Container $container) {
        $db = $container->get(Database::class);

        return new CalculatorService($db);
    }

];
