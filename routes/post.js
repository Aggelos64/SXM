const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')
var sanitize = require("mongo-sanitize")
const imageMimeTypes = ['image/jpeg', 'image/png']


const Ad = require('../models/ad-schema')
const User = require('../models/user-schema')

const ready = require('../modules/adReady')

router.use(ensureAuthenticated)
router.use((req, res, next) =>{
    req.body = sanitize(req.body)
    next()
})

router.get(['/', '/:page'], (req, res) =>{
    Ad.findById(req.query.id)
        .then(ad =>{
            if(ad){
                if(ad.owner+'' == req.user._id+''){ //they need to be strings for this to work
                    res.render('post/main', {page:req.params.page,ad:ad,nofooter:false,hemail:req.user.email,ready:isReadyToPost(ad, req.user)})//TODO
                } else {
                    res.sendStatus(401)//TODO
                }
            } else {
                res.sendStatus(404)//TODO
            }
        })
        .catch(err =>{
            res.redirect('/')
        })
})

//POST

// Initialize ad
router.post('/', (req, res) =>{
    const newAd = new Ad({
        owner: req.user._id
    })
    newAd.save()
        .then(ad =>{
            req.user.ads.push(ad._id)
            req.user.save()
            res.redirect('/post/category?id=' + ad._id)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

// Add/Replace category info, when replaced everything else changes
router.post('/category', (req, res) =>{
    Ad.findById(req.query.id)
        .then(ad =>{
            if(ad){
                if(ad.owner+'' == req.user._id+''){

                    if(ad.propType.main != '' && ad.propType.main != req.body.category){
                        if(ad.public){
                            //res.sendStatus(401)//TODO
                            ad.propType.sub = req.body.subcategory
                            ad.type = (req.body.type == 'true')
                        } else {
                            ad.atrr = {}
                            ad.propType.main = req.body.category
                            ad.propType.sub = req.body.subcategory
                            ad.type = (req.body.type == 'true')
                        }
                    } else {
                        ad.propType.sub = req.body.subcategory
                        ad.type = (req.body.type == 'true')
                    }

                    ad.save().then(ad => res.redirect('/post/' + req.body.btn + '?id=' + ad._id)).catch(err => {
                        console.log(err)
                        res.sendStatus(500)//TODO
                    } )
                } else {
                    res.sendStatus(401)
                }
            } else {
                res.sendStatus(404)
            }
        })
        .catch(err =>{
            console.log(err)
            res.sendStatus(500)
        })
})

// Add/Replace location info
router.post('/location', (req, res) =>{
    Ad.findById(req.query.id)
        .then(ad =>{
            if(ad){
                if(ad.owner+'' == req.user._id+''){


                    ad.location.main = req.body.main
                    ad.location.sub = req.body.sub
                    ad.location.area = req.body.location
                    ad.location.street = req.body.address1
                    ad.location.address = req.body.address2


                    ad.save().then(ad => res.redirect('/post/' + req.body.btn + '?id=' + ad._id)).catch(err => {
                        console.log(err)
                        res.sendStatus(500)
                    } )
                } else {
                    res.sendStatus(401)
                }
            } else {
                res.sendStatus(404)
            }
        })
        .catch(err =>{
            console.log(err)
            res.sendStatus(500)
        })
})

// Add/Replace main info
router.post('/main-features', (req, res) =>{
    Ad.findById(req.query.id)
        .then(ad =>{
            if(ad){
                if(ad.owner+'' == req.user._id+''){

                    if( ad.price.init == null) {
                        ad.price.init = 0
                    }
                    ad.price.now = req.body.price
                    if(ad.price.now < ad.price.init){
                        ad.adAtrr.hasDiscount = true
                    } else {
                        ad.adAtrr.hasDiscount = false
                    }

                    ad.area = req.body.area
                    ad.atrr.propArea = req.body.area2
                    ad.atrr.floor = req.body.floor
                    ad.atrr.floors = req.body.floors
                    ad.atrr.bedrooms = req.body.rooms
                    ad.atrr.bathrooms = req.body.bathrooms
                    ad.atrr.kitchens = req.body.kitchens
                    ad.atrr.livingrooms = req.body.livingrooms
                    ad.atrr.heat = req.body.heat
                    ad.atrr.heatType = req.body.heatType
                    ad.atrr.constAge = req.body.constage
                    ad.atrr.status = req.body.status

                    ad.save().then(ad => res.redirect('/post/' + req.body.btn + '?id=' + ad._id)).catch(err => {
                        console.log(err)
                        res.sendStatus(500)
                    } )
                } else {
                    res.sendStatus(401)
                }
            } else {
                res.sendStatus(404)
            }
        })
        .catch(err =>{
            console.log(err)
            res.sendStatus(500)
        })
})

// Add/Replace additional info
router.post('/more', (req, res) =>{
    Ad.findById(req.query.id)
        .then(ad =>{
            if(ad){
                if(ad.owner+'' == req.user._id+''){

                    more(ad, req.body)
                    ad.price.utilities = req.body.utilities
                    ad.atrr.energyClass = req.body.energyclass
                    ad.atrr.direction = req.body.direction
                    ad.atrr.kind = req.body.kind
                    ad.atrr.zone = req.body.zone
                    ad.atrr.near = req.body.near
                    ad.atrr.powerPhases = req.body.phases
                    ad.atrr.buildFactor = req.body.buildFactor
                    ad.atrr.coverFactor = req.body.coverFactor
                    ad.atrr.bussnessAge = req.body.bage
                    
                    if(req.body.available == ''){
                        ad.atrr.availableFrom = undefined
                    } else {
                        ad.atrr.availableFrom = req.body.available
                    }
                    
                    ad.save().then(ad => res.redirect('/post/' + req.body.btn + '?id=' + ad._id)).catch(err => {
                        console.log(err)
                        res.sendStatus(500)
                    } )
                } else {
                    res.sendStatus(401)
                }
            } else {
                res.sendStatus(404)
            }
        })
        .catch(err =>{
            console.log(err)
            res.sendStatus(500)
        })
})

// Add/Replace discription info
router.post('/discription', (req, res) =>{
    Ad.findById(req.query.id)
        .then(ad =>{
            if(ad){
                if(ad.owner+'' == req.user._id+''){

                    ad.discription = req.body.dis

                    ad.save().then(ad => res.redirect('/post/' + req.body.btn + '?id=' + ad._id)).catch(err => {
                        console.log(err)
                        res.sendStatus(500)
                    } )
                } else {
                    res.sendStatus(401)
                }
            } else {
                res.sendStatus(404)
            }
        })
        .catch(err =>{
            console.log(err)
            res.sendStatus(500)
        })
})

// Add/Replace pictures
router.post('/pics', (req, res) =>{
    Ad.findById(req.query.id)
        .then(ad =>{
            if(ad){
                if(ad.owner+'' == req.user._id+''){

                    //save images
                    if(req.body.pics != ''){
                        saveImgs(ad, req.body.pics)
                    }

                    //save video url
                    if(req.body.vidurl != '' && req.body.vidurl.match( /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/ )){
                        ad.video = req.body.vidurl
                    }

                    ad.save().then(ad => res.redirect('/post/' + req.body.btn + '?id=' + ad._id)).catch(err => {
                        console.log(err)
                        res.sendStatus(500)
                    } )
                } else {
                    res.sendStatus(401)
                }
            } else {
                res.sendStatus(404)
            }
        })
        .catch(err =>{
            console.log(err)
            res.sendStatus(500)
        })
})

// Add/Replace contact info
router.post('/contact', (req, res) =>{
    Ad.findById(req.query.id)
        .then(ad =>{
            if(ad){
                if(ad.owner+'' == req.user._id+''){

                    ad.contactInfo.fname = req.body.fname
                    ad.contactInfo.lname = req.body.lname
                    ad.contactInfo.tel = req.body.tel
                    if(req.body.contactTime == ''){
                        ad.contactInfo.contactTime = null
                    } else {
                        ad.contactInfo.contactTime = ( req.body.contactTime == 'true')
                    }
                    ad.contactInfo.email = req.body.email

                    ad.save().then(ad => res.redirect('/post/' + req.body.btn + '?id=' + ad._id)).catch(err => {
                        console.log(err)
                        res.sendStatus(500)
                    } )
                } else {
                    res.sendStatus(401)
                }
            } else {
                res.sendStatus(404)
            }
        })
        .catch(err =>{
            console.log(err)
            res.sendStatus(500)
        })
})

// Make it public
router.post('/post', (req, res) =>{
    Ad.findById(req.query.id)
        .then(ad =>{
            if(ad){
                if(ad.owner+'' == req.user._id+''){
                    
                    if(req.body.btn != 'postAd'){
                        res.redirect('/post/' + req.body.btn + '?id=' + ad._id)
                        return
                    } else if(ready.ready(ad, req.user)) {
                        ad.public = true
                        ad.price.init = req.body.price
                    } else {
                        //TODO fill required fields
                        res.render('post/main', {page:'post',ad:ad,nofooter:false,ready:isReadyToPost(ad, req.user)})
                        return
                    }

                    ad.save().then(ad => res.redirect('/search/show?id='+ ad._id)).catch(err => {//TODO change redirect
                        console.log(err)
                        res.sendStatus(500)
                    } )
                } else {
                    res.sendStatus(401)
                }
            } else {
                res.sendStatus(404)
            }
        })
        .catch(err =>{
            console.log(err)
            res.sendStatus(500)
        })
})

router.post('/remove_pic', (req, res) =>{
    //TODO
})

router.post('/remove_pic', (req, res) =>{
    //TODO
})

/* more() creates a new object temp from the req.card-body 
  and formats it to the ad.atrr.extra */
function more(ad, req){//TODO
    let temp = Object.assign({}, req)
    delete temp.utilities
    delete temp.energyclass
    delete temp.direction
    delete temp.kind
    delete temp.zone
    delete temp.available
    delete temp.near
    delete temp.btn
    for(var key in temp){
        if(temp[key] == ''){
            temp[key] = null
        } else {
            temp[key] = ( temp[key] == 'true')
        }
    }
    ad.atrr.extra = temp
}

function saveImgs(ad, picsEn){
    if(ad.pics.length >= 15) return
    if(ad.pics == 'undefined') ad.pics = []
    if(picsEn == null) return
    if(Array.isArray(picsEn)){
        for(var i=0;i<picsEn.length;i++){
            var pic = JSON.parse(picsEn[i])
            if(pic != null && imageMimeTypes.includes(pic.type) ){
                ad.pics.push({
                    pic: new Buffer.from(pic.data, 'base64'),
                    ext: pic.type
                })
            }
        }
    } else {
        var pic = JSON.parse(picsEn)
        if(pic != null && imageMimeTypes.includes(pic.type) ){
            ad.pics.push({
                pic: new Buffer.from(pic.data, 'base64'),
                ext: pic.type
            })
        }
    }
}

function isReadyToPost(ad, user){
    var adStatus = {}
    adStatus.category = ready.category(ad)
    adStatus.location = ready.location(ad)
    adStatus.mainFeatures = ready.mainFeatures(ad)
    adStatus.more = ready.more(ad)
    adStatus.discription = ready.discription(ad)
    adStatus.pics = ready.pics(ad)
    adStatus.contact = ready.contact(ad)
    adStatus.ready = true
    for(var key in adStatus){
        if(adStatus[key] == 0){
            adStatus['ready'] = false
        }
    }
    if(!(user.verified)) {
        adStatus.contact = 0
        adStatus.ready = false
    }
    return adStatus
}

module.exports = router