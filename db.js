const { MongoClient, ObjectId } = require("mongodb");

let singleton;
const COLLECTION = "cards";
const PAGE_SIZE = 5;

async function connect() {
    if (singleton) return singleton;

    const client = new MongoClient(process.env.MONGO_HOST);
    await client.connect();

    singleton = client.db(process.env.MONGO_DATABASE);
    return singleton;
}

async function findAll(page) {
    const skipSize = PAGE_SIZE * (page - 1);
    const db = await connect();

    return db.collection(COLLECTION)
        .find()
        .skip(skipSize)
        .limit(PAGE_SIZE)
        .toArray();
}

async function insert(collection, user) {
    const db = await connect();
    return db.collection(collection).insertOne(user);
}

async function findOne(id) {
    const db = await connect();
    return db.collection(COLLECTION).findOne({_id: new ObjectId(id)});
}

async function update(id, user) {
    const db = await connect();
    return db.collection(COLLECTION).updateOne({ _id: new ObjectId(id) }, { $set: user });
}

async function deleteOne(id) {
    const db = await connect();
    return db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}

async function countAll() {
    const db = await connect();
    return db.collection(COLLECTION).countDocuments();
}

module.exports = { findAll, insert, findOne, update, deleteOne, countAll, PAGE_SIZE }