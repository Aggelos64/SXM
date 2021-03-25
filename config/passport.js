const localStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const User = require('../models/user-schema')

module.exports = function(passport) {
    passport.use(new localStrategy({ usernameField: 'email'}, (email, password, done) =>{
        User.findOne({email: email})
            .then(user =>{
                if(!user) {
                    return done(null, false, {message: 'Δεν υπάρχει χρήστης με αυτό το email!'})
                }

                bcrypt.compare(password, user.psw, (err, isMatch) => {
                    if(err) throw err

                    if(isMatch){
                        return done(null, user)
                    }else{
                        return done(null, false, {message: 'Λάθος κωδικός!'})
                    }
                })
            })
            .catch(err => console.log(err))
        })
    )

    /*passport.use(new FacebookStrategy({
        clientID: process.env.FB_APP_ID,
        clientSecret: process.env.FB_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            console.log(profile)
          return cb(err, user)
        })
      }
    ))*/

    passport.serializeUser((user, done) => {
        done(null, user.id)
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user)
        });
      });
}