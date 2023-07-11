const SubCategoriesController = require('../controllers/subCategoriesController');

//const passport = require('passport');

module.exports = (app) => {
    
    /*
   * GET ROUTES
   */
    app.get('/api/sub_categories/getAll', SubCategoriesController.getAll);
    app.get('/api/sub_categories/findByCategory/:id_category', SubCategoriesController.findByCategory);


  
    /*
   * POST ROUTES
   */
    app.post('/api/sub_categories/create', SubCategoriesController.create);
    //app.post('/api/categories/create', passport.authenticate('jwt', {session: false}), CategoriesController.create);

};