<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Services\CalculatorService;
use Framework\TemplateEngine;

class CalculatorController
{
    public function __construct(
        private TemplateEngine $view,
        private CalculatorService $calculatorService
    ) {
    }
}
