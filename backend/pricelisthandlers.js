const e = require("express");

const { MongoClient } = require("mongodb")
require("dotenv").config();
const { MONGO_URI } = process.env;
console.log("mon", process.env)

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);


// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");


const getPricelist = async (req, res) => {
    await client.connect();
    const db = client.db("lespa");
    try {
        const pricelist = await db.collection("pricelist").find({}).toArray();
        console.log(pricelist)
        res.status(200).json({ status: 200, data: pricelist })
    } catch (err) {
        res.status(400).json({ status: 400, message: "Error" })
    }
    client.close()
};

const getTreatments = async (req, res) => {
    await client.connect();
    const db = client.db("lespa");
    try {
        const treatment = await db.collection("pricelist").distinct("treatment")
        console.log(treatment)
        res.status(200).json({ status: 200, data: treatment })
    } catch (err) {
        res.status(400).json({ status: 200, message: "Error" })
    }
    client.close()
};

const getTreatmentTypes = async (req, res) => {
    await client.connect();
    const db = client.db("lespa");
    try {
        const treatmentType = await db.collection("pricelist").distinct("type")
        console.log(treatmentType)
        res.status(200).json({ status: 200, data: treatmentType })
    } catch (err) {
        res.status(200).json({ status: 200, message: "Error" })
    }
    client.close()
};

const getSingleTreatment = async (req, res) => {
    let treatment = req.params.treatment.toLowerCase()
    await client.connect();
    const db = client.db("lespa");
    try {
        const findTreatment = await db.collection("pricelist").find({ "treatment_lower": { $regex: treatment } }).toArray();
        console.log(treatment)
        res.status(200).json({ status: 200, message: "success", data: findTreatment })
    } catch (err) {
        res.status(400).json({ status: 200, message: `${treatment}} not found`, data: req.params.treatment })
    }
    client.close()

};

const getTreatmentByType = async (req, res) => {
    let byType = req.params.byType
    await client.connect();
    const db = client.db("lespa");

    try {
        const treatmentsByType = await db.collection("pricelist").find({ "type": { $regex: byType } }).toArray();
        console.log(treatmentsByType)
        client.close()
        res.status(200).json({ status: 200, message: "success", data: treatmentsByType })
    } catch (err) {
        res.status(400).json({ status: 200, message: `${byType}} not found`, data: byType })
    }
    client.close()

};


const addTreatment = async (req, res) => {
    const data = req.body
    const input = {
        type: req.body.type,
        treatment: req.body.treatment,
        treatment_tolower: req.body.treatment.toLowerCase(),
        minutes: req.body.minutes,
        price: req.body.price,
    }

    try {
        await client.connect();
        const db = client.db("lespa");
        const treatmentNew = await db.collection("pricelist").insertOne(input)
        res.status(200).json({ status: 200, message: "success", data: input })
    } catch (err) {
        res.status(400).json({ status: 400, message: "add unsuccessful.", data: data });
    }
    client.close()
};



const deleteTreatment = async (req, res) => {
    const treatmentId = `ObjectId('${req.params.treatment}')`
    console.log(treatmentId)
    await client.connect();
    const db = client.db("lespa");
    const queryTreatment = await db.collection("pricelist").findOne({ _id: treatmentId })

    if (treatmentId) {
        await db.collection("pricelist").deleteOne({ _id: treatmentId });

        res.status(200).json({ status: 200, message: "treatment deleted", data: queryTreatment })

    } else {
        res.status(400).json({ status: 400, message: `Treatment not found`, data: treatmentId });
    }
    client.close()
};


const getQuote = async (req, res) => {

    await client.connect();
    const db = client.db("lespa");
    const quote = await db.collection("data").distinct("quote")
    console.log(quote)

    if (quote) {
        res.status(200).json({ status: 200, data: quote })

    } else {
        res.status(400).json({ status: 400, message: `error` });
    }

    client.close()
}


const updateTreatment = async (req, res) => {
    const treatmentId = `ObjectId('${req.params.treatment}')`
    await client.connect();
    const db = client.db("lespa");
    query = { "data": "quote" }
    const newQuote = {
        type: req.body.selectedType,
        treatment: req.body.treatment,
        treatment_tolower: req.body.treatment.toLowerCase(),
        minutes: req.body.minutes,
        price: req.body.price
    }
    if (query) {
        const updateQuote = await db.collection("data").updateOne(query, newQuote);
        res.status(200).json({ status: 200, message: "success", data: req.body })

    } else {
        res.status(400).json({ status: 400, message: `failed to fetch`, data: req.body });
    }

    client.close()
}


const updateQuote = async (req, res) => {

    await client.connect();
    const db = client.db("lespa");
    query = { "data": "quote" }
    const newQuote = { $set: { "quote": req.body.quote } };
    if (query) {
        const updateQuote = await db.collection("data").updateOne(query, newQuote);
        res.status(200).json({ status: 200, message: "success", data: req.body })

    } else {
        res.status(400).json({ status: 400, message: `error`, error: "failed to fetch" });
    }

    client.close()
}


module.exports = {
    getTreatments, getTreatmentTypes, getSingleTreatment, getTreatmentByType,
    addTreatment, deleteTreatment, updateQuote, getQuote, getPricelist
}