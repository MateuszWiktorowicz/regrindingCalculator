function getUniqueToolTypes() {
    var toolsData = JSON.parse(sessionStorage.getItem('toolsGeometries'));
    
    var uniqueNamesSet = new Set(toolsData.map(tool => tool.name));
    var uniqueNamesArray = Array.from(uniqueNamesSet);
    return uniqueNamesArray;
}

function populateRadioToolTypes() {
      var toolTypes = getUniqueToolTypes();
    
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

populateRadioToolTypes();