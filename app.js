const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
var xmlparser = require('express-xml-bodyparser');
const app = express();

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Express body parser
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));

// Express XML body parser
app.use(xmlparser({
    normalizeTags: false
}));

//To handle cors errors
app.use(cors());

// For Static files
app.use(express.static("public"));

// Routes
app.use("/", require("./routes/index.js"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    //Initialize MongoDB
    await require("./config/mongo-db.config")()
    console.log(`:::> Server listening on port ${PORT} @ http://localhost:${PORT}`);
});
