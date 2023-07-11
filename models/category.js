const db = require('../config/config');

const Category = {};


Category.getAll = () => {

    const sql = `
        SELECT
            id,
            name,
            description,
            icon
        FROM
            categories
        ORDER BY
            name
    `;

    return db.manyOrNone(sql);
}

Category.listaCategory = ()=>{
    const sql = `
    SELECT * FROM categories  `;
    return db.manyOrNone(sql);
}

Category.create = (category) => {
    const sql = `
    INSERT INTO
        categories(
            name,
            description,
            icon,
            created_at,
            updated_at
        )
    VALUES ($1, $2, $3, $4, $5) RETURNING id
    `;
    return db.oneOrNone(sql, [
        category.name,
        category.description,
        category.icon,
        new Date(),
        new Date()
    ]);
}

module.exports = Category;