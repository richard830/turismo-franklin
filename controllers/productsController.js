const Product = require('../models/product');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');
const { findByCategoryaAndProductName } = require('../models/product');

module.exports = {

   
    async ListarHabitacion (req, res, next) {
        try {
          const data = await Product.listahotel();
          // console.log(`Mi Data....: ${JSON.stringify(data)}`);
          return res.status(201).json(data)
        } catch (error) {
          console.log(`Error ${error}`)
          return res.status(201).json({
            message: 'Error al Obtener los hoteles',
            error,
            success: false
          })
        }
    },

    async eliminarHotel (req, res, next) {
        try {
          const id = req.params.id
    
          const data = await Product.Eliminar(id)
          // console.log(`Usuarios eliminado: ${data}`);
          return res.status(201).json(
            {
    
              success: true,
              message: 'Hotel eliminado',
              data
            }
          )
        } catch (error) {
          console.log(`Error: ${error}`)
          return res.status(501).json({
    
            success: false,
            message: 'Error al eliminar hotel'
          })
        }
    },

    async listProductsRecentAdd (req, res, next) {
        try {
          const data = await Product.listProductsRecentAdd();
          // console.log(`Mi Data....: ${JSON.stringify(data)}`);
          return res.status(201).json(data)
        } catch (error) {
          console.log(`Error ${error}`)
          return res.status(201).json({
            message: 'Error al Obtener los productos recien agregados',
            error,
            success: false
          })
        }
    },
    
    async listProductsRandom (req, res, next) {
        try {
          const data = await Product.listProductsRandom();
          // console.log(`Mi Data....: ${JSON.stringify(data)}`);
          return res.status(201).json(data)
        } catch (error) {
          console.log(`Error ${error}`)
          return res.status(201).json({
            message: 'Error al Obtener los productos',
            error,
            success: false
          })
        }
    },

    async findBySubcategory(req, res, next) {
        try {
            const id_sub_category = req.params.id_sub_category; // CLIENTE
            const data = await Product.findBySubcategory(id_sub_category);

            return res.status(201).json(data);

        }
        catch (error) {
            console.log(`Error ${error}`);
                return res.status(501).json({
                    message: `Error al listar los productos por categoria`,
                    success: false,
                    error: error
                });
        }
    }, 

    async findByCategory(req, res, next) {
        try {
            const id_category = req.params.id_category; // CLIENTE
            const data = await Product.findByCategory(id_category);

            return res.status(201).json(data);

        }
        catch (error) {
            console.log(`Error ${error}`);
                return res.status(501).json({
                    message: `Error al listar los productos por categoria`,
                    success: false,
                    error: error
                });
        }
    }, 

    
    async findByCategoryAndProductName(req, res, next) {
        try {
            const id_category = req.params.id_category; // CLIENTE
            const product_name = req.params.product_name; // CLIENTE
            const data = await Product.findByCategoryAndProductName(id_category, product_name);

            return res.status(201).json(data);

        }
        catch (error) {
            console.log(`Error ${error}`);
                return res.status(501).json({
                    message: `Error al listar los productos por categoria`,
                    success: false,
                    error: error
                });
        }
    },
    

    async create(req, res, next) {

        let product = JSON.parse(req.body.product);
        console.log(`Producto ${JSON.stringify(product)}`);

        const files = req.files;

        let inserts = 0;

        if (files.length === 0) {
            return res.status(501).json({
                message: 'Error al registrar el producto no tiene imagen',
                success: false
            });
        }
        else {
            try {

                const data = await Product.create(product); //ALMACENANDO EL PRODUCTO
                 product.id = data.id;

                 const start = async () => {
                    await asyncForEach(files, async (file) => {
                        const pathImage = `image_${Date.now()}`;
                        const url  = await storage(file, pathImage);

                        if (url !== undefined && url !== null) {
                             if (inserts == 0) { //IMAGE 1
                                product.image1 = url;
                            }
                            else if(inserts == 1) { //IMAGE 2
                                product.image2 = url;
                            }
                            else if(inserts == 2 ) { //IMAGE 3
                                product.image3 = url;
                            }
                        }

                        await Product.update(product);
                        inserts = inserts +1;

                        if (inserts == files.length) {
                            return res.status(201).json({
                                success: true,
                                message: 'El producto se ha registrado correctamente'
                            });
                        }
                           
                    });

                }

                start();

            }
            catch (error) {
                console.log(`Error ${error}`);
                return res.status(501).json({
                    message: `Error al registrar el producto ${error}`,
                    success: false,
                    error: error
                });
            }
        }
    }
}