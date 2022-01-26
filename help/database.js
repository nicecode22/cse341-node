const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    mongoClient.connect(
        'mongodb+srv://nicecode22:mmczaho947@cluster0.avaa3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        )
            .then(client => {
                console.log('You are in');
                callback(client);
            })
            .catch(err => {
        console.log(err);
    });
};



module.exports = mongoConnect;