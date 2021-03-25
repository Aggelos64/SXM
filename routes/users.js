const express = require('express')
const router = express.Router()
const {check ,validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth')

const User = require('../models/user-schema')

//Login page
router.get('/login', forwardAuthenticated, (req, res) => {
    res.render('login')
})

//Register page
router.get('/register', forwardAuthenticated, (req, res) => {
    res.render('register')
})

//Register post
router.post('/register',[
    check('fname', 'Υπάρχει πρόβλημα με το όνομα σας!').isString(),
    check('fname', 'Το όνομα σας είναι πολύ μεγάλο!').isLength({max: 20}),
    check('lname', 'Υπάρχει πρόβλημα με το επίθετο σας!').isString(),
    check('lname', 'Το επίθετο σας είναι πολύ μεγάλο!').isLength({max: 20}),
    check('email', 'Υπάρχει πρόβλημα με το email σας!').isEmail().normalizeEmail(),
    check('password', 'Ο κωδικός σας πρέπει να περιέχει 8-32 χαρακτήρες!').isString().isLength({min: 8,max: 32}),
    check('password', 'Ο κωδικός σας πρέπει να περιέχει έναν κεφάλαιο αγγλικό χαρακτήρα!').matches(/(?=.*?[A-Z])/),
    check('password', 'Ο κωδικός σας πρέπει να περιέχει έναν μικρό αγγλικό χαρακτήρα!').matches(/(?=.*?[a-z])/),
    check('password', 'Ο κωδικός σας πρέπει να περιέχει έναν αριθμό!').matches(/(?=.*?[0-9])/),
    check('phone', 'Το τηλέφωνο μπορεί να περιέχει μονο αριθμούς!').matches(/^(\s*|\d+)$/),
    check('tos', 'Πρέπει να συμφωνήσετε με τους όρους χρήσης!').equals('on')
], (req, res) =>{
    const { fname, lname, email, phone, password, password2, tos} = req.body
    let errors = []
    validationResult(req).array().forEach(Object =>{
        errors.push(Object.msg)
    })
    if(password !== password2){
        errors.push('Οι κωδίκοι πρέπει να ταιριάζουν!')
    }
    if(errors.length>0){
        res.render('register',{
            errors,
            fname,
            lname,
            email,
            phone
        })
    }else{
        User.findOne({email: email})
            .then(user =>{
                if(user){
                    errors.push('Το Email χρησιμοποιείτε ήδη!')
                    res.render('register',{
                        errors,
                        fname,
                        lname,
                        email,
                        phone
                    })
                }else{
                    //Make user
                    bcrypt.hash(password,10,function(err, hash) {
                        if(err) throw err
                        const newUser = new User({
                            fname,
                            lname,
                            psw: hash,
                            email,
                            tel: phone
                        })
                        newUser.save()
                            .then(user =>{
                                res.redirect('/users/login')
                            })
                            .catch(err => console.log(err))
                    })
                    //Send confirmation email

                }
            })
            .catch(err =>{
                console.log(err)
                res.redirect('users/register')
            })

    }
})

//Login post
router.post('/login', [
    check('email', 'Υπάρχει πρόβλημα με το email σας!').isEmail().normalizeEmail(),
    check('password').isString().isLength({max: 32})
], (req, res, next) =>{
    passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
})

//Logout
router.get('/logout', ensureAuthenticated, (req, res) => {
    req.logOut()
    res.redirect('/users/login')
})

//Verify
router.get('/verify', ensureAuthenticated, (req, res) => {
    if(req.user.verified){
        res.redirect('/')
    }else{
        res.render('verify', {email: req.user.email})
    }
})

//add ad to favorites
router.post('/addfav', (req, res) =>{
    
})

//remove ad to favorites
router.post('/removefav', (req, res) =>{
    
})

//add ad to hide
router.post('/addhide', (req, res) =>{

})

//remove ad to hide
router.post('/removehide', (req, res) =>{
    
})

module.exports = router