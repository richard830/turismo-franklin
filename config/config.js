const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query: (e) => {}
}

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue){
    return stringValue;
});

const databaseConfig = {
    'host': 'containers-us-west-79.railway.app',
    'port': 6452,
    'database': 'railway',
    'user': 'postgres',
    'password': 'G4mfA9BUr80obCVYir4n', 
     ssl: true,
     dialect: 'postgres',
    dialectOptions: {
    "ssl": {"require":true }
    },

    rejectUnauthorized: false,
      requestCert: true,
      agent: true   


    /*   'host': '127.0.0.1',
    'port': 5432,
    'database': 'db_quenetur',
    'user': 'postgres',
    'password': 'T3l3amaz0na5'  */ 
};

const db = pgp(databaseConfig);

module.exports = db;