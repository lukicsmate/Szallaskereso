import db from "../data/db.js";
import express from "express";
import mysql from "mysql2/promise";

const varos = express();
varos.use(express.json());

varos.get("/", async (req, res) => {
    const minSzallas = req.query.minSzallas;
    if (!minSzallas) {
        const sql = `SELECT varosok.id,varosok.nev AS nev,varosok.orszag AS orszag,COUNT(szallasok.id) AS szallasDB,
        AVG(szallasok.ar) AS atlag_ar,MIN(szallasok.ar) AS legolcsobb_szallas
        FROM varosok 
        JOIN szallasok ON varosok.id = szallasok.varos_id 
        GROUP BY varosok.id
        ORDER BY varosok.nev ASC`;
        const [rows] = await db.query(sql);
        return res.json(rows);
    } 
    else 
    {
        const sql = `SELECT varosok.id,varosok.nev AS nev,varosok.orszag AS orszag,COUNT(szallasok.id) AS szallasDB,
        AVG(szallasok.ar) AS atlag_ar,MIN(szallasok.ar) AS legolcsobb_szallas
        FROM varosok 
        JOIN szallasok ON varosok.id = szallasok.varos_id 
        GROUP BY varosok.id
        HAVING COUNT(szallasok.id) >= ?
        ORDER BY varosok.nev ASC`;
        const [rows] = await db.query(sql, [minSzallas]);
        return res.json(rows);
    }

})

varos.get("/:id/szallasok", async (req, res) => {
    const [id] = req.params.id;
    const checkID = `SELECT * FROM varosok WHERE id = ?`;
    const [checkRows] = await db.query(checkID, [id]);
    if (checkRows.length === 0) {
        return res.status(404).json({ error: "Nincs ilyen város az adatbázisban!" });
    }
    const sql = `SELECT varosok.nev AS varos_nev,varosok.orszag AS orszag,COUNT(szallasok.id) AS szallasok_szama,AVG(szallasok.ar) AS atlag_ar FROM varosok JOIN szallasok ON varosok.id = szallasok.varos_id GROUP BY varosok.id HAVING varosok.id = ?`;
    const [rows] = await db.query(sql, [id]);
    if (rows.length === 0) {
        return res.status(404).json({ error: "Nincs szállás az adott városban!" });
    }
    return res.json(rows);


})


export default varos;