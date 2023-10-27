import express from "express";
import https from "https";
import bodyparser from "body-parser";
import fs from "fs";

import routes from "../Routes/Routes.js";

const port = process.env.PORT || 4000;

const gateway = express();

gateway.use(bodyparser.urlencoded({ extended: false }));
gateway.use(bodyparser.json());
gateway.use("/", routes);

const options = {
  requestCert: true,
  rejectUnauthorized: false,
  ca: fs.readFileSync("../Certificates/ca.crt"),
  key: fs.readFileSync("../Certificates/server.key"),
  cert: fs.readFileSync("../Certificates/server.crt"),
};
const server = https.createServer(options, gateway);

server.listen(port, function (req, res) {
  console.log(`Gateway listening on ${port}`);
});
