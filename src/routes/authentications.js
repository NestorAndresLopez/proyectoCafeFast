const express = require('express');
const router = express.Router();

const passport = require('passport');
const {isLoggedIn } = require('../lib/auth');

//falta usar esta funcion para cuando ya este login no me muetre la ventana de registro y login 
const {isNotLoggedIn} = require('../lib/auth');

router.get('/signup',  isNotLoggedIn, (req, res)=>{
    res.render('auth/signup');
})

router.post('/signup',  isNotLoggedIn,passport.authenticate('local.signup', {
        successRedirect: '/signin',
        failureRedirect: '/signup',
        failureFlash: true
    }))

router.get('/signin',  (req, res)=>{
    res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, (req, res, next)=>{
    passport.authenticate('local.signin',{
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
})

router.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})

router.get('/logout',  function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/signin');
    });
});

module.exports = router;