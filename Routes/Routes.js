import express from "express";
import axios from "axios";

const router = express.Router();

const statapibasestring = `http://${process.env.STATAPI_URL}/`;
const userapibasestring = `http://${process.env.USERAPI_URL}/`;
const authapibasestring = `http://${process.env.AUTHAPI_URL}/`;

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

// Middleware to use the incoming request body as the request body for /authapi/user/signup
function UseRequestBodyForSignup(req, res, next) {
  // Use the entire request body as the body for the new request
  req.signupRequestBody = req.body;

  next();
}

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

router.all("/authapi", function (req, res) {
  console.log("Sending a request to the auth api");
  axios.get(`${authapibasestring}`).then(function (response) {
    res.json(response.data).send();
  });
});

router.all(
  "/authapi/user/signup",
  UseRequestBodyForSignup,
  function (req, res) {
    console.log("Singing up a user");
    axios
      .post(`${authapibasestring}user/signup`, req.signupRequestBody)
      .then(function (response) {
        res.json(response.data);
      });
  }
);

export default router;
