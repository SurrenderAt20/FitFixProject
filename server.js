const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const connectionDetails = require("./database");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});

app.use(express.json());

app.use(cors());

const connection = mysql2.createConnection(connectionDetails);

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database: " + error.stack);
    return;
  }
  console.log("Connected to the database as id " + connection.threadId);
});

app.post(
  "/signup",
  [
    check("firstname")
      .isLength({ min: 2 })
      .withMessage("Name must be longer than 2 characters"),
    check("lastname")
      .isLength({ min: 2 })
      .withMessage("Name must be longer than 2 characters"),
    check("email").isEmail().withMessage("Please enter a valid email"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ],
  async (req, res) => {
    // Validate the request body
    console.log(`Password: ${req.body.password}`);
    console.log(`Confirm Password: ${req.body.confirmPassword}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure the request body
    const { firstname, lastname, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Define the query string and values array
    const query =
      "INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)";
    const values = [firstname, lastname, email, hashedPassword];

    // Execute the query and handle the results
    connection.query(query, values, (error, result) => {
      if (error) {
        console.error("Error inserting user into database: ", error);
        return res.status(500).send("Error inserting user into database");
      }
      console.log("Inserted user into database with ID: ", result.insertId);

      const secretOrPrivateKey = "copenhagen";

      // Generate a JWT with the user ID as the payload
      const token = jwt.sign({ userId: result.insertId }, secretOrPrivateKey, {
        expiresIn: "1h",
      });

      // Send the JWT to the client
      res.status(201).json({ token });
    });
  }
);

app.post(
  "/login",
  async (req, res, next) => {
    // Check for the presence of a JWT in the Authorization header
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }

    // Verify the JWT and decode the payload
    try {
      const decoded = jwtDecode(token);

      // Check if the JWT has expired
      if (decoded.exp < Date.now() / 1000) {
        return res.status(401).send("Token has expired");
      }

      req.user = decoded;
      next();
    } catch (error) {
      return res.status(400).send("Invalid token");
    }
  },
  [
    check("email").isEmail().withMessage("Please enter a valid email"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Please enter a valid password"),
  ],
  async (req, res) => {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure the request body
    const { email, password } = req.body;

    // Define the query string
    const query = "SELECT * FROM users WHERE email = ?";

    // Execute the query and handle the results
    connection.query(query, [email], async (error, results) => {
      if (error) {
        console.error("Error fetching user from database: ", error);
        return res.status(500).send("Error fetching user from database");
      }
      if (results.length === 0) {
        return res.status(401).send("Invalid email or password");
      }

      // Compare the provided password with the hashed password in the database
      const validPassword = await bcrypt.compare(password, results[0].password);
      if (!validPassword) {
        return res.status(401).send("Invalid email or password");
      }

      // If the email and password are correct, generate a new JWT and send it to the client
      const secretOrPrivateKey = "copenhagen";
      const newToken = jwt.sign({ userId: results[0].id }, secretOrPrivateKey, {
        expiresIn: "1h",
      });
      res.json({ token: newToken });
    });
  }
);
