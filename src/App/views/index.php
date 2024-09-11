<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kalkulator ostrzenia</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link href="assets/css/main.css" rel="stylesheet">
</head>

<body>
    <main>
        <div class="d-flex flex-column align-items-center">
            <form class="bg-white rounded m-5 p-5" id="regrindForm">
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
                        <div class="d-flex flex-column">
                            <div class="mb-3">
                                <label for="flutes" class="form-label">Liczba ostrzy</label>
                                <select class="form-select" aria-label="flutes" id="flutes">
                                    <option disabled selected>Wybierz ilość ostrzy</option>
                                </select>
                                <div id="cuttingEdges" class="form-text">Wybranie ilości ostrzy odblokowuje formularz.</div>
                            </div>
                            <div class="d-flex flex-column flex-md-row gap-3">
                                <div class="mb-3 col-9">
                                    <label for="toolDiameter" class="form-label">Średnica</label>
                                    <select class="form-select" aria-label="toolDiameter" id="toolDiameter" disabled>
                                        <option disabled selected>Wybierz średnicę</option>
                                    </select>
                                </div>
                                <div class="mb-3 col-3 d-none" id="radiusContainer">
                                    <label for="radius" class="form-label">Promień</label>
                                    <input type="number" class="form-control" id="radius" min="0.1" value="1" step="0.01" disabled>
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="m-3">
                                    Wybierz elementy geometrii do naostrzenia
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="geometryOption" id="faceRegrindingOption" value="faceRegrindingOption" disabled>
                                    <label class="form-check-label" for="faceRegrindingOption">Ostrzenie czoła</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="geometryOption" id="fullRegrindingOption" value="fullRegrindingOption" disabled>
                                    <label class="form-check-label" for="fullRegrindingOption">Ostrzenie czoła oraz obwodu</label>
                                </div>
                            </div>
                            <div class="d-flex flex-column flex-md-row gap-3">
                                <div class="mb-3">
                                    <label for="coating" class="form-label">Pokrycie</label>
                                    <select class="form-select" aria-label="coating" id="coating" disabled>
                                        <option selected>Brak pokrycia</option>
                                    </select>
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
    <script>
        var regrindingPricesData = <?php echo json_encode($regrindingPrices); ?>;
        var coatingPricesData = <?php echo json_encode($coatingPrices); ?>;
    </script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>


    <script src="assets/js/priceList.js"></script>


</body>

</html>