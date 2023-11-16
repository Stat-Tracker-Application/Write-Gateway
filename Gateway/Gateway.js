import express from "express";
import https from "https";
import http from "http";
import bodyparser from "body-parser";
import fs from "fs";

import routes from "../Routes/Routes.js";

const port = process.env.PORT || 4000;

const gateway = express();

gateway.use(bodyparser.urlencoded({ extended: false }));
gateway.use(bodyparser.json());
gateway.use("/", routes);

const options = {
  requestCert: false,
  rejectUnauthorized: false,
  ca: fs.readFileSync("./Certs/ca.crt"),
  key: fs.readFileSync("./Certs/localhost.key"),
  cert: fs.readFileSync("./Certs/localhost.crt"),
};
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //dirty fix as discussed
const server = http.createServer(options, gateway);

server.listen(port, function (req, res) {
  console.log(`Gateway listening on ${port}`);
});
