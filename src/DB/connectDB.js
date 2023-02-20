const { MongoClient } = require("mongodb");

const connectionURL = process.env.MONGODB_CONNECTION_URL;
const databaseName = process.env.DATABASE;

// create db instance
const getDBInstance = async () => {
  const client = await MongoClient.connect(connectionURL);
  return client.db(databaseName);
};

let db;
const getDB = async () => {
  if (!db) {
    console.log("MongoDB connected");
    db = getDBInstance();
  }
  return db;
};

module.exports = {
  getDB,
};
