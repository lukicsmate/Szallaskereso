import db from "../data/db.js";
import express from "express";
import mysql from "mysql2/promise";

const szallasok = express();
szallasok.use(express.json());

szallasok.get("/", async (req, res) => {
    const varos = req.query.varos;
    const minCsillag = req.query.minCsillag;
    const maxAr = req.query.maxAr;
    const medencereq = req.query.medence;
    const medence = medencereq === 'igen' ? true : medencereq === 'nem' ? false : undefined;
    if(medence === undefined && medencereq !== undefined) {
        return res.status(400).json({ error: "A medence paraméternek 'igen' vagy 'nem' értéket kell megadni." });
    }

    if (6 < minCsillag || minCsillag < 0) {
        return res.status(400).json({ error: "A minCsillag paraméternek 1 és 5 közötti számot kell megadni." });
    }
    const sql = `SELECT * FROM szallasok JOIN varosok ON szallasok.varos_id = varosok.id ORDER BY ar ASC`;
    const [rows] = await db.query(sql);

    console.log(rows);
    const eredmeny = rows.filter(szallas => 
        (!varos || szallas.varos === varos) &&
        (!minCsillag || szallas.csillag >= minCsillag) &&
        (!maxAr || szallas.ar <= maxAr) &&
        (medence === undefined || szallas.medence == medence));
    res.json(eredmeny);
})
export default szallasok;