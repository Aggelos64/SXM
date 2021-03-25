
function otionSelector(selector){
    var value = selector.val()
    selector.find('option').eq(0).val('')
    selector.find('option[value="'+ value +'"]').prop('selected', true)
}

function otionSelector2(selector){
    var value = selector.val()
    if(value == '') return
    selector.find('option').eq(0).val('')
    selector.find('option:contains("'+ value +'")').prop('selected', true)
}

$(document).ready(function () {
    otionSelector($('#floor'))
    otionSelector($('#floors'))
    otionSelector($('#rooms'))
    otionSelector($('#bathrooms'))
    otionSelector($('#kitchens'))
    otionSelector($('#livingrooms'))
    otionSelector2($('#heat'))
    otionSelector2($('#heatType'))
});
