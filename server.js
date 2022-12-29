const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const connectionDetails = require("./database");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const session = require("express-session");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});

app.use(express.json());
app.use(cors());

// Set up server-side sessions
app.use(
  session({
    secret: "copenhagen",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

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
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password } = req.body;

    const query = "SELECT *  FROM users WHERE email = ?";
    const values = [email];
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error("Error checking for an existing email: ", error);
        return res.status(500).send("Error checking for existing email");
      }
      if (results.length > 0) {
        return res.status(400).send("Email already in use");
      }
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { firstname, lastname, email, password: hashedPassword };

    const insertQuery =
      "INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)";
    const insertValues = [firstname, lastname, email, hashedPassword];
    connection.query(insertQuery, insertValues, (error, result) => {
      if (error) {
        console.log("Error inserting user into database ", error);
        return res.status(500).send("Error inserting user into database");
      }

      req.session.user = newUser;

      req.status(201).send("User successfully signed up");
    });
  }
);

app.post(
  "/login",
  async (req, res, next) => {
    // Check for the presence of a JWT in the Authorization header
    const token = req.headers.authorization;
    if (!token) {
      console.log("no token provided");
      return res.status(401).send("Access denied. No token provided.");
    }

    // Verify the JWT and decode the payload
    try {
      const decoded = jwtDecode(token);

      // Check if the JWT has expired
      if (decoded.exp < Date.now() / 1000) {
        console.log("expired token");
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
        console.error("Error invalid email or pass: ", error);
        return res.status(401).send("Invalid email or password");
      }

      // Compare the provided password with the hashed password in the database
      const validPassword = await bcrypt.compare(password, results[0].password);
      if (!validPassword) {
        console.log("issues comparing hash and pwd");
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

app.post("/logout", (req, res) => {
  // Clear the user's JWT from the session
  req.session.jwt = null;

  // Send a response indicating that the user has been logged out
  res.send({ success: true });
});

app.use((req, res, next) => {
  // Check for the presence of a JWT in the Authorization header
  const token = req.headers.authorization;
  if (!token) {
    console.log("no token provided");
    return res.status(401).send("Access denied. No token provided.");
  }

  // Extract the JWT token
  const bearer = token.split(" ");
  const bearerToken = bearer[1];

  // Verify the JWT and decode the payload
  try {
    const decoded = jwtDecode(bearerToken);

    // Check if the JWT has expired
    if (decoded.exp < Date.now() / 1000) {
      console.log("expired token");
      return res.status(401).send("Token has expired");
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
});

app.use("/protected", (req, res, next) => {
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

    // If the JWT is valid, pass the decoded payload to the next middleware function
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
});

app.get("/protected", (req, res) => {
  // The req.user object contains the user information extracted from the JWT
  return res.send(`Welcome, ${req.user.name}`);
});

app.post("/verify", async (req, res) => {
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

    // If the JWT is still valid, generate a new JWT with a refreshed expiration time
    const secretOrPrivateKey = "copenhagen";
    const newToken = jwt.sign({ userId: decoded.userId }, secretOrPrivateKey, {
      expiresIn: "1h",
    });

    // Send the new JWT to the client
    res.status(200).json({ token: newToken });
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
});
