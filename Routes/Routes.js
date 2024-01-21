import express from "express";
import axios from "axios";

const router = express.Router();

const statapibasestring = `http://${process.env.STATAPI_URL}/`;
const userapibasestring = `http://${process.env.USERAPI_URL}/`;
const authapibasestring = `http://${process.env.AUTHAPI_URL}/`;

// Authentication middleware
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
function UseRequestBodyForEndpoint(req, res, next) {
  // Use the entire request body as the body for the new request
  req.endpointRequestBody = req.body;

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
  UseRequestBodyForEndpoint,
  function (req, res) {
    console.log("Signing up a user");
    axios
      .post(`${authapibasestring}user/signup`, req.endpointRequestBody)
      .then(() =>
        axios.post(`${userapibasestring}createuser`, req.endpointRequestBody)
      )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
);

router.all(
  "/deleteusersbyusername",
  UseRequestBodyForEndpoint,
  function (req, res) {
    console.log("Deleting users by username");
    axios
      .delete(
        `${userapibasestring}deleteusersbyusername`,
        req.endpointRequestBody.username
      )
      .then(() => {
        return axios.delete(
          `${authapibasestring}user/deleteusersbyusername`,
          req.endpointRequestBody.username
        );
      })
      .then(function (response) {
        res.json(response.data);
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
);

export default router;
