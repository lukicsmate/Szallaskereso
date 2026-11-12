import db from "../data/db.js";
import express from "express";
import mysql from "mysql2/promise";

const ajanlat = express();
ajanlat.use(express.json());

ajanlat.get("/", async (req, res) => {
    const varos = req.query.varos;
    const ej = req.query.ej;
    const fo = req.query.fo;

    const sql = `SELECT
     varosok.nev as varos,
     szallasok.csillag as csillag,
     szallasok.ar as arFoEj,
     (szallasok.ar * ? * ?) as osszesen
     FROM szallasok
      JOIN varosok ON szallasok.varos_id = varosok.id
      WHERE varosok.nev = ?
      `;
    const [ajanlatok] = await db.query(sql,[ej,fo,varos]);
    console.log(ajanlatok)

    res.json({varos:varos,ej:ej,fo:fo,ajanlatok});

})
export default ajanlat;