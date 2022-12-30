const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const connectionDetails = require("./database");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { check, validationResult } = require("express-validator");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressJSON = require("express-json");
const session = require("express-session");

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(expressJSON());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    key: "userId",
    secret: "copenhagen",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
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

    const insertQuery =
      "INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)";
    const insertValues = [firstname, lastname, email, hashedPassword];
    connection.query(insertQuery, insertValues, (error, result) => {
      if (error) {
        console.log("Error inserting user into database ", error);
        return res.status(500).send("Error inserting user into database");
      }
      res.send({ message: "User successfully signed up" });
    });
  }
);

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM users WHERE email = ?;",
    email,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
            console.log("user logged in!");
          } else {
            res.send({ message: "Wrong email/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

app.post("/logout", (req, res) => {
  res.clearCookie("auth");
});

//GET

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.get("/protected", (req, res) => {
  if (req.cookies.auth) {
    // User is authenticated
  } else {
    // User is not authenticated
  }
});

/* const express = require("express");
const app = express();
const { check, validationResult } = require("express-validator");
const cors = require("cors");
const mysql2 = require("mysql2");
const connectionDetails = require("./database");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
}); */

/* app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

//Connection
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

    /* const newUser = { firstname, lastname, email, password: hashedPassword }; */

/* const insertQuery =
      "INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)";
    const insertValues = [firstname, lastname, email, hashedPassword];
    connection.query(insertQuery, insertValues, (error, result) => {
      if (error) {
        console.log("Error inserting user into database ", error);
        return res.status(500).send("Error inserting user into database");
      }

      // Once the user has been successfully created, you can set a cookie to store their authenticated status
      res.cookie("authenticated", true);
      console.log(req.cookies.authenticated); // Log the value of the authenticated cookie

      res.send({ message: "User successfully signed up" });
      console.log(req.cookies); // Log the value of the cookies object
    });
  }
); */

/* app.post(
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

    // Set a cookie on the client's computer to store the user's authenticated status
    res.cookie("authenticated", true);

    // Send a success response to the client
    res.send("User successfully logged in");
  }
);
 */
/* app.post("/logout", (req, res) => {
  // Clear the authenticated cookie
  res.clearCookie("authenticated");

  // Send a success response to the client
  res.send("User successfully logged out");
});

//GET

app.get("/protected", (req, res) => {
  if (req.cookies.authenticated === true) {
    // The user is authenticated, allow the request to proceed
    // ...
  } else {
    // The user is not authenticated, send a 401 response
    res.status(401).send("Access denied");
  }
}); */
