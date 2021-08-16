const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { isAuthenticated } = require('../helper/helper')

router.get('/', (req, res) => {
    res.render('signin')
})

//Otorgar formulario al usuario
router.get('/signup', (req, res) => {
    res.render('signup')
})

//Usuario envia datos
router.post('/signup', passport.authenticate('local-signin', {
    successRedirect: '/list',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

//Otorgar formulario al usuario
router.get('/signin', (req, res) => {
    res.render('signin')
})

//Usuario envia datos
router.post('/signin', passport.authenticate('local-signup', {
    successRedirect: '/list',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/logout', isAuthenticated, (req, res) => {
    req.logout();
    req.flash('success', 'Logout Success');
    res.redirect('/signin');

});

module.exports = router;