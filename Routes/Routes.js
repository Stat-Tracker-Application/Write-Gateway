import express from "express";
import axios from "axios";

const router = express.Router();

const userapibasestring = "http://User-Api:5200/";
const statapibasestring = "http://Stat-Api:5100/";
const authapibasestring = "http://Auth-Api:5300/";

//Authentictaion middleware
async function AuthenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) res.sendStatus(401);

  try {
    const response = await axios.get(`${authapibasestring}authenticatetoken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    req.user = response.data;
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(401);
  }
}

router.all("/", function (req, res) {
  res.send("Hello world from gateway");
});

router.all("/userapi", AuthenticateToken, function (req, res) {
  console.log("Sending a request to the user api");
  axios.get(`${userapibasestring}`).then(function (response) {
    res.json(response.data).send();
  });
});

router.all("/statapi", AuthenticateToken, function (req, res) {
  console.log("Sending a request to the stat api");
  axios.get(`${statapibasestring}`).then(function (response) {
    res.json(response.data).send();
  });
});

export default router;
