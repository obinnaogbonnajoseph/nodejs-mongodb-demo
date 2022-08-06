const { MongoClient } = require('mongodb');
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'circulation';
exports.DB_NAME = dbName;
exports.DB_URL = dbUrl;
exports.getDB = async() => {
    const client = new MongoClient(dbUrl);
    await client.connect();
    return client.db(dbName);
}