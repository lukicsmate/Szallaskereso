import db from "./db.js";
import express from "express";
import mysql from "mysql2/promise";
import szallasok from "./szallasok.js";
import szallasokById from "./szallasokById.js";
import varos from "./varos.js";
import orszag from "./orszag.js";
import ajanlat from "./ajanlat.js";

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
