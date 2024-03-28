<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Services\CalculatorService;
use Framework\TemplateEngine;

class HomeController
{

    public function __construct(
        private TemplateEngine $view,
        private CalculatorService $calculatorService
    ) {
    }

    public function home()
    {
        echo $this->view->render("/index.php");
    }

    public function getPriceList()
    {
        $priceList =  $this->calculatorService->getPriceList();

        $priceListJson = json_encode($priceList);

        header('Content-Type: application/json');

        echo $priceListJson;
    }
}
