const dotenv = require('dotenv')

dotenv.config();

const config = {
    db_user: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_dialect: process.env.DB_DIALECT,
    database: process.env.DATABASE,
    db_schema: process.env.DB_SCHEMA,
    node_env: process.env.NODE_ENV,
    ssl: process.env.DB_SSL ? JSON.parse(process.env.DB_SSL) : true,
}
console.log(config)
module.exports = config