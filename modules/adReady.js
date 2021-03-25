AdReady = {//TODO REFACTOR
    category: function(ad){
        if(typeof ad.propType == 'undefined' || ad.propType == '') return 0
        if(typeof ad.propType.main == 'undefined' || ad.propType.main == '') return 0
        if(typeof ad.propType.sub == 'undefined' || ad.propType.sub == '') return 0
        if(typeof ad.type == 'undefined' || ad.type == null) return 0
        return 2
    },
    location: function(ad){
        if(typeof ad.location == 'undefined' || ad.location == '') return 0
        if(typeof ad.location.main == 'undefined' || ad.location.main == '') return 0
        if(typeof ad.location.sub == 'undefined' || ad.location.sub == '') return 0
        if(typeof ad.location.area == 'undefined' || ad.location.area == '') return 0
        if(typeof ad.location.street == 'undefined' || ad.location.street == '') return 0
        if(typeof ad.location.address == 'undefined' || ad.location.address == '') return 0
        //if(typeof ad.location.mapVerified == 'undefined' || ad.location.mapVerified == '') return 0 //TODO
        return 2
    },
    mainFeatures: function(ad){
        if(typeof ad.price.now == 'undefined' || ad.price.now == null) return 0
        if(typeof ad.area == 'undefined' || ad.area == null) return 0

        if(ad.propType.main != 'land'){
            if(typeof ad.atrr.floor == 'undefined' || ad.atrr.floor == null) return 1
            if(typeof ad.atrr.floors == 'undefined' || ad.atrr.floors == null) return 1
            if(typeof ad.atrr.propArea == 'undefined' || ad.atrr.propArea == '') return 1
            if(typeof ad.atrr.heatType == 'undefined' || ad.atrr.heatType == '') return 1
            if(typeof ad.atrr.heat == 'undefined' || ad.atrr.heat == '') return 1
        }
        if(ad.propType.main == 'res' || ad.propType.main == 'pro'){
            if(typeof ad.atrr.bedrooms == 'undefined' || ad.atrr.bedrooms == null) return 1
            if(typeof ad.atrr.bathrooms == 'undefined' || ad.atrr.bathrooms == null) return 1
            if(typeof ad.atrr.kitchens == 'undefined' || ad.atrr.kitchens == null) return 1
            if(typeof ad.atrr.constAge == 'undefined' || ad.atrr.constAge == null) return 1
        }
        if(ad.propType.main == 'res' && (typeof ad.atrr.livingrooms == 'undefined' || ad.atrr.livingrooms == null)) return 1
        return 2
    },
    more: function(ad){
        if(typeof ad.atrr.extra == 'undefined' || ad.atrr.extra == {}) return 1
        if((ad.propType.main != 'land') && (typeof ad.price.utilities == 'undefined' || ad.price.utilities == null)) return 1
        if((ad.propType.main == 'res' || ad.propType.main == 'pro') && (typeof ad.atrr.energyClass == 'undefined' || ad.atrr.energyClass == '')) return 1
        if((ad.propType.main == 'res' || ad.propType.main == 'land') &&  (typeof ad.atrr.direction == 'undefined' || ad.atrr.direction == '')) return 1
        if(ad.propType.main == 'res' && (typeof ad.atrr.kind == 'undefined' || ad.atrr.kind == '')) return 1
        if(typeof ad.atrr.zone == 'undefined' || ad.atrr.zone == '') return 1
        if(ad.propType.main == 'pro' && (typeof ad.atrr.powerPhases == 'undefined' || ad.atrr.powerPhases == '')) return 1
        if(ad.propType.main == 'land' && (typeof ad.atrr.buildFactor == 'undefined' || ad.atrr.buildFactor == null)) return 1
        if(ad.propType.main == 'land' && (typeof ad.atrr.coverFactor == 'undefined' || ad.atrr.coverFactor == null)) return 1
        if(ad.propType.main == 'other' && (typeof ad.atrr.bussnessAge == 'undefined' || ad.atrr.bussnessAge == null)) return 1
        return 2
    },
    discription: function(ad){
        if(typeof ad.discription == 'undefined' || ad.discription == '') return 1
        return 2
    },
    pics: function(ad){
        if(typeof ad.pics == 'undefined' || ad.pics == []) return 1
        if(typeof ad.video == 'undefined' || ad.video == '') return 1
        return 2
    },
    contact: function(ad){
        if(typeof ad.contactInfo == 'undefined' || ad.contactInfo == '') return 0
        if(typeof ad.contactInfo.fname == 'undefined' || ad.contactInfo.fname == '') return 0
        if(typeof ad.contactInfo.lname == 'undefined' || ad.contactInfo.lname == '') return 0
        if(typeof ad.contactInfo.tel == 'undefined' || ad.contactInfo.tel == null) return 0
        if(typeof ad.contactInfo.email == 'undefined' || ad.contactInfo.email == '') return 0
        return 2
    },
    ready: function(ad, user){
        if(!(user.verified)) return false
        if(typeof ad.propType == 'undefined' || ad.propType == '') return false
        if(typeof ad.propType.main == 'undefined' || ad.propType.main == '') return false
        if(typeof ad.propType.sub == 'undefined' || ad.propType.sub == '') return false
        if(typeof ad.type == 'undefined' || ad.type == '') return false
        if(typeof ad.location == 'undefined' || ad.location == '') return false
        if(typeof ad.location.main == 'undefined' || ad.location.main == '') return false
        if(typeof ad.location.sub == 'undefined' || ad.location.sub == '') return false
        if(typeof ad.location.area == 'undefined' || ad.location.area == '') return false
        if(typeof ad.location.street == 'undefined' || ad.location.street == '') return false
        if(typeof ad.location.address == 'undefined' || ad.location.address == '') return false
        //if(typeof ad.location.mapVerified == 'undefined' || ad.location.mapVerified == '') return false //TODO
        if(typeof ad.contactInfo == 'undefined' || ad.contactInfo == '') return false
        if(typeof ad.contactInfo.fname == 'undefined' || ad.contactInfo.fname == '') return false
        if(typeof ad.contactInfo.lname == 'undefined' || ad.contactInfo.lname == '') return false
        if(typeof ad.contactInfo.tel == 'undefined' || ad.contactInfo.tel == null) return false
        if(typeof ad.contactInfo.email == 'undefined' || ad.contactInfo.email == '') return false
        if(typeof ad.price.now == 'undefined' || ad.price.now == null) return false
        if(typeof ad.area == 'undefined' || ad.area == null) return false
        return true
    }
}

module.exports = AdReady