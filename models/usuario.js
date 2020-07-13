const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Mensaje = require('./mensaje');
const Carrito = require('./carrito');
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
    usuario: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    activo: { type: Boolean, default: true, required: true },
    borrado: { type: Boolean, default: false, required: true },
    perfil: { type: String, default: 'Propietario', enum: ['Propietario', 'Administrativo', 'Administrador'], required: true },
    fotoPerfil: { type: String, required: false, default: 'data:image/png;base64,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' },
    fechaAltaUsuario: { type: Date, required: false },
    mensajes: { type: [Mensaje.schema], required: false },
    carrito: { type: Carrito.schema, required: false },

});


//metodo de encriptacion
/*antes de el guardado de el usuario, y justamente antes del metodo "save", se comprueba si la contraseña
ha cambiado, al ser un nuevo objeto contiene la contraseña que el usuario que se encarga de regisrar al usuario
 ha ingresado, asi que se procede al metodo bscryp el cual genera un codigo el cual se
 reemplazara por la contraseña*/

UsuarioSchema.pre('save', function(next) {
    const usuario = this;
    if (!usuario.isModified('password')) {
        return next();
    }

    /* salt 10:
    Salt es un valor aleatorio criptográficamente fuerte de longitud 
    fija que se agrega a la entrada de funciones hash para crear hashes 
    únicos para cada entrada. Se agrega una sal para hacer que la salida de 
    hash de contraseña sea única incluso para los usuarios que adoptan
     contraseñas comunes. */
    bcrypt.genSalt(10, (error, salt) => {
        if (error) {
            next(error);
        }
        /*encriptando..*/
        bcrypt.hash(usuario.password, salt, null, (error, hash) => {
            if (error) {
                next(error);
            }
            usuario.password = hash;
            next();
        })
    })
})

/*metodo para desencriptar*/
UsuarioSchema.methods.compararPassword = function(password, cb) {
    bcrypt.compare(password, this.password, (error, iguales) => {
        if (error) {
            return cb(error);
        }
        cb(null, iguales);
    })
}

module.exports = mongoose.model('Usuario', UsuarioSchema);