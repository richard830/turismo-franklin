const db = require('../config/config');
const crypto = require('crypto');


const User = {};

User.getAll = () => {
    const sql = `
    SELECT
        *
    FROM
        f_obtener_usuarios()
    `;

    return db.manyOrNone(sql);
}

User.findById = (id, callback) => {

    const sql = `
    SELECT
       *
    FROM
        f_obtener_usuarios_dado_id($1)`;
    
        return db.oneOrNone(sql, id).them(user => { callback(null, user);})

}

User.findByUserId = (id) => {
    const sql = `
    SELECT
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone,
        U.cedula,
        U.password,
        U.session_token,
        U.notification_token,
		json_agg(
			json_build_object(
				'id,', R.id,
				'name', R.name,
				'image', R.image,
				'route', R.route
			)
		) AS roles
    FROM
        users AS U
	INNER JOIN
		user_has_roles AS UHR
	on
		UHR.id_user = U.id
	INNER JOIN
		roles AS R
	ON
		R.id = UHR.id_rol
    WHERE
        U.id = $1
	GROUP BY 
		U.id
    `
    return db.oneOrNone(sql, id);
}

User.findByEmail = (email) => {
    const sql = `
    SELECT
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone,
        U.cedula,
        U.password,
        U.session_token,
        U.notification_token,
		json_agg(
			json_build_object(
				'id,', R.id,
				'name', R.name,
				'image', R.image,
				'route', R.route
			)
		) AS roles
    FROM
        users AS U
	INNER JOIN
		user_has_roles AS UHR
	on
		UHR.id_user = U.id
	INNER JOIN
		roles AS R
	ON
		R.id = UHR.id_rol
    WHERE
        U.email = $1
	GROUP BY 
		U.id
    `
    return db.oneOrNone(sql, email);
}



User.Obtenercedula = (cedula) =>{
    const sql = `SELECT  u.id, u.email, u.name, u.lastname, u.phone, u.cedula, 
                    u.image, u.password, u.session_token,
                    json_agg(
                        json_build_object(
                        'id', r.id,
                        'name', r.name,
                        'image', r.image,
                        'route', r.route
                    )) 
                    AS roles FROM users AS u
                    INNER JOIN user_has_roles AS uhr
                    ON
                    uhr.id_user = u.id
                    INNER JOIN 
                    roles AS r
                    ON
                    r.id = uhr.id_rol
                    WHERE u.cedula = $1
                    GROUP BY 
                    u.id`; 
         return db.oneOrNone(sql,cedula);
     }

User.ObtenerEmail = (email) =>{
    const sql = `SELECT  u.id, u.email, u.name, u.lastname, u.phone, 
                 u.image, u.password, u.session_token,
                 json_agg(
                     json_build_object(
                       'id', r.id,
                     'name', r.name,
                     'image', r.image,
                     'route', r.route
                 )) 
                 AS roles FROM users AS u
                 INNER JOIN user_has_roles AS uhr
                 ON
                 uhr.id_user = u.id
                 INNER JOIN 
                 roles AS r
                 ON
                 r.id = uhr.id_rol
                 WHERE u.email = $1
                 GROUP BY 
                 u.id`; 
     return db.oneOrNone(sql,email);
 }

 User.Obtenerphone = (phone) =>{
    const sql = `SELECT  u.id, u.email, u.name, u.lastname, u.phone, 
                    u.image, u.password, u.session_token,
                    json_agg(
                        json_build_object(
                        'id', r.id,
                        'name', r.name,
                        'image', r.image,
                        'route', r.route
                    )) 
                    AS roles FROM users AS u
                    INNER JOIN user_has_roles AS uhr
                    ON
                    uhr.id_user = u.id
                    INNER JOIN 
                    roles AS r
                    ON
                    r.id = uhr.id_rol
                    WHERE u.phone = $1
                    GROUP BY 
                    u.id`; 
         return db.oneOrNone(sql,phone);
     }
User.create = (user) => {

    const myPasswordHashed = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = myPasswordHashed;

    const sql = `
    INSERT INTO
        users(
            email,
            name,
            lastname,
            phone,
            cedula,
            image,
            password,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3 ,$4, $5, $6, $7, $8, $9) RETURNING id    
    `;

    return db.oneOrNone(sql, [
        user.email,
        user.name,
        user.lastname,
        user.phone,
        user.cedula,
        user.image,
        user.password,
        new Date(),
        new Date()       
    ]);
}

User.update = (user) => {
    const sql = `
    UPDATE
        users
    SET
        name = $2,
        lastname = $3,
        phone = $4,
        phone = $5,
        image = $6,
        updated_at = $7
    WHERE
        id = $1    
    `;

    return db.none(sql, [
        user.id,
        user.name,
        user.lastname,
        user.phone,
        user.cedula,
        user.image,
        new Date()
    ]);
    
}

User.updateToken = (id, token) => {
    const sql = `
    UPDATE
        users
    SET
        session_token = $2
    WHERE
        id = $1    
    `;

    return db.none(sql, [
        id,
        token  
    ]);
    
}

User.updateNotificationToken = (id, token) => {
    const sql = `
    UPDATE
        users
    SET
        notification_token = $2
    WHERE
        id = $1    
    `;

    return db.none(sql, [
        id,
        token  
    ]);
}


User.isPasswordMatched = (userPassword, hash) => {
    const myPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
    if (myPasswordHashed === hash) {
        return true;
    }
    return false;
}

module.exports = User;