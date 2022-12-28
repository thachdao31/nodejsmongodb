const {MongoClient} = require('mongodb');

const url = 'mongodb://0.0.0.0:27017/';

let db;
 
const connectToDb = (callback) => {
    MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
        if (err) {
            callback(err);
        } else {
            db = client.db('mydb');
            callback(null);
        }
    });
}

const getDb = () => {
    return db;
}

module.exports = {
    connectToDb,
    getDb
}


