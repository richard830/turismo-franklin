const db = require('../config/config');

const Order = {};


Order.excel = ()=>{
    const sql = `
    SELECT 
        O.id,
        O.id_client,
		O.id_address,
        O.status,
        O.timestamp,
        O.direccion,
        O.cedula,
        O.arrival,
        O.departure,
        O.number_people,
        O.description,
        O.image,
		JSON_AGG(
			JSON_BUILD_OBJECT(
				'id', P.id,
				'name', P.name,
				'description', P.description,
				'price', P.price,
				'image1', P.image1,
				'image2', P.image2,
				'image3', P.image3,
				'quantity', OHP.quantity
			)
		) AS products,
        JSON_BUILD_OBJECT(
       		    'id', U.id, 
		    	'name', U.name,
     		    'lastname', U.lastname,
     		    'email', U.email,
     		    'image', U.image
        ) AS client,
	JSON_BUILD_OBJECT(
       	'id', A.id,
		'address', A.address,
		'country', A.country ,
		'cedula', A.cedula ,
		'arrival', A.arrival ,
		'hour_arrival', A.hour_arrival ,
		'departure', A.departure ,
		'number_people',A.number_people,
		'payment_proof_number', A.payment_proof_number,
		'image', A.image , 
		'description', A.description 
        ) AS Address
    FROM
        v_orders AS O 
    INNER JOIN
        users AS U
    ON
        O.id_client = U.id
    left JOIN 
        Address As A
    ON
        A.id = O.id_address
	INNER JOIN 
		order_has_products AS OHP
	ON 
		OHP.id_order = O.id
	left JOIN 
		products AS P
	ON 
		P.id = OHP.id_product
	
   
	GROUP BY
		O.id, U.id, A.id, O.id,
        O.id_client,
		O.id_address,
        O.status,
        O.timestamp,
        O.direccion,
        O.cedula,
        O.arrival,
        O.hour_arrival,
        O.departure,
        O.number_people,
        O.description,
        O.image

    
    
    `;
    return db.manyOrNone(sql);
}


Order.findByStatus = (status) => {
    
    const sql = `
    SELECT 
        O.id,
        O.id_client,
		O.id_address,
        O.status,
        O.timestamp,
        O.direccion,
        O.cedula,
        O.arrival,
        O.departure,
        O.number_people,
        O.description,
        O.image,
		JSON_AGG(
			JSON_BUILD_OBJECT(
				'id', P.id,
				'name', P.name,
				'description', P.description,
				'price', P.price,
				'image1', P.image1,
				'image2', P.image2,
				'image3', P.image3,
				'quantity', OHP.quantity
			)
		) AS products,
        JSON_BUILD_OBJECT(
       		    'id', U.id, 
		    	'name', U.name,
     		    'lastname', U.lastname,
     		    'email', U.email,
                 'phone', U.phone,
                 'cedula', U.cedula,
     		    'image', U.image
        ) AS client,
	JSON_BUILD_OBJECT(
       	'id', A.id,
		'address', A.address,
		'country', A.country ,
		'cedula', A.cedula ,
		'arrival', A.arrival ,
		'hour_arrival', A.hour_arrival ,
		'departure', A.departure ,
		'number_people',A.number_people,
		'payment_proof_number', A.payment_proof_number,
		'image', A.image , 
		'description', A.description 
        ) AS Address
    FROM
        v_orders AS O 
    INNER JOIN
        users AS U
    ON
        O.id_client = U.id
    left JOIN 
        Address As A
    ON
        A.id = O.id_address
	INNER JOIN 
		order_has_products AS OHP
	ON 
		OHP.id_order = O.id
	left JOIN 
		products AS P
	ON 
		P.id = OHP.id_product
	
    WHERE
        status = $1
	GROUP BY
		O.id, U.id, A.id, O.id,
        O.id_client,
		O.id_address,
        O.status,
        O.timestamp,
        O.direccion,
        O.cedula,
        O.arrival,
        O.hour_arrival,
        O.departure,
        O.number_people,
        O.description,
        O.image

    `;

    return db.manyOrNone(sql, status);

}


Order.create = (order) => {
    const sql = `
    INSERT INTO
        orders(
            id_client,
            id_address,
            status,
            timestamp,
            created_at,
            updated_at
        )
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
    `;

    return db.oneOrNone(sql, [
        order.id_client,
        order.id_address,
        order.status,
        Date.now(),
        new Date(),
        new Date()
    ]);
}

Order.update =(order) => {
        const sql = `
        UPDATE
            orders
        SET
            id_client = $2,
            status = $3,
            updated_at = $4 
        WHERE
            id = $1
        `;
        return db.none(sql,[
            order.id,
            order.id_client,
            order.status,
            new Date()
        ]);
}


module.exports = Order;