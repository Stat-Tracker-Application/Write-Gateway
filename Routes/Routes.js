import express from "express";
import axios from "axios";
// import https from "https";
// import fs from "fs";
import {
  createProxyMiddleware,
  Filter,
  Options,
  RequestHandler,
} from "http-proxy-middleware";

const router = express.Router();

// const userapibasestring = "https://localhost:5000/";
// const statapibasestring = "https://localhost:6000/";

const userapibasestring = "http://localhost:5000/";
const statapibasestring = "http://localhost:6000/";

// const myhttpsagent = new https.Agent({
//   ca: fs.readFileSync("./Certs/ca.crt"),
//   key: fs.readFileSync("./Certs/localhost.key"),
//   cert: fs.readFileSync("./Certs/localhost.crt"),
// });

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //dirty fix as discussed to get around the cert issues

router.all("/userapi", function (req, res) {
  // if (!req.client.authorized) {
  //   res.writeHead(401);
  //   return res.end("Invalid client certificate authentication.");
  // }
  console.log("Sending a request to the user api");
  axios.get(`${userapibasestring}`).then(function (response) {
    res.json(response.data).send();
  });
});

router.all("/statapi", function (req, res) {
  // if (!req.client.authorized) {
  //   res.writeHead(401);
  //   return res.end("Invalid client certificate authentication.");
  // }
  console.log("Sending a request to the stat api");
  axios.get(`${statapibasestring}`).then(function (response) {
    res.json(response.data).send();
  });
});

router.all("/", function (req, res) {
  res.send("Hello world from gateway");
});

export default router;
