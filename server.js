import express from "express";
import dotenv from "dotenv";
import pg from "pg";
import e from "express";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ...(process.env.NODE_ENV === "production"
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {}),
});

app.use(express.static("react-snowpack"));

app.use(express.json());
app.use(cors());

app.get("/api/load/:name", (req, res) => {
  const name = req.params.name;

  let sql = "SELECT * FROM characters WHERE name = $1";

  pool.query(sql, [name]).then((result) => {
    // if (result.rows.length === 0) {
    //   let message = "no player found.";
    //   res.status(404);
    //   res.send(message);
    // } else {
    res.status(200);
    res.send(result.rows);
    //}
  });
});
//
app.patch("/api/save/:name", (req, res) => {
  const name = req.params.name;

  const { player, boss, support } = req.body;

  pool
    .query(
      `UPDATE characters
  SET player = COALESCE($1, player),
  boss = COALESCE($2, boss),
  support = COALESCE($3, support)
  WHERE name = $4
  RETURNING *
  `,
      [player, boss, support, name]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    });
});

app.post("/api/new", (req, res) => {
  let newPlayer = req.body;

  pool
    .query(`SELECT * FROM characters WHERE name = $1`, [newPlayer.name])
    .then((results) => {
      if (results.rows.length !== 0) {
        res.status(400).send();
      } else {
        let sql =
          "INSERT INTO characters (name, player, boss, support) VALUES ($1, $2, $3, $4) RETURNING *";

        pool
          .query(sql, [
            newPlayer.name,
            newPlayer.player,
            newPlayer.boss,
            newPlayer.support,
          ])
          .then((result) => {
            res.status(201).send(results.rows);
          });
      }
    });
});

app.listen(3000, () => {
  console.log("listening on port " + PORT);
});
