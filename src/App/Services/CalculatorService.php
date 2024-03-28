<?php

declare(strict_types=1);

namespace App\Services;

use Framework\Database;

class CalculatorService
{
    public function __construct(private Database $db)
    {
    }

    public function getPriceList()
    {
        $priceList = $this->db->query(
            "SELECT * FROM diameter"
        )->findAll();

        return $priceList;
    }
}
