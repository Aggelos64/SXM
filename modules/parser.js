var extra = [{ name: "Ανελκυστήρας", value: "elevator" } ,{ name: "Ανεμιστήρες οροφής", value: "ceilingFan" },{ name: "Αποθήκη", value: "storage" },{ name: "Βεράντα", value: "veranta" },{ name: "Διπλά τζάμια", value: "doubleGlass" },{ name: "Δορυφορική κεραία", value: "satelite" },{ name: "Εωδοδαπέδια θέρμανση", value: "floorHeating" },{ name: "Επιπλωμένο", value: "furnitures" },{ name: "Εσωτερική σκάλα", value: "insideStairs" },{ name: "Ηλιακός θερμοσίφωνας", value: "solarHeating" },{ name: "Θέα", value: "view" },{ name: "Θέσεις στάθμευσης", value: "parking" },{ name: "Θυροτηλεόραση", value: "buzzCamera" },{ name: "Κατοικίδια ευπρόσδεκτα", value: "pets" },{ name: "Κήπος", value: "garden" },{ name: "Κλιματισμός", value: "ac" },{ name: "Μπαλκόνι", value: "balcony" },{ name: "Μπόιλερ", value: "boiler" },{ name: "Νυχτερινό ρεύμα", value: "nightPower" },{ name: "Πισίνα", value: "pool" },{ name: "Πόρτα ασφαλείας", value: "securityDoor" },{ name: "Ράμπα για ΑΜΕΑ", value: "ramp" },{ name: "Σίτες", value: "sita" },{ name: "Σοφίτα", value: "attic" },{ name: "Συναγερμός", value: "alarm" },{ name: "Τέντες", value: "tent" },{ name: "Τζάκι", value: "firePlace" },{ name: "Χωρίς κοινόχρηστα", value: "withoutUtilities" },{ name: "Jacuzzi", value: "jacuzzi" },{ name: "Playroom", value: "playroom" },{ name: "Γωνιακό", value: "corner" },{ name: "Ράμπα φορτοελφόρτωσης", value: "loadingDock" },{ name: "Ρετιρέ", value: "penthouse" },{ name: "Εντός σχεδίου πόλης", value: "inCityPlanning" },{ name: "Κατάλληλο για αγροτική χρηση", value: "forFarming" },{ name: "Εξοπλισμένο", value: "equiped" },{ name: "Χωρίς αέρα", value: "air" }]

function findObj(val){
    var temp = false
    extra.forEach(item => {
        if(item.value == val){
            temp = item
        }
    })
    return temp
}

Parser = {
    extraToArray: function(instance){
        var temp = []
        var temp2 = Object.entries(instance)
        var done
        temp2.forEach(element => {
            if(element[1] != null){
                done = findObj(element[0])
                if(done){
                    temp.push(done.name + ': ' + (element[1] ? 'Ναι' : 'Όχι'))
                }
            }
        })
        return temp
    }
}
module.exports = Parser