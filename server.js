const express = require("express")
const routes = express.Router();
const bodyParser = require("body-parser")
const app = express()

require("dotenv").config()

const port = process.env.port || 3000

const cors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", true)
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE")
    next()
}

app.use("/", cors)
app.use("/", bodyParser.json())
app.use("/", require("./routes/index"))

app.listen(port, () => {
    console.log(`Server listening at port ${port}`)
})