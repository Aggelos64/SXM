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
    otionSelector2($('#energyclass'))
    otionSelector($('#bage'))
    otionSelector2($('#direction'))
    otionSelector2($('#kind'))
    otionSelector2($('#zone'))
    otionSelector2($('#phases'))
});