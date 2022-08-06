const { MongoClient } = require('mongodb');
const { DB_NAME: dbName, DB_URL: url } = require('./constants');
const assert = require('assert');
const circulationRepo = require('./repos/circulationRepo');
const data = require('./circulation.json');

async function main() {
    const client = new MongoClient(url);
    await client.connect();

    try {
        const results = await circulationRepo.loadData(data);
        assert.equal(data.length, results.insertedCount);
    } catch (error) {
        console.error(error);
    }

    try {
        const getData = await circulationRepo.get();
        assert.equal(data.length, getData.length);

        const filterData = await circulationRepo.get({ Newspaper: getData[4].Newspaper });
        assert.deepEqual(filterData[0], getData[4]);

        const limitData = await circulationRepo.get({}, 3);
        assert.equal(limitData.length, 3);

        const byId = await circulationRepo.getById(getData[4]._id.toString());
        assert.deepEqual(byId, getData[4]);
    } catch (error) {
        console.error(error);
    }


    const admin = client.db(dbName).admin();

    await client.db(dbName).dropDatabase();
    console.log(await admin.listDatabases());

    client.close();
}

main();