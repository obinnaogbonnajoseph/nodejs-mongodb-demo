const { getDB } = require('./constants');
const circulationRepo = require('./repos/circulationRepo');
const data = require('./circulation.json');

async function main() {
    const db = await getDB();
    const results = await circulationRepo.loadData(data);
    console.log(results.insertedCount);
    const admin = await db.admin();
    // console.log(await admin.serverStatus());
    console.log(await admin.listDatabases());
}

main();