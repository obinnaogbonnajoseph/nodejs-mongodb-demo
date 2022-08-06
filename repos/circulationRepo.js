const { MongoClient, ObjectId } = require('mongodb');
const { DB_NAME: dbName, DB_URL: url, COLLECTION_NAME: collectionName } = require('../constants');

function circulationRepo() {
    function loadData(data) {
        return new Promise(async(resolve, reject) => {
            const client = new MongoClient(url);
            try {
                await client.connect();
                const db = await client.db(dbName);
                const results = await db
                    .collection(collectionName)
                    .insertMany(data);
                resolve(results);
            } catch (error) {
                reject(error);
            } finally {
                client.close();
            }
        })
    }

    function get(query, limit) {
        return new Promise(async(resolve, reject) => {
            const client = new MongoClient(url);
            try {
                await client.connect();
                const db = client.db(dbName);

                let items = db.collection(collectionName).find(query);

                if (limit > 0) {
                    items = items.limit(limit);
                }
                resolve(await items.toArray());
            } catch (error) {
                reject(error);
            } finally {
                client.close();
            }
        })
    }

    function getById(id) {
        return new Promise(async(resolve, reject) => {
            const client = new MongoClient(url);
            try {
                await client.connect();
                const db = client.db(dbName);
                const item = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });

                resolve(item);
            } catch (error) {
                reject(error);
            } finally {
                client.close();
            }
        })
    }
    return { loadData, get, getById };
}

module.exports = circulationRepo();