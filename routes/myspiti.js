const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

router.use(ensureAuthenticated)

router.get('/', (req, res) =>{
    res.render('myspiti', {nofooter:false,hemail:req.user.email,user:req.user,display:[]})
})

module.exports = router