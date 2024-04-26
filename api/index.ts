const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({ //NEED TO SWITCH TO ENVIRONMENTAL VARIABLES
  user: 'coa_datalabs',
  host: 'coa-final-cluster.cdcmyat6z0fm.us-east-1.redshift.amazonaws.com',
  database: 'dev',
  password: 'CoADashboard#!ATL1',
  port: 5439,
});


app.get('/api/company_page', async (req, res) => {
    try {
      const queryResult = await pool.query(`SELECT name, industries, round, amount, round_valuation_usd, growth_stage, launch_year FROM coadata.master_table_stg`);
      res.json(queryResult.rows); 
    } catch (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Error fetching data'); 
    }
  });
  

async function fetchMetricData(columnName) {
try {
    const queryResult = await pool.query(`SELECT ${columnName} FROM coadata.master_table_stg`);
    return queryResult.rows; 
} catch (err) {
    console.error('Error executing query:', err.stack);
    return 'Error fetching data';
}
}


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



