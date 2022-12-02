const e = require("express");
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require("bcrypt")
const { MongoClient } = require("mongodb")
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);


// disclaimer, if the keys being added to the database, do not match the existing keys we are working with
// then some pages crash. I need to ensure the keys match exactly those in the database.  the value of they key TYPE: 
// My mother's spa is built to fit exactly these three service types which each requires a specific room type. I do not want to add new types.
// that explains my logic below that the object keys must include each one of the four types
// The services pages is designed to fit these three types. I need to ensure the existing types will be null and mess everything up 
// also need to ensure values don't include null or undefined or empty string.
// disclaimer i get quite neurotic in the back end because


// sign in
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


// get the full pricelist
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

//get treatment types
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
    // I created it in a way to ensure that the input has only these keys. and then if the values are not given, they are null
    // but below, if any value is null, then it will not sent to the DB. Because before, the website would break if any of these values were not given 
    // website would also break if keys were wrong. 

    const input = {
        type: req.body.selectedType ? req.body.selectedType : null,
        treatment: req.body.treatment ? req.body.treatment : null,
        treatment_lower: req.body.treatment ? req.body.treatment.toLowerCase() : null,// crashed once when no treatment was given
        minutes: req.body.minutes ? req.body.minutes : null,
        price: req.body.price ? req.body.price : null,
    }

    try {
        if (Object.values(input).includes(null)) {  //here i identify null values and prevent the form from updating
            res.status(400).json({ status: 400, message: "values include null", data: input })
        } else if (!Object.values(input).includes(null)) {
            await client.connect();
            const db = client.db("lespa");
            const treatmentNew = await db.collection("pricelist").insertOne(input)
            res.status(200).json({ status: 200, message: "success", data: input })
        } else {
            res.status(400).json({ status: 400, message: "values include null", data: input })
        }
    }
    catch (err) {
        res.status(400).json({ status: 500, message: "unsuccessful.", data: input });
    }
    client.close()
};



const deleteTreatment = async (req, res) => {
    const treatmentId = req.params.treatment;
    const o_id = new ObjectId(treatmentId);

    // console.log(treatmentId)
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
    const quote = await db.collection("data").findOne({ "data": "quote" })
    console.log(quote.text)
    quote ? res.status(200).json({ status: 200, data: quote.text })
        : res.status(400).json({ status: 400, message: `error` });
    client.close()
}

const getAbout = async (req, res) => {

    await client.connect();
    const db = client.db("lespa");
    const about = await db.collection("data").findOne({ "data": "about" })
    console.log(about);
    about ? res.status(200).json({ status: 200, data: about.text })
        : res.status(400).json({ status: 400, message: `error` });
    client.close()
}

const updateTreatment = async (req, res) => {
    const treatmentId = req.params.treatment;
    const o_id = new ObjectId(treatmentId);
    await client.connect();
    const db = client.db("lespa");
    const queryTreatment = await db.collection("pricelist").findOne({ _id: o_id })

    const updatedTreatment = {
        // users cannot change the type. type is extracted from DB. 
        // the line below prevents page from breaking if the type is not found
        // the other lines below that allow original values to be retained if not sent.
        type: queryTreatment.type ? queryTreatment.type : null,
        treatment: req.body.treatment ? req.body.treatment : queryTreatment.treatment,
        treatment_lower: req.body.treatment.toLowerCase(),
        minutes: req.body.minutes ? req.body.minutes : queryTreatment.minutes,
        price: req.body.price ? req.body.price : queryTreatment.price
    }

    if (!queryTreatment || !queryTreatment.type) {
        res.status(400).json({ status: 400, message: `ID not found`, data: req.body });
    } else if (queryTreatment) {
        const updateTreatment = await db.collection("pricelist").updateOne({ "_id": o_id }, { $set: updatedTreatment });
        res.status(200).json({ status: 200, message: "success", data: req.body })
    } else {
        res.status(400).json({ status: 400, message: `unknown error`, data: req.body });
    } client.close()
}


const updateQuote = async (req, res) => {

    await client.connect();
    const db = client.db("lespa");
    query = { "data": "quote" }
    const newQuote = { $set: { "text": req.body.text } };
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
    const newQuote = { $set: { "text": req.body.text } };
    if (query) {
        const updateQuote = await db.collection("data").updateOne(query, newQuote);
        res.status(200).json({ status: 200, message: "success", data: req.body })
    } else {
        res.status(400).json({ status: 400, message: `error`, error: "failed to fetch" });
    }
    client.close()
}

module.exports = {
    getTreatmentTypes, getTreatmentByType,
    addTreatment, deleteTreatment, updateQuote, getQuote, getPricelist, updateTreatment,
    getAbout, userAuth, updateAbout
}