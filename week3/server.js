const express = require("express")
const app = express()
require("dotenv").config()
const morgan = require("morgan")
const mongoose = require("mongoose")

app.use(express.json())
app.use(morgan("dev"))

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

app.use("/user", require("./routes/userRouter"))

app.listen(9000, () => {
    console.log("Server is working!")
})