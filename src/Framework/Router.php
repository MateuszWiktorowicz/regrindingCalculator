<?php

declare(strict_types=1);

namespace Framework;

class Router
{
    private array $routes = [];

    public function normalizePath(string $path): string
    {
        $path = trim($path, "/");
        $path = "/{$path}/";
        $path = preg_replace("#[/]{2,}#", '/', $path);

        return $path;
    }

    public function addRoute(string $path, string $method, array $controller)
    {
        $path = $this->normalizePath($path);
        $this->routes[] = [
            "path" => $path,
            'method' => strtoupper($method),
            'controller' => $controller
        ];
    }

    public function dispatch(string $path, string $method)
    {
        $path = $this->normalizePath($path);
        $method = strtoupper($method);

        foreach ($this->routes as $route) {
            if (!preg_match("#^{$route['path']}$#", $path) || $route['method'] !== $method) {
                continue;
            }
            [$class, $func] = $route['controller'];
        }

        $controllerInstance = new $class;
        $controllerInstance->$func();
    }
}
