import express from "express";
import axios from "axios";
import https from "https";
import fs from "fs";

const router = express.Router();

const userapibasestring = "https://localhost:5000/";
const statapibasestring = "https://localhost:6000/";

const myhttpsagent = new https.Agent({
  ca: fs.readFileSync("../Certificates/ca.crt"),
  key: fs.readFileSync("./Certs/Gateway.key"),
  cert: fs.readFileSync("./Certs/Gateway.crt"),
});

router.all("/userapi", function (req, res) {
  if (!req.client.authorized) {
    res.writeHead(401);
    return res.end("Invalid client certificate authentication.");
  }
  console.log("Sending a request to the user api");
  axios
    .get(`${userapibasestring}`, { httpsAgent: myhttpsagent })
    .then(function (response) {
      res.send(response.data);
    });
});

router.all("/statapi", function (req, res) {
  console.log("Sending a request to the stat api");
  axios.get(`${statapibasestring}`, { myhttpsagent }).then(function (response) {
    res.send(response.data);
  });
});

export default router;
