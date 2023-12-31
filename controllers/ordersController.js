const Order = require('../models/order');
const OrderHasProduct = require('../models/order_has_products');
const { update } = require('./usersController');

module.exports = {

    async ListarExcel (req, res, next) {
        try {
          const data = await Order.excel();
          // console.log(`Mi Data....: ${JSON.stringify(data)}`);
          return res.status(201).json(data)
        } catch (error) {
          console.log(`Error ${error}`)
          return res.status(201).json({
            message: 'Error al Obtener la lista',
            error,
            success: false
          })
        }
      },


    async findByStatus(req, res, next) {

        try {
            const status = req.params.status;
            const data = await Order.findByStatus(status);
            console.log(`Status ${JSON.stringify(data)}`);
            return res.status(201).json(data);

        }
        catch (error) {
            console.log(`Error ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las ordenes por estado',
                error: error,
                success: false
            })
        }
    },


    async create(req, res, next) {
        try {

            let order = req.body;
            order.status = 'PAGADO';
            const data = await Order.create(order);

            console.log('La orden se creo correctamente');

            //RECORRER TODOS LOS PRODUCTOS AGREGADOS A LA ORDEN
            for (const product of order.products) {
                await OrderHasProduct.create(data.id, product.id, product.quantity);

            }
            
            return res.status(201).json({
                success: true,
                message: 'La orden se creo correctamente',
                data: data.id
            });

        }
        catch (error) {
            console.log(`Error ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error creando la orden',
                error: error
            });
        }
    },

    async updateToInUse(req, res, next) {
        try {

            let order = req.body;
            order.status = 'EN USO';
            await Order.update(order);

            
            return res.status(201).json({
                success: true,
                message: 'La orden se actulizo correctamente',
            });

        }
        catch (error) {
            console.log(`Error ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    }


}