const express = require("express")
const commentRouter = express.Router()
const Comment = require("../models/comment")

//get all comments
commentRouter.get("/", (req, res, next) => {
    Comment.find((err, comments) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

//get one comment
commentRouter.get("/:commentId", (req, res, next) => {
    const commentId = req.params.commentId
    const foundComment = comments.find(comment => comment._id === commentId)
    if(!foundComment) {
        const error = new Error(`The comment was not found.`)
        res.status(500)
        return next(error)
    }
    res.status(200).send(foundComment)
})

//add new comment
commentRouter.post("/", (req, res, next) => {
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedComment)
    })
})

//delete comment
commentRouter.delete("/:commentId", (req, res, next) => {
    Comment.findOneAndDelete (
        {_id: req.params.commentId},
        (err, deletedComment) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted ${deletedComment.title}`)
        }
    )
})

//Update Comment
commentRouter.put("/:commentId", (req, res, next) => {
    Comment.findOneAndUpdate (
        {_id: req.params.commentId},
        req.body,
        {new: true},
        (err, updatedComment) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(updatedComment)
        }
    )
})

module.export = commentRouter