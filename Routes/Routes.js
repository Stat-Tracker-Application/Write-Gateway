import express from "express";
import axios from "axios";
import https from "https";
import fs from "fs";
import { globalAgent } from "http";

const router = express.Router();

const userapibasestring = "https://localhost:5000/";
const statapibasestring = "https://localhost:6000/";

const myhttpsagent = new https.Agent({
  ca: fs.readFileSync("./Certificates/intermediate.pem"),
  key: fs.readFileSync("./Certificates/stattrackerapp.test.key"),
  cert: fs.readFileSync("./Certificates/stattrackerapp.test.crt"),
});

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; // I should fix this asap because this is a quick and dirty solution to unable to verify first certificate error.

axios.defaults.httpsAgent = myhttpsagent;
router.all("/userapi", function (req, res) {
  console.log("Sending a request to the user api");
  axios.get(`${userapibasestring}`, { myhttpsagent }).then(function (response) {
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
