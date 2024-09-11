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
            "SELECT
                tt.name AS 'toolType',
                t.diameter AS 'diameter',
                t.flutes_number AS 'flutes',
                t.face_grinding_time_minutes * 3 / 0.6 AS 'facePrice',
                t.periphery_grinding_time_minutes_2D * 3 / 0.6 AS 'peripheryPrice'
            FROM tool AS t
            INNER JOIN tool_type AS tt ON tt.id = t.id_tool_type"
        )->findAll();

        return $priceList;
    }

    public function getCoatingPriceList()
    {
        $coatingPriceList = $this->db->query(
            "SELECT
                ct.mastermet_code AS code,
                ct.mastermet_name AS name,
                ct.coating_composition AS composition,
                cp.diameter AS diameter,
                cp.price AS price
            FROM coating_price AS cp
            INNER JOIN coating_type AS ct ON ct.id = cp.id_coating"
        )->findAll();

        return $coatingPriceList;
    }
}
