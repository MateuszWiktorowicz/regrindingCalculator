<?php
session_start();

require_once 'database.php';

try {
    $toolsGeometries = json_encode(getToolsGeometries($db));
    
    echo '<script>';
    echo 'sessionStorage.setItem("toolsGeometries", JSON.stringify(' . $toolsGeometries . '));';
    echo '</script>';
} catch (PDOException $error) {
    echo $error->getMessage();
}

function getToolsGeometries($db) {
    $query = $db->query("
        SELECT 
            tt.name,
            d.diameter,
            f.flutes
        FROM
            tool_geometry AS tg
        INNER JOIN diameter AS d ON d.id = tg.id_diameter
        INNER JOIN flutes_number AS f ON f.id = tg.id_flutes_number
        INNER JOIN tool_type AS tt ON tt.id = tg.id_tool_type
    ");

    return $query->fetchAll(PDO::FETCH_ASSOC);
}
?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kalkulator ostrzenia</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link href="./styles.css" rel="stylesheet" />
</head>
<body>
<main>
    <div class="d-flex flex-column align-items-center">
        <form class="bg-white rounded m-5 p-5">
            <div class="mb-3 text-center">
                <h1>Kalkulator ostrzenia Mastermet</h1>
            </div>
            <div class="d-flex flex-column">
                <div class="mb-3"> 
                    <div class="mb-3">Rodzaj czoła do naostrzenia:</div>
                    <div class="form-check-inline d-flex flex-wrap gap-5" id="radioToolTypesContainer">
                    </div>
                </div>
                <div class="d-flex mb-4 flex-column flex-md-row gap-3 justify-content-between mt-3">
                    <div class="d-flex flex-column ">
                        <div class="mb-3">
                        <label for="cuttingEdges" class="form-label">Liczba ostrzy</label>
                        <select class="form-select" aria-label="cuttingEdges" id="cuttingEdges" disabled>
                            <option disabled selected>Wybierz ilość ostrzy</option>
                            <option value="EM2">2</option>
                            <option value="EM3">3</option>
                            <option value="EM4">4</option>
                            <option value="EM5">5</option>
                            <option value="EM6">6</option>
                            <option value="EM8">8</option>
                            <option value="EM9">9</option>
                          </select>
                          <div id="cuttingEdges" class="form-text">Wybranie ilości ostrzy odblokowuje formularz.</div>
                        </div>
                        <div class="mb-3">
                            <label for="endMillCuttingDiameter" class="form-label">Średnica</label>
                            <select class="form-select" aria-label="endMillCuttingDiameter" id="endMillCuttingDiameter" disabled>
                                <option disabled selected>Wybierz średnicę</option>
                              </select>
                        </div>
                        <div>
                            <div class="m-3">
                                Wybierz elementy geometrii do naostrzenia
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="faceRegrindingOption" value="faceRegrindingOption" disabled>
                                <label class="form-check-label" for="faceRegrindingOption">Ostrzenie czoła</label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="bodyRegrindingOption" value="" disabled>
                                <label class="form-check-label" for="bodyRegrindingOption">Ostrzenie obwodu</label>
                              </div>
                        </div>


                    </div>
                    <div class="d-flex flex-column">
                        <div class="mb-3">
                            <label for="quantity" class="form-label">Ilość</label>
                            <input type="number" class="form-control" id="quantity" aria-describedby="quantityText" min="1" value="1" disabled>
                            <div id="quantityText" class="form-text">Podaj ilość narzędzi do ostrzenia.</div>
                        </div>
                        <div class="mb-3">
                            <label for="price" class="form-label">Cena</label>
                            <input type="number" class="form-control" id="price" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="value" class="form-label">Wartość</label>
                            <input type="number" class="form-control" id="value" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="discount" class="form-label">Rabat [%]:</label>
                            <input type="number" class="form-control" id="discount" min="0" max="10" value="0" disabled>

                        </div>
                        <div class="mb-3">
                            <label for="valueDiscounted" class="form-label">Wartość po rabacie:</label>
                            <input type="number" class="form-control" id="valueDiscounted" disabled>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button type="submit" class="btn btn-success" disabled>Dodaj do oferty</button>
                <button type="reset" class="btn btn-danger">Resetuj</button>
            </div>
        </form>
    </div>
</main>
    

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="./index.js"></script>
    <script src="./settings.js"></script>
</body>
</html>