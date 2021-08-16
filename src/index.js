const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const { passportSession } = require('./keys');
const flash = require('connect-flash');
const methodOverride = require("method-override")
    //Init
const app = express();
require('./database')
require('./passport/local-auth')

//Setting
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

//Middleswares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: passportSession.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1 * 24 * 3600 * 1000
    }
}));
app.use(flash()) //Entre las sesiones y la inicializacion de passport
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

//Global variables
app.use((req, res, next) => {
    app.locals.error_msg = req.flash('error_msg');
    app.locals.success = req.flash('success');
    res.locals.user = req.user || null;
    next();
})

//Server
app.listen(app.get('port'), () => {
    console.log('Serve on port', app.get('port'))
})

//Routes
app.use('/', require('./routes/index'))
app.use('/', require('./routes/form'))

//Public
app.use(express.static(path.join(__dirname, '/public')));