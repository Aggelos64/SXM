
const resTypes = ['Όλες οι υποκατηγορίες', 'Διαμέρισμα', 'Studio-Γκαρσονιέρα', 'Μεζονέτα', 'Μονοκατοικία', 'Βίλα', 'Ρετιρέ', 'Οροφοδιαμέρισμα', 'Συγκρότημα διαμερισμάτων', 'Κτίριο', 'Loft', 'Bungalow', 'Εξοχική κατοικία', 'Φάρμα-Ράντσο', 'Πλωτό σπίτι', 'Άλλο'];
const workTypes = ['Όλες οι υποκατηγορίες', 'Κατάστημα', 'Γραφείο', 'Αποθήκη', 'Κτίριο επαγγελματικών χωρων', 'Αίθουσα', 'Εκθεσιακός χωρος', 'Βιομηχανικός χωρος', 'Βιοτεχνηκός χωρος', 'Ξενοδοχείο', 'Παρκινγκ', 'Διαμέρισμα', 'Οικία', 'Άλλο'];
const landTypes = ['Όλες οι υποκατηγορίες', 'Οικόπεδο', 'Αγροτεμάχειο', 'Νησί', 'Άλλο'];
const otherTypes = ['Όλες οι υποκατηγορίες', 'Επιχείρηση', 'Άλλο'];

const resExtra = ['Ανελκυστήρας', 'Ανεμιστήρες οροφής', 'Αποθήκη', 'Βεράντα', 'Διπλά τζάμια', 'Δορυφορική κεραία', 'Εωδοδαπέδια θέρμανση', 'Επιπλωμένο', 'Εσωτερική σκάλα', 'Ηλιακός θερμοσίφωνας', 'θέα', 'Θέσεις στάθμευσης', 'Θυροτηλεόραση', 'Κατοικίδια ευπρόσδεκτα', 'Κήπος', 'Κλιματισμός', 'Μπαλκόνι', 'Μπόιλερ', 'Νυχτερινό ρεύμα', 'Πισίνα', 'Πόρτα ασφαλείας', 'Ράμπα για ΑΜΕΑ', 'Σίτες', 'Σοφίτα', 'Συναγερμός', 'Τέντες', 'Τζάκι', 'Χωρίς κοινόχρηστα', 'Jacuzzi', 'Playroom'];
const workExtra = ['Ανελκυστήρας', 'Αποθήκη', 'Γωνιακό', 'Θέα', 'Θέσεις στάθμευσης', 'Κλιματισμός', 'Μπαλκόνια', 'Πόρτα ασφαλείας', 'Ράμπα φορτοελφόρτωσης', 'Ρετιρέ', 'Συναγερμός'];
const landExtra = ['Γωνιακό', 'Εντός σχεδίου πόλης', 'Θέα', 'Κατάλληλο για αγροτική χρηση'];
const otherExtra = ['Ανελκυστήρας', 'Αποθήκη', 'Γωνιακό', 'Εξοπλισμένο', 'Θέα', 'Θέσεις στάθμευσης', 'Κλιματισμός', 'Ράμπα φορτοελφόρτωσης', 'Συναγερμός', 'Χωρίς "αέρα"', 'Χωρίς κοινόχρηστα'];

const price1 = ['150','200','300','500','750','1000','1500','2000','3000+'];
const price2 = ['50.000','75.000','100.000','150.000','200.000','250.000','300.000','500.000','750.000','1.000.000+'];

const area1 = ['40','60','70','85','100','120','150','200','250','300','400','500+'];
const area2 = ['50','100','200','350','500','750','1000','2000','3000','5000','7500','10.000+'];

var typeSelect;
var extra0;
var extra1;
var pricelist;
var buyRent;
var arealist;

function fillTypes(types){
    typeSelect.empty();

    $.each(types, function (i, item) {
        $(typeSelect).append($('<option>', { 
            text : item 
        }));
    });
}

//<label class="form-check-label d-block"><input name="" value="t" class="form-check-input" type="checkbox"></label>

function fillExtra(extra){
    extra0.empty();
    extra1.empty();
    $.each(extra, function (i, item) {
        if( i<extra.length/2 ){
            $(extra0).append($('<label class="form-check-label d-block"><input name="" value="t" class="form-check-input" type="checkbox">' + item + '</label>'))
        } else {
            $(extra1).append($('<label class="form-check-label d-block"><input name="" value="t" class="form-check-input" type="checkbox">' + item + '</label>'))
        }
    });
}

function selectPrice(adType){
    $('#minprice,#maxprice').val('')
    if(adType === 'true'){
        fillPrice(price2);
    } else {
        fillPrice(price1);
    }
}

function fillPrice(prices){
    pricelist.empty();

    $.each(prices, function (i,item){
        $(pricelist).append($('<option>', { 
            text : item 
        }))
    })
}

function fillArea(areas){
    arealist.empty();

    $.each(areas, function (i,item){
        $(arealist).append($('<option>', { 
            text : item 
        }))
    })
}

function divController(show){
    $('.res').hide();
    $('.pro').hide();
    $('.land').hide();
    $('.other').hide();
    $(show).show();
}

function makeRes(){
    fillTypes(resTypes);
    fillExtra(resExtra);
    selectPrice($('input[name=type]:checked').val());
    fillArea(area1);
    divController('.res');
}

function makePro(){
    fillTypes(workTypes);
    fillExtra(workExtra);
    selectPrice($('input[name=type]:checked').val());
    fillArea(area1);
    divController('.pro');
}

function makeLand(){
    fillTypes(landTypes);
    fillExtra(landExtra);
    selectPrice($('input[name=type]:checked').val());
    fillArea(area2);
    divController('.land');
}

function makeOther(){
    fillTypes(otherTypes);
    fillExtra(otherExtra);
    selectPrice($('input[name=type]:checked').val());
    fillArea(area1);
    divController('.other');
}

function fill(clType){
    if(clType === "pro") {
        makePro();
    } else if(clType === "land") {
        makeLand();
    } else if(clType === "other") {
        makeOther();
    }else {
        makeRes();
    }
}

$(document).ready(function () {
    var typeSelector = $('#typeSelector');
    typeSelect = $('.types');
    extra0 = $('.extra').eq(0);
    extra1 = $('.extra').eq(1);
    buyRent = $('input[type=radio][name=type]');
    pricelist = $('#pricelist');
    arealist = $('#arealist');

    fill(typeSelector.val());

    typeSelector.change(function() {
        fill(typeSelector.val());
    })

    buyRent.change(function() {
        selectPrice(this.value);
    })

    $('select,input').change(function() {
        var temp = $(this).closest('.addbtn');
        $('.additional').remove();
        temp.append($('<button type="submit" class="additional btn btn-primary btn-block mt-3">Ανανέωση</button>'));
    });

    var qnt = $('#qnt');
    var sort = $('#sort');

    $('#qnt2').change(function() {
        qnt.empty();
        qnt.append($('<option>'+ this.value +'</option>'));
    })

    $('#sort2').change(function() {
        sort.empty();
        sort.append($('<option>'+ this.value +'</option>'));
    })

    const filters = $('#filters')

    if(window.innerWidth < 720){
        filters.removeClass('show');
    }

    window.onresize = function() {
        if(window.innerWidth > 720){
            filters.addClass('show');
        }
    }
})

