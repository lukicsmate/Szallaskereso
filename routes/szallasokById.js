import db from "../data/db.js";
import express from "express";
import mysql from "mysql2/promise";

const szallasokById = express();
szallasokById.use(express.json());


szallasokById.get("/szallasok/:id", async (req, res) => {
    const [id] = req.params.id;
    const sql = `SELECT szallasok.id as szallas_id ,szallasok.nev as szallas_nev, szallasok.csillag as csillag, varosok.nev AS varos, szallasok.ar as ar,varosok.orszag as orszag FROM szallasok JOIN varosok ON szallasok.varos_id = varosok.id WHERE szallasok.id = ?`;
    const [rows] = await db.query(sql, [id]);
    res.json(rows[0]);

})
export default szallasokById;