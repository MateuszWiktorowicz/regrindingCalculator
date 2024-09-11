const PRICE_LIST = JSON.parse(regrindingPricesData);
const COATING_PRICES = JSON.parse(coatingPricesData);

function populateToolTypes()
{
    var toolTypes = [...new Set(PRICE_LIST.map(item => item['toolType']))];

    $.each(toolTypes, function (index, toolType) {
        var radioInput = $('<input>', {
            class: 'form-check-input',
            type: 'radio',
            name: 'toolType',
            id: toolType,
            value: toolType,
            checked: index === 0,
        });
    
        var radioLabel = $('<label>', {
            class: 'form-check-label',
            for: toolType,
            text: toolType,
        });
    
        var flexContainer = $('<div>', {
            class: 'd-flex flex-column align-items-center',
        });
    
        flexContainer.append(radioLabel, radioInput);
    
        $('#radioToolTypesContainer').append(flexContainer);
        });
}

function getToolTypeGeometryVariants(toolType)
{
    var geometryVariants = [];

    PRICE_LIST.forEach(function(tool) {
        if (tool['toolType'] === toolType) {
            geometryVariants.push(tool);
        }
    })

    return geometryVariants;
}

function separateUniqueGeometryValues(geometryVariants, geoemtryElement) {
    return [...new Set(geometryVariants.map(item => item[geoemtryElement]))];

}

function populateSelectOptions(selectId, optionValues, isDiameters) {
    const $selectElement = $("#" + selectId);

    if ($selectElement.length) {
        if (isDiameters === true ) {
            $.each(optionValues, function(index, option) {

                $selectElement.append($("<option>", {
                    value: option,
                    text: option,
                    class: selectId
                }));
            });

        } else {
            $.each(optionValues, function(index, option) {
                $selectElement.append($("<option>", {
                    value: option,
                    text: option,
                    class: selectId
                }));
            });
        }
    }
}

function divideDiameterVariantsByFlutesAndToolType(toolType, flutes) {
    var toolVariants = getToolTypeGeometryVariants(toolType)

    var diameters = [];
    toolVariants.forEach(function(tool) {
        if (tool.flutes === flutes) {
            diameters.push(tool.diameter);
        }
    })
    return diameters;
}

function populateFlutes()
{
    $(".flutes").remove();
    var toolType = $('input[name="toolType"]:checked').val();
    populateSelectOptions("flutes", separateUniqueGeometryValues(getToolTypeGeometryVariants(toolType), 'flutes'), false)
}

function populateDiameters()
{
    $(".toolDiameter").remove();
    var toolType = $('input[name="toolType"]:checked').val();
    var flutesNumber = parseInt($("#flutes").val());



    var diameters = divideDiameterVariantsByFlutesAndToolType(toolType, flutesNumber);

    populateSelectOptions("toolDiameter", diameters, true);

    
}

function findTool() {
    var tool;
    var toolType = $('input[name="toolType"]:checked').val();
    var flutesNumber = parseInt($("#flutes").val());
    var diameter = parseInt($("#toolDiameter").val());

    for (var i = 0; i < PRICE_LIST.length; i++) {
        if (toolType === PRICE_LIST[i]['toolType'] && flutesNumber === PRICE_LIST[i]['flutes'] && diameter === PRICE_LIST[i]['diameter']) {
            tool = PRICE_LIST[i];
        }
    }

    return tool;
}

function calculatePrice(tool)
{
    if ($("#faceRegrindingOption").is(":checked") || $("#fullRegrindingOption").is(":checked")) {
    var price = 0;

    if ($("#faceRegrindingOption").is(":checked")) {
        price = parseFloat(tool['facePrice']);
    } else if ($("#fullRegrindingOption").is(":checked")) {
        price = parseFloat(tool['peripheryPrice']) + parseFloat(tool['facePrice']);
    } 

    if ($('input[name="toolType"]:checked').val() === "Frez Promieniowy") {
        if ($("#radius").val() <= 1.5) {
            price -= 5;
        } else if ($("#radius").val() >= 2.5) {
            price += 5;
        }
    }

    if ($("#coating").val() !== "Brak pokrycia") {
        COATING_PRICES.forEach(function(coating) {
            if ((coating["diameter"] === tool["diameter"]&& coating["code"] === $("#coating").val())) {
                price += parseFloat(coating["price"]);
            }
        })
    }

    var quantity = $("#quantity").val();
    var value = price * quantity;
    var discount = $("#discount").val();
    var discountedValue = value * (1 - (discount / 100));

    $("#price").val(price.toFixed(2));
    $("#value").val(value.toFixed(2));
    $("#valueDiscounted").val(discountedValue.toFixed(2));
}
    
}

function populateCoating()
{
    var coatingTypes = [...new Set(COATING_PRICES.map(item => item['code']))];

    populateSelectOptions("coating", coatingTypes, false);

}


function resetFormValues() 
{
    $("#toolDiameter, #quantity, #discount, #radius, #coating").prop('disabled', true);
    $('#toolDiameter').prop('selectedIndex', 0);
    $('#faceRegrindingOption, #fullRegrindingOption').prop('checked', false).prop('disabled', true);
    $("#price, #value, #valueDiscounted, #discount").val(0);
    $("#quantity").val(1);
}

populateToolTypes();
populateFlutes();
populateCoating()

$("#radioToolTypesContainer").change(function() {
    resetFormValues();
    populateFlutes();
    $('#flutes').prop('selectedIndex', 0);

    $('input[name="toolType"]:checked').val() === "Frez Promieniowy" ? $('#radiusContainer').removeClass('d-none') : $('#radiusContainer').addClass('d-none');
    
})

$("#flutes").change(function() {
    resetFormValues();
    $("#toolDiameter").prop('disabled', false);
    populateDiameters();

})

$("#toolDiameter").change(function() {
    var tool = findTool();
    $('#faceRegrindingOption, #quantity, #discount, #radius, #coating').prop('disabled', false);

    if (tool['peripheryPrice'] !== null) {
        $('#fullRegrindingOption').prop('disabled', false);
    }
    calculatePrice(tool);

}) 

$('#faceRegrindingOption, #fullRegrindingOption, #quantity, #discount, #radius, #coating').change(function() {
    var tool = findTool();

    calculatePrice(tool);
})

$('#radius').on('input', function() {
    var radiusValue = parseFloat($(this).val());
    var diameterValue = parseFloat($("#toolDiameter").val());
    if (radiusValue > 4 || radiusValue > (diameterValue * 0.5)) {
        if ($('#radiusMessage').length == 0) {
            $('#radiusContainer').append('<div id="radiusMessage" style="color: red; font-weight: bold;">Promień jest za duży.</div>');
        }
    } else {
        $('#radiusMessage').remove();
    }
});

    
    


