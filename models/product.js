const db = require('../config/config');

const Product = {};


Product.Eliminar = (id) => {
    const sql = 'delete from products  WHERE id = $1'
    return db.manyOrNone(sql, id)
  }

  

Product.listahotel = ()=>{
    const sql = `
    SELECT * FROM products  `;
    return db.manyOrNone(sql);
}

Product.listProductsRecentAdd = ()=>{
    const sql = `
    SELECT * FROM products  ORDER BY created_at DESC LIMIT 10`;
    return db.manyOrNone(sql);
}

Product.listProductsRandom = ()=>{
    const sql = `
    SELECT * FROM products  ORDER BY RANDOM() `;
    return db.manyOrNone(sql);
}


Product.findBySubcategory = (id_sub_category) => {
    const sql = `
    SELECT 
        P.id,
        P.name,
        P.description,
        P.price,
        P.image1,
        P.image2,
        P.image3,
        P.id_category,
        P.id_sub_category,
        P.address,
        P.phone,
        p.whatsapp,
        p.location
    FROM 
        products AS P
    INNER JOIN 
        sub_categories AS S
    ON
        P.id_sub_category = S.id
    WHERE
        S.id = $1
    `;

    return db.manyOrNone(sql, id_sub_category);
}

Product.findByCategory = (id_category) => {
    const sql = `
    SELECT 
        P.id,
        P.name,
        P.description,
        P.price,
        P.image1,
        P.image2,
        P.image3,
        P.id_category,
        P.id_sub_category,
        P.address,
        P.phone,
        p.whatsapp,
        p.location        
    FROM 
        products AS P
    INNER JOIN 
        categories AS C
    ON
        P.id_category = C.id
    WHERE
        C.id = $1
    `;
    return db.manyOrNone(sql, id_category);
}

Product.findByCategoryAndProductName = (id_category, product_name) => {
    const sql = `
    SELECT 
        P.id,
        P.name,
        P.description,
        P.price,
        P.image1,
        P.image2,
        P.image3,
        P.id_category
    FROM 
        products AS P
    INNER JOIN 
        categories AS C
    ON
        P.id_category = C.id 
    WHERE
        C.id = $1 AND P.name ILIKE $2
    `;

    return db.manyOrNone(sql, [id_category, `%${product_name}%`]);
}

Product.create = (product) => {
    const sql = `
    INSERT INTO 
        products(
            name,
            description,
            price,
            image1,
            image2,
            image3,
            id_sub_category,
            id_category,
            address,
            phone,
            location,
            whatsapp,
            created_at,
            updated_at		
        )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id    
    `;
    return db.oneOrNone(sql, [
        product.name,
        product.description,
        product.price,
        product.image1,
        product.image2,
        product.image3,
        product.id_sub_category,
        product.id_category,
        product.address,
        product.phone,
        product.whatsapp,
        product.location,
        new Date(),
        new Date()
    ]);
}

Product.update = (product) => {
    const sql = `
    UPDATE
        products
    SET 
        name = $2,
        description = $3,
        price = $4,
        image1 = $5,
        image2 = $6,
        image3 = $7,
        id_sub_category = $8,
        id_category = $9,
        address = $10,
        phone = $11,
        whatsapp = $12,
        location = $13,
        updated_at = $14
    WHERE
        id = $1
    `;
    return db.none(sql,[
        product.id,
        product.name,
        product.description,
        product.price,
        product.image1,
        product.image2,
        product.image3,
        product.id_sub_category,
        product.id_category,
        product.address,
        product.phone,
        product.whatsapp,
        product.location,
        new Date()
    ]);
}

module.exports = Product;