const express = require('express')

const app = express();

const db = require('./config/mongoose')

const admin = require('./model/AdminModel')

const flash = require('connect-flash')

const flashmiddleware = require('./config/flash')

const session = require('express-session')

const path = require('path')

const passport = require('passport');

const passportLocal = require('./config/passport');

const cookie = require('cookie-parser')

app.use(session({
    secret : 'passport',
    saveUninitialized : true,
    resave : true,
    cookie : {
        maxAge : 1000*60*60*24
    }
}))

app.use(passport.initialize())

app.use(passport.session())

app.use(cookie())

app.use(flash())

app.use('/public',express.static(path.join('public')))

app.use(flashmiddleware.setFlash)

app.use(express.urlencoded())

app.set('view engine','ejs')

app.use('/',require('./routes'))

app.listen(9876, (err) => {
    if(err)
    {
        console.log('Server not Starting');
    }
    console.log('Server Starting');
})