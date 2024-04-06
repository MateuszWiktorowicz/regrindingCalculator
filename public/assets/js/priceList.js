const PRICE_LIST = JSON.parse(sessionStorage.getItem("regrindingPrices"));

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
    var toolType = $('input[name="toolType"]:checked').val();

    if ($selectElement.length) {
        if ((toolType === "Fazownik" || toolType === "Wiertło Krete") && isDiameters === true ) {
            $.each(optionValues, function(index, option) {

                var text;
                if (index === 0) {
                    text = "<" + option;
                } else if (index === optionValues.length - 1) {
                    text = ">" + option;
                } else {
                    var prevOption = optionValues[index - 1];
                    text = prevOption + " - " + option; 
                }
                $selectElement.append($("<option>", {
                    value: option,
                    text: text,
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

populateToolTypes();
populateFlutes();

$("#radioToolTypesContainer").change(function() {
    $("#toolDiameter").prop('disabled', true);
    $('#toolDiameter').prop('selectedIndex', 0);
    populateFlutes();
    $('#flutes').prop('selectedIndex', 0);
    $('#faceRegrindingOption, #bodyRegrindingOption').prop('checked', false).prop('disabled', true);
})

$("#flutes").change(function() {
    $('#toolDiameter').prop('selectedIndex', 0);
    populateDiameters();
    $("#toolDiameter").prop('disabled', false);
    $('#faceRegrindingOption, #bodyRegrindingOption').prop('checked', false).prop('disabled', true);
})

$("#toolDiameter").change(function() {
    var tool = findTool();
    $('#faceRegrindingOption').prop('checked', false).prop('disabled', false);
}) 
    
    


