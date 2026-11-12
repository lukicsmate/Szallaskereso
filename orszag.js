import db from "./db.js";
import express from "express";
import mysql from "mysql2/promise";

const orszag = express();
orszag.use(express.json());


orszag.get("/", async (req, res) => {
    const sql = `SELECT varosok.orszag AS orszag_nev, COUNT(szallasok.id) AS szallasok_szama, AVG(szallasok.ertekeles) AS atlag_ertekeles
     FROM varosok
     JOIN szallasok ON varosok.id = szallasok.varos_id 
     GROUP BY varosok.orszag`;
    const [rows] = await db.query(sql);
    res.json(rows);

})
export default orszag;