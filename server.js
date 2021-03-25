const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const passport = require('passport')
const flash = require('connect-flash')
const fs = require("fs");


const app = express()

var rawdata = fs.readFileSync('config/arrSortedNew.json');
locationsArr = JSON.parse(rawdata);
rawdata = fs.readFileSync('config/areaFile.json');
locationsObj = JSON.parse(rawdata);

require('./config/passport')(passport)

//DB init
const db = require('./config/keys').MongoURI

mongoose.connect(db, {useNewUrlParser: true,useUnifiedTopology: true})
.then(() => console.log('Mongodb connected...'))
.catch(err => console.log(err))

//EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use('/public', express.static('public'))

//Bodyparser
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({extended: true,limit: '5mb'}))


//Session
app.use(session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: process.env.secret + '',
    resave: false,
    saveUninitialized: false,
    cookie:{
        //secure: true,//TODO
        sameSite: true,
        maxAge: 1000*60*60*24
    }
}))

app.use(flash())

app.use((req, res, next) => {
    //res.locals.success_msg = req.flash('success_msg')
    res.locals.error = req.flash('error')
    next()
})

app.use(passport.initialize())
app.use(passport.session())


//Use routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/search', require('./routes/ads'))
app.use('/post', require('./routes/post'))
app.use('/api', require('./routes/api'))
app.use('/myspiti', require('./routes/myspiti'))


app.listen(process.env.PORT || 3000, () => console.log(`Listening...`))