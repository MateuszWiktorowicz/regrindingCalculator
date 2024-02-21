function getUniqueToolTypesByAttribute(variants, attribute) {
    var uniqueNamesSet = new Set(variants.map(variant => variant[attribute]));
    var uniqueNamesArray = Array.from(uniqueNamesSet);
    return uniqueNamesArray;
}

function populateRadioToolTypes() {
    var toolsData = JSON.parse(sessionStorage.getItem('toolsGeometries'));
    var toolTypes = getUniqueToolTypesByAttribute(toolsData, 'name');

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

function getToolGeometryVariants(toolType) {
    var toolsData = JSON.parse(sessionStorage.getItem('toolsGeometries'));
    var toolGeometryVariants = [];

    if (toolsData && toolsData.length > 0) {
        for (var i = 0; i < toolsData.length; i++) {
            if (toolsData[i].name === toolType) {
                toolGeometryVariants.push(toolsData[i]);
            }
        }
    }

    return toolGeometryVariants
}

function divideDiameterVariantsByFlutesAndToolType(toolType, flutes) {
    var toolVariants = getToolGeometryVariants(toolType)

    var diameters = [];
    toolVariants.forEach(function(tool) {
        if (tool.flutes === flutes) {
            diameters.push(tool.diameter);
        }
    })
    return diameters;
}

function populateSelectOptions(selectId, optionValues) {
    const $selectElement = $("#" + selectId);

    if ($selectElement.length) {
        $.each(optionValues, function(index, option) {
            $selectElement.append($("<option>", {
                value: option,
                text: option,
                class: selectId
            }));
        });
    }
}
function populateFlutes() {
    var toolType = $('input[name="toolType"]:checked').val();
    var toolVariants = getToolGeometryVariants(toolType)
    var flutesVariants = getUniqueToolTypesByAttribute(toolVariants, 'flutes')
  
    populateSelectOptions("flutes", flutesVariants)    
}

function populateDiameters() {
    var toolType = $('input[name="toolType"]:checked').val();
    var flutes = parseInt($("#flutes").val());
    var diameterVariants = divideDiameterVariantsByFlutesAndToolType(toolType, flutes)

    populateSelectOptions("toolDiameter", diameterVariants)
}

populateRadioToolTypes();

$("#radioToolTypesContainer").change(function() {
    $(".flutes").remove();
    populateFlutes()
    $("#toolDiameter, #faceRegrindingOption, #bodyRegrindingOption, #quantity, #discount").prop('disabled', true);
})

$("#flutes").change(function() {
    $(".toolDiameter").remove();
    populateDiameters();
    $("#toolDiameter, #faceRegrindingOption, #bodyRegrindingOption, #quantity, #discount").prop('disabled', false);
})