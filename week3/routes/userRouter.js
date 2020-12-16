const express = require("express")
const userRouter = express.Router()
const User = require("../models/user")

//get all users
userRouter.get("/", (req, res, next) => {
    User.find((err, users) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(users)
    })
})

//get one user
userRouter.get("/:userId", (req, res, next) => {
    const userId = req.params.userId
    const foundUser = users.find(user => user._id === userId)
    if(!foundUser) {
        const error = new Error(`The user was not found.`)
        res.status(500)
        return next(error)
    }
    res.status(200).send(foundUser)
})

//add new user
userRouter.post("/", (req, res, next) => {
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedUser)
    })
})

//delete user
userRouter.delete(":userId", (req, res, next) => {
    User.findOneAndDelete (
        {_id: req.params.userId},
        (err, deletedUser) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted ${deletedUser.username}`)
        }
    )
})

//Update User
userRouter.put("/:userId", (req, res, next) => {
    User.findOneAndUpdate (
        {_id: req.params.userId},
        req.body,
        {new: true},
        (err, updatedUser) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(updatedUser)
        }
    )
})

module.export = userRouter