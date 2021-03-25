const express = require('express')
const router = express.Router()
const Ad = require('../models/ad-schema')
const utilities = require('../modules/utilities')
const search = require('../modules/search')

const temp = {areas: ['Θεσσαλονικη'] ,type:true,hemail:'temp'}

router.get('/results/:location/:type/:propTypeMain', search.parseReq, (req, res) => {
    //Make db query
    var query = Ad.find(req.searchObj).sort('adAtrr.date').limit(typeof req.body.qnt !== 'undefined' ? req.body.qnt : 15)
    //Query db and send docs to view engine
    query.exec(function (err, docs) {
        res.render('search',{hemail:utilities.getEmail(req),auto:req.body,docs:docs})
    });
})

// router.get('/results', (req, res) => {
//     var query = Ad.find()
//     query.exec(function (err, docs) {
//         res.render('search',{hemail:utilities.getEmail(req),auto:req.body,docs:docs})
//     });
// })

// router.post('/results', (req, res) => {
//     //Get search obj
//     var searchObj = search.parseReq(req.body)
//     //Make db query
//     var query = Ad.find(searchObj).sort('adAtrr.date').limit(typeof req.body.qnt !== 'undefined' ? req.body.qnt : 15)
//     //Query db and send docs to view engine
//     query.exec(function (err, docs) {
//         res.render('search',{hemail:utilities.getEmail(req),auto:req.body,docs:docs})
//     });
// })

router.get('/show', (req, res) => {
    Ad.findById(req.query.id)
        .then(ad => {
            if(ad && true){//TODO if is public
                res.render('showAd', {ad:ad,hemail:utilities.getEmail(req),glider:true})
            } else {
                res.sendStatus(404)//TODO
            }
        })
        .catch(err =>{
            res.sendStatus(404)//TODO
        })
})

module.exports = router