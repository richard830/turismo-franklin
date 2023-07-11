const ProductsController = require('../controllers/productsController');

module.exports = (app, upload) => {
    
    app.get('/api/products/habitacion', ProductsController.ListarHabitacion);
    app.get('/api/products/listProductsRandom', ProductsController.listProductsRandom);
    app.get('/api/products/listProductsRecentAdd', ProductsController.listProductsRecentAdd);
    app.get('/api/products/findByCategory/:id_category', ProductsController.findByCategory);
    app.get('/api/products/findBySubcategory/:id_sub_category', ProductsController.findBySubcategory);
    app.get('/api/products/findByCategoryAndProductName/:id_category/:product_name', ProductsController.findByCategoryAndProductName);
    
    app.post('/api/products/create', upload.array('image', 3), ProductsController.create);
    app.delete('/api/products/eliminar/:id', ProductsController.eliminarHotel)

}