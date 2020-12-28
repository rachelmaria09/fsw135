const express = require("express")
const app = express()
require("dotenv").config()
const morgan = require("morgan")
const mongoose = require("mongoose")
const expressJwt = require("express-jwt")

app.use(express.json())
app.use(morgan("dev"))

mongoose.connect("mongodb://localhost:27017/ecommercedb", 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
},
() => console.log("Connected to db!")
)

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/auth", require("./routes/authRouter"))
app.use("/api", expressJwt({secret: process.env.SECRET, algorithms: ["sha1", "RS256", "HS256"]}))
app.use("/api/user", require("./routes/userRouter"))
app.use("/api/issue", require("./routes/issueRouter"))
app.use("/api/comment", require("./routes/commentRouter"))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.listen(9000, () => {
    console.log("Server is working!")
})