<?php

session_start();

require_once 'database.php';

$costPerMinute = 3;
$margin = 0.4;

$toolType = $_POST['toolType'];
$flutesNumber = $_POST['flutesNumber'];
$toolDiameter = $_POST['toolDiameter'];

$regrindingPrices = array();
try {
   $toolId = getToolGeometryId($db, $toolType, $toolDiameter, $flutesNumber);

   $faceRegrindingTime = getRegrindingTime($db, $toolId, 'face_grinding_times');
   $faceRegrindingPrice = ($faceRegrindingTime * $costPerMinute) / (1 - $margin);
   $regrindingPrices[] = $faceRegrindingPrice;
   
   if ($toolType == "Frez Walcowy" || $toolType == "Frez Promieniowy") {
    $bodyRegrindingTime = getRegrindingTime($db, $toolId, 'periphery_grinding_times_2d_tool');

    $bodyRegrindingPrice = ($bodyRegrindingTime * $costPerMinute) / (1 - $margin);
    $regrindingPrices[] = $bodyRegrindingPrice;
   }

   echo json_encode(['status' => 'success', 'regrindingPrices' => $regrindingPrices]);
} catch (PDOException $error) {
    echo $error->getMessage();
}


function getToolGeometryId($db, $toolType, $toolDiameter, $flutesNumber) {
    
    $query = $db->prepare("
    SELECT 
        tg.id
    FROM tool_geometry AS tg
    INNER JOIN 
        flutes_number AS f ON f.id = tg.id_flutes_number
    INNER JOIN 
        diameter AS d ON d.id = tg.id_diameter
    INNER JOIN 
        tool_type AS tt ON tt.id = tg.id_tool_type
    WHERE
        f.flutes = :flutesNumber
        AND
        d.diameter = :toolDiameter
        AND
        tt.name = :toolType
    ");
    $query->bindParam(':flutesNumber', $flutesNumber, PDO::PARAM_INT);
    $query->bindParam(':toolDiameter', $toolDiameter, PDO::PARAM_INT);
    $query->bindParam(':toolType', $toolType, PDO::PARAM_STR);
    $query->execute();

    return $query->fetch(PDO::FETCH_ASSOC)['id'];
}

function getRegrindingTime($db, $toolId, $table) {
    $query = $db->prepare("
    SELECT 
        r.time_minutes
    FROM
        $table AS r
    INNER JOIN
        tool_geometry AS tg ON tg.id = r.id_tool_geometry
    WHERE
        tg.id = :toolId
    ");
    $query->bindParam(':toolId', $toolId, PDO::PARAM_INT);
    $query->execute();

    return $query->fetch(PDO::FETCH_ASSOC)['time_minutes'];
}