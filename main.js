import express from "express";
import mysql from "mysql";

const app = express();
app.use(express.json());

const conn = mysql.createConnection({
  host: "localhost",
  user: "admin_production",
  password: "joe.bals1215~",
  database: "production",
});

conn.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return; // or throw err if you want to terminate the application
  }
  console.log("connected to db");

  app.post("/post", (req, res) => {
    const ps_id = req.body.ps_id;
    const date = req.body.date;
    const pumping_hours = req.body.pumping_hours;
    const motor_production = req.body.motor_production;
    const chlorine_consume = req.body.chlorine_consume;
    const discharge = req.body.discharge;
    const bypass_time = req.body.bypass_time;
    const bypass_cubic_meter = req.body.bypass_cubic_meter;
    const genset_hours = req.body.genset_hours;
    const fuel_consume = req.body.fuel_consume;
    const genset_production = req.body.genset_production;
    const newId = req.body.id;

    conn.query(
      "INSERT INTO pump_data VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        newId,
        ps_id,
        date,
        pumping_hours,
        motor_production,
        chlorine_consume,
        discharge,
        bypass_time,
        bypass_cubic_meter,
        genset_hours,
        fuel_consume,
        genset_production,
      ],
      (err, result) => {
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).send("Error executing query");
        }
        res.send("Pump data successfully posted");
      }
    );
  });

  app.listen(3000, (err) => {
    if (err) {
      console.error("Error starting server:", err);
      return; // or throw err if you want to terminate the application
    }
    console.log("listening on port 3000");
  });
});
