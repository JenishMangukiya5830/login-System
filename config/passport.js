const passport = require('passport')
const Admin = require('../model/AdminModel')
const alert = require('alert')

const passportLocal = require('passport-local').Strategy;

passport.use( new passportLocal({
    usernameField : "email"
},(email,password,done) => {
    Admin.findOne({email : email},(err,user) => {
        if(err)
        {
            alert('Something Went Wrong');
            return done(null,false);
        }

        if(!user) {
            alert('Email not Found')
            return done(null,false);
        }
        else
        {
            if(user.password != password){
                alert('Incorrect Password');
                return done(null,false)
            }
        }

        // console.log(user);

        alert('Login Successfully');

        return done(null,user)

    })
}));

passport.serializeUser((user,done) => {
    // console.log(user);
    if(user)
    {
        console.log(user.id);
        return done(null,user.id)
    }    
})

passport.deserializeUser((id,done) => {
    Admin.findById(id,(err,user) => {
        console.log(user);
        if(err)
        {
            return done(null,false);
        }
        return done(null,user)
    })
})


passport.checkUserLogin = (req,res,next)=>{
    if(req.isAuthenticated())
    {
        return next();
    }
    return res.redirect('/login'); 
   
}

passport.checkloginingin = (req,res,next) => {
    if(req.isAuthenticated())
    {
        return res.redirect('/index')
    }
    return next();
}