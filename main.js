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
    //#region req.body.forEach
    req.body.forEach((el) => {
      const ps_id = el.ps_id;
      const date = el.date;
      const pumping_hours = el.pumping_hours;
      const motor_production = el.motor_production;
      const chlorine_consume = el.chlorine_consume;
      const discharge = el.discharge;
      const bypass_time = el.bypass_time;
      const bypass_cubic_meter = el.bypass_cubic_meter;
      const genset_hours = el.genset_hours;
      const fuel_consume = el.fuel_consume;
      const genset_production = el.genset_production;
      const newId = el.id;

      //#region conn.query
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
          // res.send("Pump data successfully posted"); //original position
        }
      );
      //#endregion
    });

    res.send("Pump data successfully posted");

    //#endregion
  });

  //#region listen to port 3000
  app.listen(3000, (err) => {
    if (err) {
      console.error("Error starting server:", err);
      return; // or throw err if you want to terminate the application
    }
    console.log("listening on port 3000");
  });
  //#endregion
});
