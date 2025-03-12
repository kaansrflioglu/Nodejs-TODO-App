const express = require("express");
const os = require('os');
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const todosRouter = require("./routes/todos");
const getLocalIP = require('./utils/network');


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use("/todos", todosRouter);

app.get("/", (req, res) => {
    res.render("home", {
        currentRoute: req.path
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        currentRoute: req.path
    });
});


const PORT = 1111;

const computerIP = getLocalIP();
app.listen(PORT, '0.0.0.0', () => {
    console.log(`The server is running at http://${computerIP}:${PORT} on all network interfaces.`);
});