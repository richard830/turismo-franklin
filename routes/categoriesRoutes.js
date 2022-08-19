const CategoriesController = require('../controllers/categoriesController');
//const passport = require('passport');

module.exports = (app) => {
    
     /*
    * GET ROUTES
    */
     app.get('/api/categories/getAll', CategoriesController.getAll);

   
     /*
    * POST ROUTES
    */
     app.post('/api/categories/create', CategoriesController.create);
     //app.post('/api/categories/create', passport.authenticate('jwt', {session: false}), CategoriesController.create);
 
}