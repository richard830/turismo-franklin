const AddressController = require('../controllers/addressController');
//const passport = require('passport');

module.exports = (app, upload) => {
    
     /*
    * GET ROUTES
    */
     app.get('/api/address/findByUser/:id_user', AddressController.findByUser);

   
     /*
    * POST ROUTES
    */
    app.post('/api/address/create',upload.array('image', 1), AddressController.registerWithImage);
     
     //app.post('/api/address/create', upload.array('image', 1), AddressController.registerWithImage);

     //app.post('/api/address/create', AddressController.create);
    // app.post('/api/users/create', upload.array('image', 1), UsersController.registerWithImage);
     //app.post('/api/address/create', passport.authenticate('jwt', {session: false}), CategoriesController.create);
 
}