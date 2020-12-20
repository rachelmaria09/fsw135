const express = require("express")
const userRouter = express.Router()
const Issue = require("../models/issue")

//get all issues
issueRouter.get("/", (req, res, next) => {
    Issue.find((err, issues) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

//get one issue
issueRouter.get("/:issueId", (req, res, next) => {
    const issueId = req.params.issueId
    const foundIssue = issues.find(issue => issue._id === issueId)
    if(!foundIssue) {
        const error = new Error(`The issue was not found.`)
        res.status(500)
        return next(error)
    }
    res.status(200).send(foundIssue)
})

//add new issue
issueRouter.post("/", (req, res, next) => {
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
})

//delete issue
issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.findOneAndDelete (
        {_id: req.params.issueId},
        (err, deletedIssue) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted ${deletedIssue.username}`)
        }
    )
})

//Update Issue
issueRouter.put("/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate (
        {_id: req.params.issueId},
        req.body,
        {new: true},
        (err, updatedIssue) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(updatedIssue)
        }
    )
})

module.exports = issueRouter