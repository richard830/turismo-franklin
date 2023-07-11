const User = require('../models/user');
const Rol = require('../models/rol');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');
module.exports = {

    async getAll(req, res, next) {
        try {
            const data = await User.getAll();
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);
        }
        catch(error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: `Error al obtener los usarios`
            });
        }    
    },

    async findById(req, res, next) {
        try {
            const id = req.params.id;

            const data = await User.findByUserId(id);
            console.log(`Usuario: ${data}`);
            return res.status(201).json(data);
        }
        catch(error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: `Error al obtener el usuario por ID`
            });
        }    
    },

    async register(req, res, next){
       
        try {
            
            const user = req.body;

           /*  const myUser = await User.findByEmail(email);
            if (!myUser) {
                return res.status(401).json({
                    success: false,
                    message: 'La cedula no fue encontrado'
                });
            } */
            const data = await User.create(user);
            
            
            await Rol.create(data.id, 1); // ROL POR DEFECTO (CLIENTE)
             
            return res.status(201).json({
                success: true,
                message:'El registro se realizo correctamente, ahora inicia sesión',
                data: data.id
            });
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message:'Hubo un error con el registro del usuario',
                error: error
            });            
        }
    },
    
    async registerWithImage(req, res, next){
    
        try {
           
            const email = req.body.email;  
            console.log(`Datos enviados del usuario: ${email}`);      
            const correo = await User.ObtenerEmail(email);

            const cedula = req.body.cedula;           
            const cedulas = await User.Obtenercedula(cedula);
            const phone = req.body.phone;           
            const telefono = await User.Obtenerphone(phone);
 

            if(correo){
               
                return res.status(401).json({
                    success:false,
                    message: 'El Correo ya Existe'
                });

            }if(cedulas){
                return res.status(401).json({
                    success:false,
                    message: 'Su cedula ya Existe'
                });


            }if(telefono){
               
                return res.status(401).json({
                    success:false,
                    message: 'El telefono ya Existe'
                });
            }
         

        




            
            else if(!correo, !cedulas, !telefono){
                

               
          
            const user = req.body;
            const cedula = req.body.cedula;


             //Preguntamos si la cedula consta de 10 digitos
             if(cedula.length == 10){
                console.log('pasoss asta aqui')
                //Obtenemos el digito de la region que sonlos dos primeros digitos
                var digito_region = cedula.substring(0,2);
                
                //Pregunto si la region existe ecuador se divide en 24 regiones
                if( digito_region >= 1 && digito_region <=24 ){
                  
                  // Extraigo el ultimo digito
                  var ultimo_digito   = cedula.substring(9,10);
        
                  //Agrupo todos los pares y los sumo
                  var pares = parseInt(cedula.substring(1,2)) + parseInt(cedula.substring(3,4)) + parseInt(cedula.substring(5,6)) + parseInt(cedula.substring(7,8));
        
                  //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
                  var numero1 = cedula.substring(0,1);
                  var numero1 = (numero1 * 2);
                  if( numero1 > 9 ){ var numero1 = (numero1 - 9); }
        
                  var numero3 = cedula.substring(2,3);
                  var numero3 = (numero3 * 2);
                  if( numero3 > 9 ){ var numero3 = (numero3 - 9); }
        
                  var numero5 = cedula.substring(4,5);
                  var numero5 = (numero5 * 2);
                  if( numero5 > 9 ){ var numero5 = (numero5 - 9); }
        
                  var numero7 = cedula.substring(6,7);
                  var numero7 = (numero7 * 2);
                  if( numero7 > 9 ){ var numero7 = (numero7 - 9); }
        
                  var numero9 = cedula.substring(8,9);
                  var numero9 = (numero9 * 2);
                  if( numero9 > 9 ){ var numero9 = (numero9 - 9); }
        
                  var impares = numero1 + numero3 + numero5 + numero7 + numero9;
        
                  //Suma total
                  var suma_total = (pares + impares);
        
                  //extraemos el primero digito
                  var primer_digito_suma = String(suma_total).substring(0,1);
        
                  //Obtenemos la decena inmediata
                  var decena = (parseInt(primer_digito_suma) + 1)  * 10;
        
                  //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
                  var digito_validador = decena - suma_total;
        
                  //Si el digito validador es = a 10 toma el valor de 0
                  if(digito_validador == 10)
                    var digito_validador = 0;
        
                  //Validamos que el digito validador sea igual al de la cedula
                  if(digito_validador == ultimo_digito){
                    console.log('la cedula:' + cedula + ' es correcta');
                  }else{
                    console.log('la cedula:' + cedula + ' es incorrecta');
                  }
                  
                }else{
                  // imprimimos en consola si la region no pertenece
                  console.log('Esta cedula no pertenece a ninguna region');
                  return res.status(401).json({
                     success:false,
                     message: 'Esta cedula no pertenece a ninguna region'
                 });
                }
             }else{
                //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
                console.log('Esta cedula tiene menos de 10 Digitos');
                return res.status(401).json({
                 success:false,
                 message: 'Esta cedula tiene menos de 10 Digitos'
             });
             } 


            const data = await User.create(user);
            
            await Rol.create(data.id, 1); // ROL POR DEFECTO (CLIENTE)

            return res.status(201).json({
                success: true,
                message:'El registro se realizo correctamente, ahora inicia sesión',
                data: data.id
            });
            }
            
          
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al registrar el  usuario',
                error:error
            })
        }
    
    },

    async update(req, res, next){
        try {
            
            const user = JSON.parse(req.body.user);
            console.log(`Datos enviados del usuario: ${JSON.stringify(user)}`);

            const files = req.files;

            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`; //NOMBRE DEL ARCHIVO
                const url = await storage(files[0], pathImage);

                if (url != undefined && url != null ) {
                    user.image = url;
                }
            }

            await User.update(user);
             
            return res.status(201).json({
                success: true,
                message:'Los datos del usuario se actulizaron correctamente',
            });
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message:'Hubo un error con la actualizacion  de datos del usario',
                error: error
            });            
        }
    },

    async updateNotificationToken(req, res, next){
        try {
            
            const body = req.body;

            console.log('Información del usuario', body);

            await User.updateNotificationToken(body.id, body.notification_token);


            return res.status(201).json({
                success: true,
                message:'El token de notificaciones se ha almacenado correctamente',
            });
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message:'Hubo un error al tratar de actualizar el token del usuario',
                error: error
            });            
        }
    },

    async login(req, res, next) {
        try{
            const email = req.body.email;
            const password = req.body.password;

            const myUser = await User.findByEmail(email);
            
            
            if (!myUser) {
                return res.status(401).json({
                    success: false,
                    message: 'El correo no fue encontrado'
                });
            }

            if (User.isPasswordMatched(password, myUser.password)) {
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey,{
                    // expiresIn: (60*60*24) // 1HORA
                });
                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`,
                    roles: myUser.roles
                }

                await User.updateToken(myUser.id,`JWT ${token}` );

                console.log(`USUARIO ENVIADO ${data}`);

                return res.status(201).json({
                    success: true,
                    data: data,
                    message: 'El usuario ha sido autenticado'
                });
            }
            else {
                return res.status(401).json({
                    success: false,
                    message:  'La contraseña es incorrecta'
                });
            }

        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al momento de hacer login',
                error: error
            });        
        }
    }

}; 