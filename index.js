var express = require('express');
const myParser = require("body-parser");
//enzo
var fs = require('fs');
var https = require('https');
//enzo
var app = express();

const { mongoose } = require('./database')
const cors = require('cors');
const morgan = require('morgan');


//middlewares
app.use(myParser.json({ limit: '200mb' }));
app.use(myParser.urlencoded({ limit: '200mb', extended: true }));

app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(morgan('dev'));

app.use('/api/usuarios', require('./routes/usuario.route'));
app.use('/api/consultas', require('./routes/consulta.route'));
app.use('/api/articulos', require('./routes/articulo.route'));
app.use('/api/productos', require('./routes/producto.route'));
app.use('/api/clientes', require('./routes/cliente.route'));
app.use('/api/mensajes', require('./routes/mensaje.route'));
app.use('/api/noticias', require('./routes/noticia.route'));


//setting
app.set('port', process.env.PORT || 3000);

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server started on port`, app.get('port'));
});