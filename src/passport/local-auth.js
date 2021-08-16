const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user')

//Serializa el usuario con su id
passport.serializeUser((user, done) => {
    done(null, user.id);
})

//Lo busca en la base de datos en cada página que ingrese
passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id);
    done(null, user);
})

//Crea usuario para la navegacion
passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => { //Registro de usuario

    const signinUser = await User.findOne({ email: email })

    if (signinUser) { //Si existe el email que se intenta registrar
        return done(null, false, req.flash('error_msg', 'The email has already been taken. Please try another!'))
    } else { //Si no existe el email, lo guarda creando uno nuevo desde el modelo
        if (password.length < 4) {
            return done(null, false, req.flash('error_msg', 'Password must be at least 4 characters'));
        } else {
            const newUser = new User();
            newUser.email = email;
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            done(null, newUser);
        }
    }
}));

passport.use('local-signup', new LocalStrategy({ //Logeo de usuario
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    const signinUser = await User.findOne({ email: email })

    if (!signinUser) { //Si el usuario no existe
        return done(null, false, req.flash('error_msg', 'No user found!'))
    }
    const match = await signinUser.matchPassword(password);
    if (!match) { //Si la contraseña es incorrecta
        return done(null, false, req.flash('error_msg', 'Incorrect Password!'))
    }

    done(null, signinUser)

}))