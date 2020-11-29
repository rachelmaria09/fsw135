const express = require("express")
const inventoryRouter = express.Router()
const Inventory = require("../models/inventory")

//Get All
inventoryRouter.get("/", (req, res, next) => {
    Inventory.find((err, items) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(items)
    })
})