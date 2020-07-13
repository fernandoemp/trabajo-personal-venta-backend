const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario')


passport.use('local', new localStrategy(function(username, password, done) {
    const user = await Usuario.findOne({ "usuario": username })
    if (!user) return res.status(404).send({ message: "El usuario no existe" });
    const passwordValida = await user.compararPassword(password, (err, encontrado) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la peticion' });
        if (!encontrado) done(null, false);
        user.password = '';
        return done(err, user);
    })
}))

passport.serializeUser((user, done) => {
    done(null, user._id)
})
passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, user) => {
        done(err, user);
    })
})

exports.estaLogueado = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).send({ message: 'Debes estar logueado' });
    }
}