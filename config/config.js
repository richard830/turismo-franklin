const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query: (e) => {}
}

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue) {
    return stringValue;
});

const databaseConfig = {

    'host': 'database-ejemplo.cmoskzwrbvmj.sa-east-1.rds.amazonaws.com',
    'port': 5432,
    'database': 'databaseejemplo',
    'user': 'postgres',
    'password': 'turismo12345',
    ssl: true,
    dialect: 'postgres',
    dialectOptions: {
        "ssl": { "require": true }
    },

    rejectUnauthorized: false,
    requestCert: true,
    agent: false



    // 'host': '127.0.0.1',
    // 'port': 5432,
    // 'database': 'turismo',
    // 'user': 'postgres',
    // 'password': '12345'
};

const db = pgp(databaseConfig);

module.exports = db;