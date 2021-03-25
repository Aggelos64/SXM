function otionSelector(selector){
    var value = selector.val()
    selector.find('option').eq(0).val('')
    selector.find('option[value="'+ value +'"]').prop('selected', true)
}
$(document).ready(function () {
    otionSelector($('#contactTime'))
});