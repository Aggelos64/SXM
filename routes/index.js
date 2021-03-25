const express = require('express')
const router = express.Router()
const cookie = require('cookie');
const { ensureAuthenticated } = require('../config/auth')
const utilities = require('../modules/utilities')
const Ad = require('../models/ad-schema')


router.get('/', (req, res) => {
    var cookies = {}
    if(typeof req.headers.cookie !== 'undefined'){
        cookies = cookie.parse(req.headers.cookie)
    }
    var temp = { //TODO un-comment
        //public: true
    }
    if(typeof cookies.type !== 'undefined') temp.type = cookies.type//TODO refactor Object.assign to object['prop'] = value
    if(typeof cookies.propTypeSub !== 'undefined') temp = Object.assign({'propType.sub': cookies.propTypeSub},temp)//TODO try switching temp with {}
    if(typeof cookies.main !== 'undefined') temp = Object.assign({'location.main': cookies.main},temp)
    if(typeof cookies.sub !== 'undefined') temp = Object.assign({'location.sub': cookies.sub},temp)
    var query = Ad.find(temp).sort('adAtrr.date').limit(7)
    
    if(typeof temp.propType === 'undefined') temp.propType = {}
    temp.price = {}
    temp.area = {}

    if(typeof cookies.propTypeMain !== 'undefined') temp.propType.main = cookies.propTypeMain
    if(typeof cookies.pRange !== 'undefined'){
        var p = cookies.pRange.split("-")
        temp = temp.price.min = p[0]
        temp = temp.price.max = p[1]
    }
    if(typeof cookies.aRange !== 'undefined'){
        var a = cookies.aRange.split("-")
        temp = temp.area.min = a[0]
        temp = temp.area.max = a[1]
    }
    query.exec(function (err, docs) {
        res.render('index',{nofooter:false,hemail:utilities.getEmail(req),justUp:docs,glider:true,cookie:temp})
    });
})

router.get('/test', ensureAuthenticated, (req, res) => {
    res.send(req.user)
})

router.get('/info', (req, res) => {
    res.render('info',{hemail:utilities.getEmail(req)})
})

router.get('/tos', (req, res) => {
    res.render('tos',{hemail:utilities.getEmail(req)})
})

module.exports = router