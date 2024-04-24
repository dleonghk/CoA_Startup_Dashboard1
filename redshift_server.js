const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({ //NEED TO SWITCH TO ENVIRONMENTAL VARIABLES
  user: process.env.REDSHIFT_USER,
  host: process.env.REDSHIFT_HOST,
  database: process.env.REDSHIFT_DATABASE,
  password: process.env.REDSHIFT_PASSWORD,
  port: process.env.REDSHIFT_PORT,
});


app.get('/api/startupsByYear', async (req, res) => {
    try {
        const queryResult = await pool.query(`
            SELECT founded_year AS year, COUNT(*) AS startups 
            FROM startups 
            GROUP BY founded_year 
            ORDER BY founded_year;
        `);
        res.json(queryResult.rows.map(row => ({
            year: row.year,
            startups: parseInt(row.startups)
        })));
    } catch (error) {
        console.error('Error fetching startups by year:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/api/ecosystemValue', async (req, res) => {
    const result = await fetchMetricData('current_company_valuation');
    res.send(result);
  });

  app.get('/api/fundingRounds', async (req, res) => {
    const result = await fetchMetricData('total_rounds_number');
    res.send(result);
  });

  app.get('/api/totalFunding', async (req, res) => {
    const result = await fetchMetricData('amount_raised_this_round_usdm');
    res.send(result);
  });
  
//   app.get('/api/number_of_startups', async (req, res) => {
//     const result = await fetchMetricData('funding_rounds_column');
//     res.send(result);
//   });
  
//   app.get('/api/minority_founded_startups', async (req, res) => {
//     const result = await fetchMetricData('ecosystem_value_column');
//     res.send(result);
//   });
  
  app.get('/api/type_of_startup', async (req, res) => {
    const result = await fetchMetricData('industries');
    res.send(result);
  });
  
  app.get('/api/amountRaised', async (req, res) => {
    const result = await fetchMetricData('amount_raised_this_round_usdm');
    res.send(result);
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



