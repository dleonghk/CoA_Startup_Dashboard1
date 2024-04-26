import express from "express";
import { Pool } from "pg";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Interface for Redshift connection configuration
interface RedshiftConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

// Redshift connection pool using environment variables
const pool = new Pool({
  user: "coa_datalabs",
  host: "coa-final-cluster.cdcmyat6z0fm.us-east-1.redshift.amazonaws.com",
  database: "dev",
  password: "CoADashboard#!ATL1",
  port: 5439,
});

// Type for query results
type Row = { [key: string]: string | number };

app.get("/api/company_page", async (req, res) => {
  try {
    const queryResult = await pool.query<Row[]>(
      `SELECT name, industries, round, amount, round_valuation_usd, growth_stage, launch_year FROM coadata.master_table_stg`
    );
    res.json(queryResult.rows);
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.status(500).send("Error fetching data");
  }
});

async function fetchMetricData(columnName: string): Promise<Row[] | string> {
  // Use Promise for asynchronous function return type
  try {
    const queryResult = await pool.query<Row[]>(
      `SELECT ${columnName} FROM coadata.master_table_stg`
    );
    return queryResult.rows;
  } catch (err) {
    console.error("Error executing query:", err.stack);
    return "Error fetching data";
  }
}

const PORT = parseInt(process.env.PORT || "3001");
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
