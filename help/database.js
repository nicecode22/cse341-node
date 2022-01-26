const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let db;

const mongoConnect = (callback) => {
    mongoClient.connect(
        'mongodb+srv://nicecode22:mmczaho947@cluster0.avaa3.mongodb.net/shop?retryWrites=true&w=majority'
        )
            .then(client => {
                console.log('You are in');
                db = client.db();
                callback();
            })
            .catch(err => {
        console.log(err);
        throw err;
    });
};

const getDb = () => {
    if (db) {
        return db;
    }
    throw 'No database found';
};


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;