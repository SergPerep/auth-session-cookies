const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/auth", require('./routes/jwtAuth'));


app.get("/", (req, res) => {
    res.send("<h1>Hello, underworld</h1>");
})

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});