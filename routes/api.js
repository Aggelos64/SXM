const express = require('express')
const router = express.Router()
const Ad = require('../models/ad-schema')
const utilities = require('../modules/utilities')

router.get('/locationAutocoplete', (req,res) =>{
    if(typeof req.query.q === 'string'){
        res.status(200).json({
            suggestions: utilities.getSuggestions(locationsArr, req.query.q)
        })
    } else {
        res.status(400).json({})
    }
})

router.get('/getChildren', (req,res) =>{
    if(typeof req.query.q === 'string' && typeof req.query.qt === 'string'){
        res.status(200).json({
            suggestions: utilities.getChildren(locationsObj, req.query.q, req.query.qt)
        })
    } else {
        res.status(400).json({})
    }
})

router.get('/IndexAds', (req, res) =>{
    if(typeof req.query.q === 'string'){
        res.status(200).json({
            suggestions: utilities.getLocation(locationsObj.admin, req.query.q)
        })
    } else {
        res.status(400).json({})
    }
})

module.exports = router