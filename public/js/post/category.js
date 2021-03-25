const resTypes = ['', 'Διαμέρισμα', 'Studio-Γκαρσονιέρα', 'Μαζονέτα', 'Μονοκατοικία', 'Βίλα', 'Ρετιρέ', 'Οροφοδιαμέρισμα', 'Συγκρότημα διαμερισμάτων', 'Κτίριο', 'Loft', 'Bungalow', 'Εξοχική κατοικία', 'Φάρμα-Ράντσο', 'Πλωτό σπίτι', 'Άλλο'];
const workTypes = ['', 'Κατάστημα', 'Γραφείο', 'Αποθήκη', 'Κτίριο επαγγελματικών χωρων', 'Αίθουσα', 'Εκθεσιακός χωρος', 'Βιομηχανικός χωρος', 'Βιοτεχνηκός χωρος', 'Ξενοδοχείο', 'Παρκινγκ', 'Διαμέρισμα', 'Οικία', 'Άλλο'];
const landTypes = ['', 'Οικόπεδο', 'Αγροτεμάχειο', 'Νησί', 'Άλλο'];
const otherTypes = ['', 'Επιχείρηση', 'Άλλο'];

var typeSelect;

function fillTypes(types, select){
    typeSelect.empty();

    $.each(types, function (i, item) {
        $(typeSelect).append($('<option>', { 
            text : item 
        }));
    });

    if(select != ''){
        $(typeSelect).find(":contains(" + select + ")").attr('selected','selected');
    }
}

function fill(clType, select){
    if(clType === "pro") {
        fillTypes(workTypes, select);
    } else if(clType === "land") {
        fillTypes(landTypes, select);
    } else if(clType === "other") {
        fillTypes(otherTypes, select);
    }else {
        fillTypes(resTypes, select);
    }
}

$(document).ready(function () {
    var typeSelector = $('#typeSelector');
    typeSelect = $('.types');

    fill(typeSelector.val(), $(typeSelect).val());

    typeSelector.change(function() {
        fill(typeSelector.val(), '');
    })
});
