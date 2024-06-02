const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const port = 3000;
const bcrypt = require("bcrypt");
const salt = 10;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Manish@123",
  database: "todoapp",
});
db.connect((err) => {
  if (err) throw err;
  console.log("Connected");
});

app.listen(port, () => {
  console.log(`server is running on the port ${port}`);
});

app.get("/", (req, res) => {
  console.log("hello");
  return res.json({ Status: "done" });
});

//register user
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, salt, (err, hash) => {
    if (err) return res.json({ Error: "error in hashing" });
    const sql = "INSERT INTO user (name,email,password) values (?,?,?)";
    db.query(sql, [name, email, hash], (err, data) => {
      if (err) {
        console.log(err);
        return res.json({ Error: "Error in inserting data" });
      }
      return res.json({ Status: "Success" });
    });
  });
});

//login user
app.post("/login", (req, res) => {
  const sql = "select * from user where email=?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ Error: "Login error in server" });
    }
    if (data.length === 0) {
      return res.status(401).json({ Error: "Email or password is incorrect" });
    }
    bcrypt.compare(
      req.body.password.toString(),
      data[0].password,
      (err, response) => {
        if (err) {
          console.error("Password compare error:", err);
          return res
            .status(500)
            .json({ Error: "Password compare error in server" });
        }
        if (response) {
          const name = data[0].name;
          const id = data[0].id;
          const token = jwt.sign({ name, id }, "key", {
            expiresIn: "1d",
          });
          res.cookie("token", token);
          return res.json({ Status: "Success", token });
        } else {
          return res
            .status(401)
            .json({ Error: "Email or password is incorrect" });
        }
      }
    );
  });
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.json({ Error: "You are not authenticated" });
  else {
    jwt.verify(token, "key", (err, decode) => {
      if (err) return res.json({ Error: "Token is not correct" });
      else {
        req.name = decode.name;
        req.id = decode.id;
        next();
      }
    });
  }
};

app.get("/auth", verifyUser, (req, res) => {
  return res.json({ Status: "Success", name: req.name });
});

//logout
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.get("/data", verifyUser, (req, res) => {
  const id = req.id;
  const sql = "select * from task where userId=?";
  db.query(sql, [id], (err, result) => {
    if (err) res.json({ Error: "data not fetched" });
    return res.json({ Status: "Success", tasks: result });
  });
});

app.delete("/delete/:id", (req, res) => {
  // Use app.delete() to handle DELETE requests
  const id = req.params.id;
  const sql = "DELETE FROM task WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Error: "delete err" });
    }
    if (result.affectedRows > 0)
      return res.json({ Status: "Success" }); // Check if rows were affected
    else return res.json({ Error: "Deletion failed" });
  });
});

app.post("/addtask", verifyUser, (req, res) => {
  const id = req.id;
  const task = req.body.task;
  const data = req.body.date;
  console.log(id);
  const sql = "insert into task (taskName,taskDate  ,userId) values (?,?,?)";
  db.query(sql, [task, data, id], (err, result) => {
    console.log(err);
    if (err) return res.json({ Error: "Not added" });
    console.log(result);
    return res.json({ Status: "Success" });
  });
});
// UPDATE `todoapp`.`task` SET `taskName` = 'to hostel', `taskDate` = '2024-03-06' WHERE (`id` = '15');

app.patch("/edit", verifyUser, (req, res) => {
  const id = req.id;
  const sql = "update task set taskName=?  where id=?";
  db.query(sql, [req.body.taskName, req.body.id], (err, result) => {
    if (err) throw err;
    return res.json({ Status: "Success" });
  });
});
