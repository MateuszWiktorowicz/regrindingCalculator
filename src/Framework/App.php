<?php

declare(strict_types=1);

namespace Framework;

use Framework\Router;

class App
{
    private Router $router;

    public function __construct()
    {
        $this->router = new Router();
    }

    public function run()
    {
        dd("app is running");
    }

    public function addRoute(string $path, string $method)
    {
        $this->router->addRoute($path, $method);
    }
}
