const UsersController = require('../controllers/usersController');

//const passport = require('passport');

module.exports = (app, upload) => {

    // TRAER DATO
    app.get('/api/users/getAll', UsersController.getAll);
    app.get('/api/users/getAll', UsersController.getAll);
    app.get('/api/users/findById/:id', UsersController.findById);
   // app.get('/api/users/findById/:id', passport.authenticate('jwt', {session: false}), UsersController.findById);
   // LA LINEA DE ARRIBA ME DA ERROR EN EL SERVIDOR RESPONDE UN 500
    // LA AUTENTICACION DE TOKENS 

    //GUARDAR DATOS
    app.post('/api/users/create', upload.array('image', 1), UsersController.registerWithImage);
    app.post('/api/users/login', UsersController.login);

    //ACTUALIZAR DATOS
    app.put('/api/users/update', upload.array('image', 1), UsersController.update);
    //app.put('/api/users/update', passport.authenticate('jwt', {session: false}), upload.array('image', 1), UsersController.update);
    // LA LINEA DE ARRIBA ME DA ERROR EN EL SERVIDOR RESPONDE UN 500
    // LA AUTENTICACION DE TOKENS NI SI QUIERA SE ABRE LOGIN..
    app.put('/api/users/updateNotificationToken', UsersController.updateNotificationToken);

   
} 