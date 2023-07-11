const SubCategory = require('../models/sub_category');

module.exports = {

  async getAll(req, res, next) {

    try {
        const data = await SubCategory.getAll();
        console.log(`SubCategorias ${JSON.stringify(data)}`);
        return res.status(201).json(data);

    }
    catch (error) {
        console.log(`Error ${error}`);
        return res.status(501).json({
            message: 'Hubo un error al obtener las subCategorias',
            error: error,
            success: false
        })
    }
    
  },

  async findByCategory(req, res, next) {
    try {
        const id_category = req.params.id_category; // CLIENTE
        const data = await SubCategory.findByCategory(id_category);

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
        try {
            const sub_category = req.body;
            console.log(`Sub Categoria enviada: ${sub_category}`);
            
            const data = await SubCategory.create(sub_category);
            
            return res.status(201).json({
                message: 'La Sub Categoria se creo correctamente',
                success: true,
                data: data.id
            });
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al crear la Sub Categoria',
                success: false,
                error: error
            });
        }

  }
}