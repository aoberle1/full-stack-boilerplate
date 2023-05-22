const pg = require('pg');

const pool = new pg.Pool({
    database: 'database-name-here', 
    host: 'localhost',
    port: 5432
});

module.exports = pool;