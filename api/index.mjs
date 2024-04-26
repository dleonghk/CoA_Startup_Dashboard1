import express from "express";
import { Pool } from "pg";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "coa_datalabs",
  host: "coa-final-cluster.cdcmyat6z0fm.us-east-1.redshift.amazonaws.com",
  database: "dev",
  password: "CoADashboard#!ATL1",
  port: 5439,
});

app.get("/api/company_page", async (req, res) => {
  try {
    const queryResult = await pool.query(
      `SELECT name, industries, round, amount, round_valuation_usd, growth_stage, launch_year FROM coadata.master_table_stg`
    );
    res.json(queryResult.rows);
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${PORT}`);
});
