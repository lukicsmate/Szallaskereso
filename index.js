import db from "./data/db.js";
import express from "express";
import mysql from "mysql2/promise";
import szallasok from "./routes/szallasok.js";
import szallasokById from "./routes/szallasokById.js";
import varos from "./routes/varos.js";
import orszag from "./routes/orszag.js";
import ajanlat from "./routes/ajanlat.js";

const app = express();
app.use(express.json());


app.use("/szallasok", szallasok);
app.use(szallasokById);
app.use("/varos", varos);
app.use("/orszagok", orszag);
app.use("/ajanlat", ajanlat);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
