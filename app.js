const mysql = require("mysql");
const express = require("express");
const cors = require("cors");

//CREATE CONNECTION

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password123",
  database: "stores"
});
//CONNECT

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("MYSQL DB CONNECTED...");
});

const app = express();
app.use(cors());

const PORT = "5500";

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}...`);
});

//GET REQUEST TO SHOW DB IN JSON

app.get("/getDB", (req, res) => {
  let sql = "SELECT * FROM storeLocation";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});

//ADDING A NEW STORE LOCATION STORENAME AND ADDRESS MUST BE STRINGS OR DB WILL THROWW AN ERROR
app.get("/getDB/add", (req, res) => {
  const { storeName, storeAddress, latitude, longitude } = req.query;
  const INSERT_STORELOCATION_QUERY = `INSERT INTO storeLocation (storeName, storeAddress, latitude, longitude) VALUES('${storeName}', '${storeAddress}', ${latitude}, ${longitude})`;
  db.query(INSERT_STORELOCATION_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("STORE LOCATION SUCCESSFULLY ADDED....");
    }
  });
});
