const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
//const passport = require('passport');

//const session = require('express-session') esta linea no es ..solo estaba prbando

/**
 *  INICILIZAR FIREBASE ADMIN
 */

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const upload = multer({
    storage: multer.memoryStorage()
})


/*
 * RUTAS 
 */
const users = require('./routes/usersRoutes');
const categories = require('./routes/categoriesRoutes');
const subCategories = require('./routes/subCategoriesRoutes');
const products = require('./routes/productsRoutes');
const address = require('./routes/addressRoutes');
const orders = require('./routes/ordersRoutes');

const g = process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const port = process.env.PORT || 80;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
//app.use(expressSession);

/*
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
*/

app.disable('x-powered-by');

app.set('port', port,
    g
);

/*
 * LLAMANDO A LAS RUTAS
 */

users(app, upload);
categories(app);
subCategories(app);
address(app, upload);
orders(app);
products(app, upload);


// server.listen(port, function() {
//     console.log('Aplicaion de Nodejs corriendo en ' + port + ' Iniciada...')
// })

server.listen(80, '172.26.3.211' || 'localhost', function() {
    console.log(' Aplicacion de NodeJS corriendo en el puerto ' + port + ' Iniciada...')
});



app.get('/', (req, res) => {
    res.send('Mi backend Quenetur att NetCriTech')
})





// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);

});

module.exports = {
    app: app,
    server: server
}

// 200 es una respuesta exitos
// 404 significa que la URL no existe
// 500 error interno del servidor