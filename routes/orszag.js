import db from "../data/db.js";
import express from "express";
import mysql from "mysql2/promise";

const orszag = express();
orszag.use(express.json());


orszag.get("/", async (req, res) => {
    const sql = `SELECT varosok.orszag AS orszag, COUNT(varosok.id) AS varosDb, COUNT(szallasok.id) as szallasDB,AVG(szallasok.ertekeles) AS atlagErtekeles
     FROM varosok
     JOIN szallasok ON varosok.id = szallasok.varos_id 
     GROUP BY varosok.orszag`;
    const [rows] = await db.query(sql);
    res.json(rows);

})
export default orszag;