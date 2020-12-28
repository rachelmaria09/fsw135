const express = require("express")
const issueRouter = express.Router()
const Issue = require("../models/issue")

//get all issues
issueRouter.get("/", (req, res, next) => {
    Issue.find((err, issues) => {
        console.log(issues)
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

//get one issue
issueRouter.get("/Id/:issueId", (req, res, next) => {
    const issueId = req.params.issueId
    Issue.find({_id: issueId}, (err, issues) => {
        console.log(issues)
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

//get by user
issueRouter.get("/user", (req, res, next) => {
    console.log(req.user._id)
    Issue.find({user: req.user._id}, (err, issues) => {
        console.log(issues)
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
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

//upvote
issueRouter.put("/:issueId/upvote", (req, res, next) => {
    Issue.find({_id: req.params.issueId}, (err, issue) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        let voter = issue[0].voters.findIndex((voter) => {
            return voter.userId === req.user._id && voter.voted === "upvoted"
        })
        if(voter < 0) {
    Issue.findOneAndUpdate (
        {_id: req.params.issueId},
        {$inc: {
            upvotes: 1,
        },
        $push: {
            voters: {userId: req.user._id, voted: "upvoted"},
        }
        },
        {new: true},
        (err, updatedIssue) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        }
    )
} else {
    res.status(500)
    return next(new Error("You already upvoted on this issue!"))
}
})
})

//downvote
issueRouter.put("/:issueId/downvote", (req, res, next) => {
    Issue.find({_id: req.params.issueId}, (err, issue) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        let voter = issue[0].voters.findIndex((voter) => {
            return voter.userId === req.user._id && voter.voted === "downvoted"
        })
        if(voter < 0) {
    Issue.findOneAndUpdate (
        {_id: req.params.issueId},
        {$inc: {
            downvotes: 1,
        },
        $push: {
            voters: {userId: req.user._id, voted: "downvoted"},
        }
        },
        {new: true},
        (err, updatedIssue) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        }
    )
} else {
    res.status(500)
    return next(new Error("You already downvoted on this issue!"))
}
})
})

module.exports = issueRouter