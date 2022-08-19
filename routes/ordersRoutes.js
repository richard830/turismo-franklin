const OrdersController = require('../controllers/ordersController');
//const passport = require('passport');

module.exports = (app) => {
    
     /*
    * GET ROUTES
    */
     app.get('/api/orders/findByStatus/:status', OrdersController.findByStatus);
     app.get('/api/orders/lista', OrdersController.ListarExcel);

     /*
    * POST ROUTES
    */
     app.post('/api/orders/create', OrdersController.create);
     //app.post('/api/address/create', passport.authenticate('jwt', {session: false}), CategoriesController.create);
     
     /*
    * PUT ROUTES
    */
     
     app.put('/api/orders/updateToInUse', OrdersController.updateToInUse);

}