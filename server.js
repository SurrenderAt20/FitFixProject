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

app.post("/api/saveWorkout", (req, res) => {
  const { exercises, name } = req.body;
  const exerciseString = JSON.stringify(exercises);

  // insert the workout into the database
  connection.query(
    "INSERT INTO workout_programs (name, exercises) VALUES (?, ?)",
    [name, exerciseString],
    (error, results) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      } else {
        console.log("Workout created!");
        res.sendStatus(200);
      }
    }
  );
});

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

//Function

function getData(callback) {
  connection.query("SELECT * FROM exercises", (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function getWorkout(callback) {
  connection.query("SELECT * FROM workout_programs", (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

//GET

app.get("/api/workout/:id", (req, res) => {
  const workoutId = req.params.id;

  connection.query(
    "SELECT * FROM workout_programs WHERE id = ?",
    [workoutId],
    (error, results) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      } else {
        res.send(results[0]);
      }
    }
  );
});

app.get("/api/getWorkout", (req, res) => {
  connection.query("SELECT * FROM workout_programs", (error, results) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      const workouts = results.map((workout) => {
        return {
          ...workout,
          exercises: JSON.parse(workout.exercises),
        };
      });
      res.send(workouts);
    }
  });
});

app.get("/api/data", (req, res) => {
  getData((error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(data);
    }
  });
});

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
