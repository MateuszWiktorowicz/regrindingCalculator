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
                d.diameter AS 'diameter',
                f.flutes AS 'flutes',
                fgt.time_minutes * 3 / 0.6 AS 'facePrice',
                pgt.time_minutes * 3 / 0.6 AS 'fullPrice'
            FROM tool_geometry AS tg
            INNER JOIN tool_type AS tt ON tt.id = tg.id_tool_type
            INNER JOIN diameter AS d ON d.id = tg.id_diameter
            INNER JOIN flutes_number AS f ON f.id = tg.id_flutes_number
            INNER JOIN face_grinding_times AS fgt ON fgt.id_tool_geometry = tg.id
            LEFT JOIN periphery_grinding_times_2d_tool AS pgt ON pgt.id_tool_geometry = tg.id"
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
                d.diameter AS diameter,
                cp.price AS price
            FROM coating_price AS cp
            INNER JOIN coating_type AS ct ON ct.id = cp.id_coating
            INNER JOIN diameter AS d ON d.id = cp.id_diameter"
        )->findAll();

        return $coatingPriceList;
    }
}
