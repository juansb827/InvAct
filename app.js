const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const morgan = require('morgan')
const crypto = require("crypto");

const app = express();

app.use(function requestId(req, res, next) {
  req.id = crypto.randomBytes(16).toString("hex");
  next();
})

morgan.token('id', function (req) {
  return req.id
})

app.use(morgan('--> :id [:date] :remote-addr :remote-user ":method :url HTTP/:http-version"', {
  immediate: true
  
}))
app.use(morgan('<-- :id [:date] :status :res[content-length]', {
  immediate: false  
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization,x-access-token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
    return res.status(200).json({});
  }
  next();
});

//sets up the router
app.use("/", require("./routes/index"));

//catch 404 and forward to error handler  middleware
app.use(function(req, res, next) {
  next(new Error("The given url does not match any route"));
});

//error handler middleware
app.use(function(err, req, res, next) {
  /* We log the error internaly */

  /* Finaly respond to the request */
  res.status(500).json({ error: err.message });
});

const port = process.env.PORT || process.env.NODE_PORT || 8080;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully to the database.");
  })
  .catch(err => {
    console.error("Unable to connect to the database", err);    
    process.exit();
  })
  .then(() => {
    app.listen(port, 'localhost', () => {
      console.info("[SERVER] Listening on port " + port);
    });
  })
  
