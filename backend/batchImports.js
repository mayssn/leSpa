const e = require("express");
const { MongoClient } = require("mongodb");
const pricelist = require("./data/pricelist.json");

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const batchImport = async () => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("lespa");
    console.log(pricelist)

    await db.collection("pricelist").insertMany(pricelist);
    client.close()
    console.log("disconnected!");

}
batchImport()
// console.log(MONGO_URI)
