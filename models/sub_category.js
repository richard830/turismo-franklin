const db = require('../config/config');

const SubCategory = {};

SubCategory.findByCategory = (id_category) => {
    const sql = `
    SELECT 
        S.id,
        S.name,
        S.description,
        S.id_category
    FROM 
        sub_categories AS S
    INNER JOIN 
        categories AS C
    ON
        S.id_category = C.id
    WHERE
        C.id = $1
    `;

    return db.manyOrNone(sql, id_category);
}

SubCategory.getAll = () => {

    const sql = `
        SELECT
            id,
            name,
            description,
            id_category
        FROM
            sub_categories
        ORDER BY
            name
    `;

    return db.manyOrNone(sql);
}

SubCategory.Eliminar = (id) => {
    const sql = 'delete from sub_categories  WHERE id = $1'
    return db.manyOrNone(sql, id)
  }

  SubCategory.listahotel = ()=>{
    const sql = `
    SELECT * FROM sub_categories  `;
    return db.manyOrNone(sql);
}


SubCategory.findByCategory = (id_category) => {
    const sql = `
    SELECT 
        S.id,
        S.name,
        S.id_category
    FROM 
        sub_categories AS S
    INNER JOIN 
        categories AS C
    ON
        S.id_category = C.id
    WHERE
        C.id = $1
    `;

    return db.manyOrNone(sql, id_category);
}

SubCategory.findByCategoryAndProductName = (id_category, sub_categories_name) => {
    const sql = `
    SELECT 
        S.id,
        S.name,
        S.id_category
    FROM 
        products AS S
    INNER JOIN 
        categories AS C
    ON
        S.id_category = C.id 
    WHERE
        C.id = $1 AND S.name ILIKE $2
    `;

    return db.manyOrNone(sql, [id_category, `%${sub_categories_name}%`]);
}

SubCategory.create = (sub_category) => {
    const sql = `
    INSERT INTO 
        sub_categories(
            name,
            description,
            id_category,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5) RETURNING id    
    `;
    return db.oneOrNone(sql, [
        sub_category.name,
        sub_category.description,
        sub_category.id_category,
        new Date(),
        new Date()
    ]);
}

SubCategory.update = (sub_category) => {
    const sql = `
    UPDATE
        sub_categories
    SET 
        name = $2,
        description = $3,
        id_category = $4,
        updated_at = $5
    WHERE
        id = $1
    `;
    return db.none(sql,[
        sub_category.id,
        sub_category.name,
        sub_category.id_category,
        new Date()
    ]);
}

module.exports = SubCategory;
