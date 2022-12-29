const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const connectionDetails = require("./database");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const cors = require("cors");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});

app.use(express.json());
app.use(cors());

const sessionStore = new MySQLStore(connectionDetails);

// Set up server-side sessions
app.use(
  session({
    secret: "copenhagen",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

//Connection
const connection = mysql2.createConnection(connectionDetails);
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database: " + error.stack);
    return;
  }
  console.log("Connected to the database as id " + connection.threadId);
});

//GET routes

app.get("/exercises", (req, res) => {
  const html = renderToString(<Exercises req={req} />);
  res.send(html);
});

app.get("/isLoggedIn", (req, res) => {
  // Check if the user has an active session
  if (req.session.user) {
    res.status(200).send({ isLoggedIn: true });
  } else {
    res.status(200).send({ isLoggedIn: false });
  }
});

app.get("/api/session", (req, res) => {
  // Check if the user is logged in
  if (req.session.user) {
    // If the user is logged in, send a success response with the user object
    res.status(200).send({ success: true, user: req.session.user });
  } else {
    // If the user is not logged in, send a failed response
    res.status(401).send({ success: false });
  }
});

app.post(
  "/login",
  [
    check("email").isEmail().withMessage("Please enter a valid email"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  async (req, res) => {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure the request body
    const { email, password } = req.body;

    // Query the database to find the user with the provided email
    const query = "SELECT * FROM users WHERE email = ?";
    const values = [email];
    const [user] = await connection.query(query, values);

    // If no user was found, return an error response
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the passwords do not match, return an error response
    if (!passwordMatch) {
      return res.status(401).send("Invalid email or password");
    }

    // Store the user object in the session data
    req.session.user = user;

    // Send a success response to the client
    res.send("User successfully logged in");
  }
);

app.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Error destroying session: ", error);
      return res.status(500).send("Error destroying session");
    }
    res.redirect("/login");
  });
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

      res.status(201).send({ message: "User successfully signed up" });
    });
  }
);
