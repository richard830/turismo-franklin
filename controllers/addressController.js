const Address = require('../models/address');
const storage = require('../utils/cloud_storage');

module.exports = {

    async findByUser(req, res, next) {

        try {
            const id_user = req.params.id_user;
            const data = await Address.findByUser(id_user);
            console.log(`Address ${JSON.stringify(data)}`);
            return res.status(201).json(data);

        }
        catch (error) {
            console.log(`Error ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener los formularios de pagos ',
                error: error,
                success: false
            })
        }
    },

    async registerWithImage(req, res, next){
        try {
            
            const address = JSON.parse(req.body.address);
            console.log(`Datos enviados del usuario: ${address}`);

            const files = req.files;

            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`; //NOMBRE DEL ARCHIVO
                const url = await storage(files[0], pathImage);

                if (url!= undefined && url != null ) {
                    address.image = url;
                }
            }

            const data = await Address.create(address);
            
            return res.status(201).json({
                success: true,
                message:'El registro de pago se realizo correctamente, espere su confirmación por favor',
                data: data.id
            });
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message:'Hubo un error con el registro de pago',
                error: error
            });            
        }
    },


    async create(req, res, next) {
        try {

            const address = req.body;
            const data = await Address.create(address);
            
            return res.status(201).json({
                success: true,
                message: 'El formulario de pago se creo correctamente',
                data: data.id
            });
        }
        catch (error) {
            console.log(`Error ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error creando el formulario de pago',
                error: error
            });
        }
    }


}