const { getDB } = require('../constants');

function circulationRepo() {
    function loadData(data) {
        return new Promise(async(resolve, reject) => {
            try {
                const db = await getDB();
                const results = await db
                    .collection('newspapers')
                    .insertMany(data);
                resolve(results);
            } catch (error) {
                reject(error)
            }
        })
    }
    return { loadData };
}

module.exports = circulationRepo();