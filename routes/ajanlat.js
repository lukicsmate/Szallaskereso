import db from "../data/db.js";
import express from "express";
import mysql from "mysql2/promise";

const ajanlat = express();
ajanlat.use(express.json());

ajanlat.get("/", async (req, res) => {
    const varos = req.query.varos;
    const ej = req.query.ej;
    const fo = req.query.fo;

    const sql = `SELECT szallasok.id as szallas_id ,szallasok.nev as szallas_nev, szallasok.csillag as csillag, varosok.nev AS varos, szallasok.ar as ar,varosok.orszag as orszag
     FROM szallasok
      JOIN varosok ON szallasok.varos_id = varosok.id
      WHERE varosok.nev = ? AND szallasok.ar <= ? AND szallasok.max_fo >= ?`;
    const [rows] = await db.query(sql, [varos, ej, fo]);
    res.json(rows);

})
export default ajanlat;