import express from "express";
import axios from "axios";

const router = express.Router();

const userapibasestring = "http://User-Api:5200/";
const statapibasestring = "http://Stat-Api:5100/";

router.all("/", function (req, res) {
  res.send("Hello world from gateway");
});

router.all("/userapi", function (req, res) {
  console.log("Sending a request to the user api");
  axios.get(`${userapibasestring}`).then(function (response) {
    res.json(response.data).send();
  });
});

router.all("/statapi", function (req, res) {
  console.log("Sending a request to the stat api");
  axios.get(`${statapibasestring}`).then(function (response) {
    res.json(response.data).send();
  });
});

export default router;
