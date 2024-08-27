// Requires
require("dotenv").config();
const fs = require("fs");
const cors = require("cors");
const express = require("express");
const app = express();

// Vars
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) console.log(err);
    if (data) {
      const parsedData = JSON.parse(data);
      let userData = parsedData["users"].map(({ password, ...reset }) => reset);
      res.status(200).json({
        data: userData,
      });
    }
  });
});

app.get("/:id", (req, res) => {
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) console.log(err);
    if (data) {
      const parsedData = JSON.parse(data);
      let userData = parsedData["users"].map(({ password, ...reset }) => reset);
      const id = req.params.id;
      const user = userData.filter((x) => x.id == id);
      res.status(200).json({
        data: user,
      });
    }
  });
});

app.post("/", (req, res) => {
  const { name, email, password } = req.body;
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) console.log(err);
    if (data) {
      const parsedData = JSON.parse(data);
      const last_id = parsedData["last_id"] + 1;
      let users = parsedData["users"];
      users.push({
        id: last_id,
        name,
        email,
        password,
      });
      fs.writeFile(
        "database.json",
        JSON.stringify({
          users,
          last_id,
        }),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            res.status(201).json({ msg: "User has been added" });
          }
        }
      );
    }
  });
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  fs.readFile("database.json", "utf-8", (err, data) => {
    if (err) res.status(404).json({ Msg: err });
    if (data) {
      let parsedData = JSON.parse(data);
      let last_id = parsedData["last_id"];
      let users = parsedData["users"].map((x) => {
        if (x.id == id) {
          return { ...x, name, email };
        }
        return x;
      });
      fs.writeFile(
        "database.json",
        JSON.stringify({ users, last_id }),
        (err) => {
          if (err) {
            res.status(404).json({ Msg: err });
          } else {
            res.status(200).json({ updated: users });
          }
        }
      );
    }
  });
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) console.log(err);
    if (data) {
      const parsedData = JSON.parse(data);
      const users = parsedData["users"].filter((x) => x.id != id);
      const last_id = parsedData["last_id"];
      fs.writeFile(
        "database.json",
        JSON.stringify({
          users,
          last_id,
        }),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({
              data: users,
            });
          }
        }
      );
    }
  });
});

// Server
app.listen(port, () => console.log(`Server is running on port ${port}`));
