const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const pool = require('./db');
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const cookieParser = require('cookie-parser');
const requireAuth = require('./middlewares/requireAuth');

const {
    NODE_ENV = "development",
    PORT = 5000,
    SESS_SECRET = "session secret",
} = process.env;


const printData = async (title = "no title", req, res) => {

    console.log(`---- ${title} ----`);
    console.log({
        "req.session": req?.session,
        "req.sessionID": req?.sessionID,
        "req.session.cookie": req?.session?.cookie,
        "req.cookies": req?.cookies,
        "res.cookie": res?.cookie
    })
}

// Middlewares
app.use(cors({ 
    origin: "http://localhost:3000", 
    credentials: true,
    methods: ['GET', 'PUT'],
    allowedHeaders: ['Content-Type', '*']
}));

app.use(express.json());
app.use(cookieParser());

/*
app.use(async (req, res, next) => {
    printData("Before express-session", req, res);
    next();
})
*/


app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESS_SECRET,
    secure: NODE_ENV === "production",
    store: new pgSession({
        pool: pool,
        tableName: "session"
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 2, // 2 hours
        // sameSite: "none" // Allow the differt origin cookie
    }
}));

/*

app.use((req, res, next) => {
    printData("After express-session", req, res);
    next();
})
*/
app.use("/auth", require("./routes/auth"));



app.get("/session", (req, res) => {

    printData("Server", req, res);

    res.json({
        sessionID: req.sessionID,
        session: req.session,
        cookies: req.cookies
    });

    printData("After response", req, res);

});


app.get("/dashboard", requireAuth, (req, res) => {
    res.json("This is dashboard");
})










app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});