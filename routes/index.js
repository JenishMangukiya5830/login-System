const express = require('express')

const passport = require('passport')

const router = express.Router()

const controller = require('../controller/AdminController')

router.get('/',passport.checkloginingin,controller.get)

router.get('/index',passport.checkUserLogin,controller.index)

router.post('/insertData',controller.insert)

router.get('/login',passport.checkloginingin,controller.login)

router.post('/loginData',passport.authenticate('local',{failureRedirect : '/login',successRedirect : '/index'}),controller.loginData)

router.get('/logout',controller.logout)

module.exports = router