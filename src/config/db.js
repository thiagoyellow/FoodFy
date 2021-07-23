const { Pool } = require("pg")

module.exports = new Pool({
    user: 'postgres',
    password: "1904",
    host: "localhost",
    port: 5432,
    database: "foodfy"
})