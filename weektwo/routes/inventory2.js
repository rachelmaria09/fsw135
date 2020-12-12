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

//Get One
inventoryRouter.get("/:itemId", (req, res, next) => {
    const itemId = req.params.itemId
    const foundItem = items.find(item => item._id === itemId)
    if(!foundItem) {
        const error = new Error(`The item with id ${itemId} was not found.`)
        res.status(500)
        return next(error)
    }
    res.status(200).send(foundItem)
})

//Post One
inventoryRouter.post("/", (req, res, next) => {
    console.log(req.body, "inventory2post")
    const newItem = new Inventory(req.body)
    newItem.save((err, savedItem) => {
        if(err) {
            res.status(500)
            return next(err)
        } else {
        return res.status(201).send(savedItem)
        }
    })
})

//Delete One
inventoryRouter.delete("/:itemId", (req, res, next) => {
    Inventory.findOneAndDelete({_id: req.params.itemId}, (err, deletedItem) => {
        if(err) {
            res.status(500)
            return next (err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedItem.item} from the database.`)
    })
})

//Put
inventoryRouter.put("/:itemId", (req, res, next) => {
    Inventory.findOneAndUpdate(
        {_id: req.params.itemId},
        req.body,
        {new: true},
        (err, updatedItem) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedItem)
        }
    )
})

module.exports = inventoryRouter