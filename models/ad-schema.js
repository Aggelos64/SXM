const mongoose = require('mongoose')

const adsSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    location: {
        main:{
            type: String
        },
        sub:{
            type: String
        },
        area:{
            type: String
        },
        street:{
            type: String
        },
        address:{
            type: String
        },
        mapVerified:{
            type: Boolean
        },
        map:{
            x:{
                type:Number
            },
            y:{
                type:Number
            }
        }
    },
    type: {
        type: Boolean, //true = buy, false = rent
        //required: true
    },
    contactInfo:{
        fname:{
            type: String
        },
        lname:{
            type: String
        },
        tel:{
            type: Number
        },
        email:{
            type: String
        },
        contactTime:{
            type: Boolean//true=morning false=evening null=any
        }
    },
    discription:{
        type: String
    },
    price: {
        init: {
            type: Number,
            //required: true
        },
        now: {
            type: Number
        },
        utilities: {
            type: Number
        }
    },
    propType: {
        main: {
            type: String,
            //required: true
        },
        sub: {
            type: String,
            //required: true
        }
    },
    area: {
        type: Number//,
        //required: true
    },

    atrr: {
        floor: {
            type: Number
        },
        floors: {
            type: Number
        },
        bedrooms: {
            type: Number
        },
        kitchens:{
            type: Number
        },
        livingrooms:{
            type: Number
        },
        bathrooms: {
            type: Number
        },
        propArea:{
            type: Number
        },
        heat: {
            type: String
        },
        heatType: {
            type: String
        },
        constAge: {
            type: Number
        },
        status: [
            {type: String}
        ],
        energyClass: {
            type: String
        },
        powerPhases:{
            type: String
        },
        direction: {
            type: String
        },
        near: [
            {type: String}
        ],
        kind: {
            type: String
        },
        zone: {
            type: String
        },
        availableFrom:{
            type: Date
        },
        buildFactor:{
            type: Number
        },
        coverFactor:{
            type: Number
        },
        bussnessAge:{
            type: Number
        },
        extra: {
            elevator: {
                type: Boolean
            },
            ceilingFan: {
                type: Boolean
            },
            storage:{
                type: Boolean
            },
            veranta: {
                type: Boolean
            },
            doubleGlass: {
                type: Boolean
            },
            satelite: {
                type: Boolean
            },
            floorHeating: {
                type: Boolean
            },
            furnitures: {
                type: Boolean
            },
            insideStairs: {
                type: Boolean
            },
            solarHeating: {
                type: Boolean
            },
            view: {
                type: Boolean
            },
            parking: {
                type: Boolean
            },
            buzzCamera: {
                type: Boolean
            },
            pets: {
                type: Boolean
            },
            garden: {
                type: Boolean
            },
            ac: {
                type: Boolean
            },
            balcony: {
                type: Boolean
            },
            boiler: {
                type: Boolean
            },
            nightPower: {
                type: Boolean
            },
            pool: {
                type: Boolean
            },
            securityDoor: {
                type: Boolean
            },
            ramp: {
                type: Boolean
            },
            sita: {
                type: Boolean
            },
            attic: {
                type: Boolean
            },
            alarm: {
                type: Boolean
            },
            tent: {
                type: Boolean
            },
            firePlace: {
                type: Boolean
            },
            withoutUtilities: {
                type: Boolean
            },
            jacuzzi: {
                type: Boolean
            },
            playroom: {
                type: Boolean
            },
            corner:{
                type: Boolean
            },
            loadingDock:{
                type: Boolean
            },
            penthouse:{
                type: Boolean
            },
            inCityPlanning:{
                type: Boolean
            },
            forFarming:{
                type: Boolean
            },
            equiped:{
                type: Boolean
            },
            air:{
                type: Boolean
            }
        }
    },
    adAtrr: {
        date: {
            type: Date,
            required: true,
            default: Date()
        },
        updated: {
            type: Date,
        },
        hasDiscount: {
            type: Boolean,
            default: false
        }
    },
    pics: [{
        pic: {
            type: Buffer
        },
        ext:{
            type: String
        }
    }],
    video:{
        type: String
    },
    public:{
        type: Boolean,
        default: false
    }
})

adsSchema.virtual('imgPaths').get(function() {
    if(this.pics != 'undefined' && this.pics != null){
        var paths = []
        for(var i=0;i<this.pics.length;i++){
            paths.push(`data:${this.pics[i].ext};charset=utf-8;base64,${this.pics[i].pic.toString('base64')}`)
        }
        return paths
    }
})

adsSchema.virtual('statusString').get(function() {
    if(!(Array.isArray(this.atrr.status) && this.atrr.status.length)) return ''
    if(this.atrr.status.length == 1) return this.atrr.status[0]
    var temp = this.atrr.status[0]
    for(var i=1;i<this.atrr.status.length-1;i++){
        temp += ' , ' + this.atrr.status[i]
    }
    temp += ' & ' + this.atrr.status[this.atrr.status.length-1]
    return temp
})

//Price per square meter
adsSchema.virtual('ppsm').get(function() {
    return this.price.now / this.area
})

const par = require('../modules/parser')

adsSchema.virtual('sss').get(function() {
    return par.extraToArray(this.atrr.extra)
})

const Ads = mongoose.model('Ads', adsSchema)
module.exports = Ads
