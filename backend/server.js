const express = require("express")
var cors = require('cors')
const morgan = require("morgan")


const {
    getTreatments,
    getSingleTreatment,
    getTreatmentTypes,
    getTreatmentByType,
    addTreatment,
    deleteTreatment,
    updateQuote,
    getQuote,
    getAbout,
    getPricelist,
    updateTreatment,
    updateAbout,
    userAuth,
} = require("./pricelisthandlers")

const { createEvent } = require("./handlers")

express()
    .use(cors())
    .use(morgan("tiny"))
    .use(express.json())
    .get("/hello", createEvent)
    .get("/api/get-pricelist", getPricelist)
    .get("/api/get-treatments", getTreatments)
    .get("/api/get-treatment-types", getTreatmentTypes)
    .get("/api/get-treatment/:treatment", getSingleTreatment)
    .get("/api/get-treatment-byType/:byType", getTreatmentByType)
    .post("/api/add-treatment", addTreatment)
    .delete("/api/delete-treatment/:treatment", deleteTreatment)
    .patch("/api/update-quote", updateQuote)
    .patch("/api/update-about", updateAbout)
    .patch("/api/update-treatment/:treatment", updateTreatment)
    .get("/api/get-quote", getQuote)
    .get("/api/get-about", getAbout)

    // user auth
    .post("/api/admin", userAuth)




    .listen(8000, () => { console.log("Server live on port 8000"); })