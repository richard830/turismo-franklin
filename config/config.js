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
    'host': 'ec2-54-86-106-48.compute-1.amazonaws.com',
    'port': 5432,
    'database': 'dfp4iqmpcofh37',
    'user': 'zfeaavhkgtfwkm',
    'password': '1a8207e1e11f859bc5b79762219e0c7e32a6282eaf5795a92985e5391398ab73', 
     ssl: true,
     dialect: 'postgres',
    dialectOptions: {
    "ssl": {"require":true }
    },

    rejectUnauthorized: false,
      requestCert: true,
      agent: false 


    /* 'host': '127.0.0.1',
    'port': 5432,
    'database': 'hoteles',
    'user': 'postgres',
    'password': '12345' */
};

const db = pgp(databaseConfig);

module.exports = db;