const e = require("express");
const ObjectId = require('mongodb').ObjectId;

const bcrypt = require("bcrypt")
const { MongoClient } = require("mongodb")
require("dotenv").config();
const { MONGO_URI } = process.env;
console.log("mon", process.env)

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);





const userAuth = async (req, res) => {
    await client.connect();
    const db = client.db("lespa");
    const { email, password } = req.body


    try {
        const isAdmin = await db.collection("admin").findOne({ email })
        const isValidPassword = await bcrypt.compare(password, isAdmin.password)
        if (!isAdmin || isValidPassword) {
            res.status(200).json({ status: 200, data: true })
        } else {
            res.status(400).json({ status: 400, data: false, message: " Invalid username and/or password." })
        }
    } catch (err) {
        res.status(500).json({ status: 500, message: "Error", message: "Unknown error, please contact Mayss" })
    }
    client.close()
};


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
        res.status(400).json({ status: 400, message: "Error" })
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

    const input = {
        type: req.body.selectedType,
        treatment: req.body.treatment,
        // the line below crashed once when no treatment key was given
        treatment_lower: !req.body.treatment ? "" : req.body.treatment.toLowerCase(),// crashed once when no treatment was given
        minutes: req.body.minutes,
        price: req.body.price,
    }

    // disclaimer, if the keys being added to the database, do not match the existing keys we are working with
    // then some pages crash. I need to ensure there is no other service type. My mother's spa is built to fit
    // exactly these three service types which each requires a specific room type. I do not want to add new keys.
    // that explains my logic below that the object keys must include each one of the four types
    // if not, then one of the existing types will be null and mess everything up 
    // also need to ensure values don't include null or undefined or empty string.
    // disclaimer i get quite neurotic in the back end because

    try {
        if (Object.keys(req.body).includes("selectedType") && Object.keys(req.body).includes("treatment")
            && Object.keys(req.body).includes("price") && Object.keys(req.body).includes("minutes")
            && Object.keys(req.body).length === 4 && !Object.values(req.body).includes(undefined) && !Object.values(req.body).includes("")
            && !Object.values(req.body).includes(null)
        ) {
            await client.connect();
            const db = client.db("lespa");
            const treatmentNew = await db.collection("pricelist").insertOne(input)
            res.status(200).json({ status: 200, message: "success", data: input })
        } else if (!Object.keys(req.body).includes("selectedType") || !Object.keys(req.body).includes("treatment")
            || !Object.keys(req.body).includes("price") || !Object.keys(req.body).includes("minutes")) {
            res.status(400).json({ status: 400, message: "invalid name/number of keys", data: input })
        } else if (Object.values(req.body).includes(undefined) || Object.values(req.body).includes(null) || Object.values(req.body).includes("")) {
            res.status(400).json({ status: 400, message: "values include undefined, null or empty string", data: input })
        }
    } catch (err) {
        res.status(400).json({ status: 500, message: "unsuccessful.", data: input });
    }
    client.close()
};



const deleteTreatment = async (req, res) => {

    const treatmentId = req.params.treatment;
    const o_id = new ObjectId(treatmentId);

    console.log(treatmentId)
    await client.connect();
    const db = client.db("lespa");
    const queryTreatment = await db.collection("pricelist").find({ "_id": o_id })

    if (queryTreatment) {
        await db.collection("pricelist").deleteOne({ "_id": o_id });

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

const getAbout = async (req, res) => {

    await client.connect();
    const db = client.db("lespa");
    const quote = await db.collection("data").distinct("about")
    console.log(quote)
    if (quote) {
        res.status(200).json({ status: 200, data: quote })
    } else {
        res.status(400).json({ status: 400, message: `error` });
    }
    client.close()
}

const updateTreatment = async (req, res) => {
    const treatmentId = req.params.treatment;
    const o_id = new ObjectId(treatmentId);
    await client.connect();
    const db = client.db("lespa");
    const queryTreatment = await db.collection("pricelist").findOne({ _id: o_id })

    const updatedTreatment = {
        type: queryTreatment.type,
        treatment: req.body.treatment ? req.body.treatment : queryTreatment.treatment,
        treatment_lower: req.body.treatment.toLowerCase(),
        minutes: req.body.minutes ? req.body.minutes : queryTreatment.minutes,
        price: req.body.price ? req.body.price : queryTreatment.price
    }


    if (queryTreatment && Object.keys(req.body).includes("selectedType") && Object.values(req.body).includes("treatment")
        && Object.keys(req.body).includes("price") && Object.values(req.body).includes("minutes")) {
        // const updateTreatment = await db.collection("pricelist").updateOne({ "_id": o_id }, { $set: updatedTreatment });
        res.status(200).json({ status: 200, message: "success", data: req.body })
    } else {
        res.status(400).json({ status: 400, message: `not found`, data: req.body });
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

const updateAbout = async (req, res) => {

    await client.connect();
    const db = client.db("lespa");
    query = { "data": "about" }
    const newQuote = { $set: { "about": req.body.about } };
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
    addTreatment, deleteTreatment, updateQuote, getQuote, getPricelist, updateTreatment,
    getAbout, userAuth, updateAbout
}