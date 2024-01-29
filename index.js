const grindingTimes = {
    "EM2" : [
        {dia: 5, faceTime: 6, bodyTime: 11},
        {dia: 6, faceTime: 7, bodyTime: 12},
        {dia: 8, faceTime: 7, bodyTime: 13},
        {dia: 10, faceTime: 8, bodyTime: 13},
        {dia: 12, faceTime: 8, bodyTime: 14},
        {dia: 14, faceTime: 9, bodyTime: 15},
        {dia: 16, faceTime: 9, bodyTime: 15},
        {dia: 18, faceTime: 10, bodyTime: 16},
        {dia: 20, faceTime: 11, bodyTime: 17},
    ],

    "EM3" : [
        {dia: 5, faceTime: 7, bodyTime: 12},
        {dia: 6, faceTime: 8, bodyTime: 13},
        {dia: 8, faceTime: 8, bodyTime: 14},
        {dia: 10, faceTime: 9, bodyTime: 15},
        {dia: 12, faceTime: 10, bodyTime: 16},
        {dia: 14, faceTime: 10, bodyTime: 17},
        {dia: 16, faceTime: 11, bodyTime: 17},
        {dia: 18, faceTime: 11, bodyTime: 18},
        {dia: 20, faceTime: 12, bodyTime: 19},
    ],

    "EM4" : [
        {dia: 5, faceTime: 7, bodyTime: 13},
        {dia: 6, faceTime: 8, bodyTime: 14},
        {dia: 8, faceTime: 8, bodyTime: 15},
        {dia: 10, faceTime: 9, bodyTime: 16},
        {dia: 12, faceTime: 10, bodyTime: 17},
        {dia: 14, faceTime: 10, bodyTime: 18},
        {dia: 16, faceTime: 11, bodyTime: 18},
        {dia: 18, faceTime: 11, bodyTime: 19},
        {dia: 20, faceTime: 12, bodyTime: 20},
    ],

    "EM5" : [
        {dia: 5, faceTime: 8, bodyTime: 16},
        {dia: 6, faceTime: 9, bodyTime: 17},
        {dia: 8, faceTime: 9, bodyTime: 19},
        {dia: 10, faceTime: 10, bodyTime: 20},
        {dia: 12, faceTime: 10, bodyTime: 21},
        {dia: 14, faceTime: 11, bodyTime: 21},
        {dia: 16, faceTime: 11, bodyTime: 22},
        {dia: 18, faceTime: 12, bodyTime: 23},
        {dia: 20, faceTime: 12, bodyTime: 24},
    ],

    "EM6" : [
        {dia: 5, faceTime: 8, bodyTime: 17},
        {dia: 6, faceTime: 9, bodyTime: 18},
        {dia: 8, faceTime: 10, bodyTime: 20},
        {dia: 10, faceTime: 11, bodyTime: 22},
        {dia: 12, faceTime: 12, bodyTime: 23},
        {dia: 14, faceTime: 12, bodyTime: 24},
        {dia: 16, faceTime: 13, bodyTime: 24},
        {dia: 18, faceTime: 13, bodyTime: 25},
        {dia: 20, faceTime: 14, bodyTime: 27},
    ],

    "EM8" : [
        {dia: 10, faceTime: 13, bodyTime: 24},
        {dia: 12, faceTime: 14, bodyTime: 25},
        {dia: 14, faceTime: 14, bodyTime: 26},
        {dia: 16, faceTime: 15, bodyTime: 29},
        {dia: 18, faceTime: 16, bodyTime: 29},
        {dia: 20, faceTime: 16, bodyTime: 30},
    ],

    "EM9" : [
        {dia: 10, faceTime: 13, bodyTime: 26},
        {dia: 12, faceTime: 14, bodyTime: 27},
        {dia: 14, faceTime: 14, bodyTime: 28},
        {dia: 16, faceTime: 15, bodyTime: 30},
        {dia: 18, faceTime: 16, bodyTime: 31},
        {dia: 20, faceTime: 16, bodyTime: 32},
    ],
};


function populateDiameterOption(toolDiameterId, edgesValue) {
    const $selectElement = $("#" + toolDiameterId);
    const optionValues = grindingTimes[edgesValue];

    if ($selectElement.length) {
        $selectElement.empty();

        $.each(optionValues, function(index, value) {
            $selectElement.append($("<option>", {
                value: value.dia,
                text: value.dia
            }));
        });
    }
}

$("#cuttingEdges").change(function() {
    var edgesValue = $(this).val();

    $(".diameterOption").remove();
    populateDiameterOption("endMillCuttingDiameter", edgesValue);
    $("#endMillCuttingDiameter").prop('disabled', false);

})