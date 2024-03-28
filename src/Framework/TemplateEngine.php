<?php

declare(strict_types=1);

namespace Framework;

class TemplateEngine
{
    private array $globalTemplateVariables = [];

    public function __construct(private string $basePath)
    {
    }

    public function resolve(string $path)
    {
        return "{$this->basePath}/{$path}";
    }

    public function render(string $template, array $data = [])
    {
        extract($data, EXTR_SKIP);
        extract($this->globalTemplateVariables, EXTR_SKIP);

        ob_start();

        include $this->resolve($template);

        $output = ob_get_contents();

        ob_end_clean();

        return $output;
    }

    public function addGlobalVariable(string $key, mixed $value)
    {
        $this->globalTemplateVariables[$key] = $value;
    }
}
