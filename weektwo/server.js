const express = require("express")
const app = express()
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/ecommercedb", 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
},
() => console.log("Connected to ecommercedb!")
)

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(9000, () => {
    console.log("Server is working!")
})