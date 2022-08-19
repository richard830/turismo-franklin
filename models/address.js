const db = require('../config/config');

const Address = {};


Address.findByUser = (id_user) => {
    const sql = `
    SELECT
        id,
        id_user,
        address,
        country,
        cedula,
        arrival,
        hour_arrival,
        departure,
        number_people,
        image,
        description,
        payment_proof_number
    FROM 
    address
    WHERE
        id_user = $1        
    
    `;

    return db.manyOrNone(sql, id_user);
}

Address.create = (address) => {
    const sql = `
    INSERT INTO
    address(
            id_user,
            address,
            country,
            cedula,
            arrival,
            hour_arrival,
            departure,
            number_people,
            payment_proof_number,
            image,
            description,
            created_at,
            updated_at
        )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id
    `;

    return db.oneOrNone(sql, [
        address.id_user,
        address.address,
        address.country,
        address.cedula,
        address.arrival,
        address.hour_arrival,
        address.departure,
        address.number_people,
        address.payment_proof_number,
        address.image,
        address.description,
        new Date(),
        new Date()
    ]);
}

module.exports = Address;