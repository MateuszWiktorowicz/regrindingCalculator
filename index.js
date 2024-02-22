$(document).ready(function () {
    $('#toolDiameter').change(function (event) {

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
                    sessionStorage.setItem('regrindingPrices', response.regrindingPrices);
                } else {

                }
            },
            error: function (xhr, status, error) {
                console.error('Error in AJAX request:', status, error);
                alert('An error occurred. Please try again.');
            }
        });
    });
});






$("#cuttingEdges").change(function() {
    var edgesValue = $(this).val();

    $(".diameterOption").remove();
    populateDiameterOption("endMillCuttingDiameter", edgesValue);
    $("#endMillCuttingDiameter, #faceRegrindingOption, #bodyRegrindingOption, #quantity, #discount").prop('disabled', false);

})

$("#faceRegrindingOption, #bodyRegrindingOption, #quantity, #discount").change(function() {
    var price =  calculateRegrindingPrice($("#cuttingEdges").val(), parseInt($("#endMillCuttingDiameter").val()));
    $("#price").val((price / (1 - margin)).toFixed(2));
    $("#value").val((price / (1 - margin) * parseInt($("#quantity").val())).toFixed(2));
    
    var discountValue = parseInt($("#discount").val()) / 100;
    $("#valueDiscounted").val(((price * (1 - discountValue) * parseInt($("#quantity").val())) / (1 - margin)).toFixed(2));
})

