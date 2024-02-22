$(document).ready(function () {
    $('#toolDiameter').change(function() {
        getPrices();
        calculateRegrindingPrice();
        
    });
});

function getPrices() {
    var toolType = $('input[name="toolType"]:checked').val();
        var flutesNumber = parseInt($("#flutes").val());
        var toolDiameter = parseInt($("#toolDiameter").val());

        $.ajax({
            type: 'POST',
            url: 'prices.php',
            data: {toolType: toolType, flutesNumber: flutesNumber, toolDiameter: toolDiameter},
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    sessionStorage.setItem('regrindingPrices', JSON.stringify(response.regrindingPrices));
                    checkElementsToGrindAccess(response.regrindingPrices);
                    calculateRegrindingPrice();
                } else {

                }
            },
            error: function (xhr, status, error) {
                console.error('Error in AJAX request:', status, error);
                alert('An error occurred. Please try again.');
            }
        });
}

function checkElementsToGrindAccess(grindingPrices) {    
    $("#faceRegrindingOption, #quantity, #discount").prop('disabled', false);
        if (grindingPrices.length === 2) {
            $("#bodyRegrindingOption").prop('disabled', false);
        }
}

function calculateRegrindingPrice() {
    var grindingPrices = sessionStorage.getItem("regrindingPrices");
    grindingPrices = JSON.parse(grindingPrices);
    
    var price = 0;

    if ($("#faceRegrindingOption").prop("checked")) {
        price += grindingPrices[0];
    }
    if ($("#bodyRegrindingOption").prop("checked")) {
        price += grindingPrices[1];
    }

    $("#price").val(price.toFixed(2));
    $("#value").val(($("#price").val() * parseInt($("#quantity").val())).toFixed(2));
    
    var discountValue = parseInt($("#discount").val()) / 100;
    $("#valueDiscounted").val(($("#value").val() * (1 - discountValue)).toFixed(2));
}

$("#radioToolTypesContainer").change(function() {
    $(".flutes").remove();
    $('#flutes').prop('selectedIndex', 0);
    $('#toolDiameter').prop('selectedIndex', 0);
    $('#quantity').val(1);
    $('#discount, #value, #price, #valueDiscounted').val((0).toFixed(2));
    $("#toolDiameter, #faceRegrindingOption, #bodyRegrindingOption, #quantity, #discount").prop('disabled', true);
    $('#faceRegrindingOption, #bodyRegrindingOption').prop('checked', false).prop('disabled', true);
    sessionStorage.removeItem('regrindingPrices');
    populateFlutes();
    
    
})

$("#flutes").change(function() {
    
    $(".toolDiameter").remove();
    $('#toolDiameter').prop('selectedIndex', 0);
    $('#quantity').val(1);
    $('#discount, #value, #price, #valueDiscounted').val((0).toFixed(2));
    $("#faceRegrindingOption, #bodyRegrindingOption, #quantity, #discount").prop('disabled', true);
    $('#faceRegrindingOption, #bodyRegrindingOption').prop('checked', false).prop('disabled', true);
    sessionStorage.removeItem('regrindingPrices');
    populateDiameters();
    $("#toolDiameter").prop('disabled', false);
})

$("#faceRegrindingOption, #bodyRegrindingOption, #quantity, #discount").change(function() {
    calculateRegrindingPrice();
})




