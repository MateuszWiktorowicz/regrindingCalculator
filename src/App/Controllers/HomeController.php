<?php


declare(strict_types=1);



namespace App\Controllers;

session_start();

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
        $priceList = $this->getPriceList();
        $encodedPriceList = json_encode($priceList);

        $_SESSION['regrindingPrices'] = $encodedPriceList;

        echo $this->view->render("/index.php", ['regrindingPrices' => $encodedPriceList]);
    }

    public function getPriceList()
    {
        return $this->calculatorService->getPriceList();
    }
}
