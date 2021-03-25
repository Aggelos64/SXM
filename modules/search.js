const Ad = require('../models/ad-schema')
const fs = require("fs")

let rawdata = fs.readFileSync('config/arrays.json')
let arrays = JSON.parse(rawdata)

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key)) return false
    }
    return true
}

//TODO
var querys = [
    {
        name:'pr',//Price range
        exe: function(value, sobj){
            if( !/^[0-9]*\-[0-9]*$/.test(value) ) return
            var limits = value.split('-')
            if(limits[1] != '0'){
                sobj['price.now'] = {$gte:Number(limits[0]),$lte:Number(limits[1])}
                return
            }
            sobj['price.now'] = {$gte:Number(limits[0])}
        }
    },{
        name:'ar',//Area range
        exe: function(value, sobj){
            if( !/^[0-9]*\-[0-9]*$/.test(value) ) return
            var limits = value.split('-')
            if(limits[1] != '0'){
                sobj['area'] = {$gte:Number(limits[0]),$lte:Number(limits[1])}
                return
            }
            sobj['area'] = {$gte:Number(limits[0])}
        }
    },{
        name:'st',//Sub propertyType
        exe: function(value, sobj){
            
        }
    },{
        name:'fr',//Floor range
        exe: function(value, sobj){
            if( !/^[0-9]*\-[0-9]*$/.test(value) ) return
            var limits = value.split('-')
            if(limits[1] != '0'){
                sobj['atrr.floor'] = {$gte:Number(limits[0]),$lte:Number(limits[1])}
                return
            }
            sobj['atrr.floor'] = {$gte:Number(limits[0])}
        }
    },{
        name:'rr',//Room range
        exe: function(value, sobj){
            if( !/^[0-9]*\-[0-9]*$/.test(value) ) return
            var limits = value.split('-')
            if(limits[1] != '0'){
                sobj['atrr.bedrooms'] = {$gte:Number(limits[0]),$lte:Number(limits[1])}
                return
            }
            sobj['atrr.bedrooms'] = {$gte:Number(limits[0])}
        }
    },{
        name:'br',//Bath range
        exe: function(value, sobj){
            if( !/^[0-9]*\-[0-9]*$/.test(value) ) return
            var limits = value.split('-')
            if(limits[1] != '0'){
                sobj['atrr.bathrooms'] = {$gte:Number(limits[0]),$lte:Number(limits[1])}
                return
            }
            sobj['atrr.bathrooms'] = {$gte:Number(limits[0])}
        }
    },{
        name:'h',//Heat
        exe: function(value, sobj){
            
        }
    },{
        name:'ht',//Heat type
        exe: function(value, sobj){
            
        }
    },{
        name:'yr',//Year range
        exe: function(value, sobj){
            if( !/^[0-9]*\-[0-9]*$/.test(value) ) return
            var limits = value.split('-')
            if(limits[1] != '0'){
                sobj['atrr.constAge'] = {$gte:Number(limits[0]),$lte:Number(limits[1])}
                return
            }
            sobj['atrr.constAge'] = {$gte:Number(limits[0])}
        }
    },{
        name:'status',//Status
        exe: function(value, sobj){
            
        }
    },{
        name:'ada',//Ad age
        exe: function(value, sobj){
            
        }
    },{
        name:'adaup',//Ad last updated
        exe: function(value, sobj){
            
        }
    },{
        name:'id',//Id
        exe: function(value, sobj){
            
        }
    },{
        name:'ppr',//Price Per sm range //TODO testing
        exe: function(value, sobj){
            if( !/^[0-9]*\-[0-9]*$/.test(value) ) return
            var limits = value.split('-')
            if(limits[1] != '0'){
                sobj['ppsm'] = {$gte:Number(limits[0]),$lte:Number(limits[1])}
                return
            }
            sobj['ppsm'] = {$gte:Number(limits[0])}
        }
    },{
        name:'ec',//Energy Class
        exe: function(value, sobj){
            
        }
    },{
        name:'pe',//Pro Energy
        exe: function(value, sobj){
            
        }
    },{
        name:'d',//direction
        exe: function(value, sobj){
            
        }
    },{
        name:'n',//near
        exe: function(value, sobj){
            
        }
    },{
        name:'k',//kind
        exe: function(value, sobj){
            
        }
    },{
        name:'z',//zone
        exe: function(value, sobj){
            
        }
    },{
        name:'hp',//Has Photos
        exe: function(value, sobj){
            
        }
    },{
        name:'isd',//Is Discounted
        exe: function(value, sobj){
            
        }
    },{
        name:'ba',//Age of Bussness
        exe: function(value, sobj){
            
        }
    }
]

function parsequery(query, obj) {
    for(var key in query){
        var temp = querys.find(item => {return item.name === key})
        if(temp){
            temp.exe(query[key],obj)
        }
    }
}

function makeExtra(str, sobj){
    var extraBin = (str >>> 0).toString(2) //turn decimal to binary
    var arr
    var type = sobj['propType.main']
    if(type === 'res'){
        arr = arrays.res
    }else if(type === 'pro'){
        arr = arrays.pro
    }else if(type === 'land'){
        arr = arrays.land
    }else{
        arr = arrays.other
    }
    if(extraBin.length > arr.length) return;
    extraBin = "0".repeat(arr.length - extraBin.length) + extraBin

    var extra = {}

    for(var i=0;i<extraBin.length;i++){
        if(extraBin[i] === '1'){
            extra['atrr.extra.' + arr[i].value] = true
        }
    }
    Object.assign(sobj,extra)
}

Search = {
    parseReq: function(req, res, next){
        var searchObj = {public:true}

        //TODO if id

        if(typeof req.params.location === 'undefined' || !/^(l([0-9]+\-){0,2}[0-9]+){1,5}$/.test(req.params.location)){
            res.sendStatus(400)
            return
        }
        if(typeof req.params.type === 'undefined' || !( req.params.type === 'true' || req.params.type === 'false')){
            res.sendStatus(400)
            return
        }
        if(typeof req.params.propTypeMain === 'undefined' || !/^res|pro|other|land$/.test(req.params.propTypeMain)){
            res.sendStatus(400)
            return
        }

        //searchObj['location.main'] = req.params.location//TODO
        searchObj.type = req.params.type
        searchObj['propType.main'] = req.params.propTypeMain

        parsequery(req.query, searchObj)
        
        if(typeof req.query.extra !== 'undefined'){
            makeExtra(req.query.extra, searchObj)
        }

        req.searchObj = searchObj
        return next()
    }
}

module.exports = Search