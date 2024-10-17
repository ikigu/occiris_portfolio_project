require("dotenv").config();
const mongodb = require("mongodb");
let mongoDbURL = "mongodb://127.0.0.1:27017";

if (process.env.MONGODB_URL) {
  mongoDbURL = process.env.MONGODB_URL;
}

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect(mongoDbURL);
  database = client.db("occiris");
}

function getDb() {
  if (!database) {
    throw { message: "You must connect first!" };
  }
  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
