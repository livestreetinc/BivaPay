const express = require("express");
const cors = require("cors");
//PORT
const port = process.env.PORT || 8080;
//const body_parser = require('body-parser');
// Initializing server http
const { createServer } = require("http");

//initializing app ---------------------
const app = express();
//creating http server
const httpServer = createServer(app);
//
const payRoute = require("./routes/pay");

//Middlewares
app.use(cors());
app.use(express.json());
//app.use(body_parser.json());

//Routes Middlewares
app.use("/api/process-payments", payRoute);

//listening to requests
httpServer.listen(port, () =>
  console.log(`Payment Server is up and running at PORT ${port}`)
);
