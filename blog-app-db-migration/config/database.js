const config = require('./config');

const development = {
  username: config.db_user,
  password: config.db_password,
  database: config.database,
  host: config.db_host,
  port: config.db_port,
  dialect: config.db_dialect,
  migrationStorageTableSchema: config.db_schema,
  seederStorageTableSchema: config.db_schema,
  schema: config.db_schema,
  searchPath: config.db_schema,
  dialectOptions: {
    prependSearchPath: true,
  },
};

const production = {
  username: config.db_user,
  password: config.db_password,
  database: config.database,
  host: config.db_host,
  port: config.db_port,
  dialect: config.db_dialect,
  migrationStorageTableSchema: config.db_schema,
  seederStorageTableSchema: config.db_schema,
  schema: config.db_schema,
  searchPath: config.db_schema,
  dialectOptions: {
    prependSearchPath: true,
  },
};

if (config.ssl) {
  development.dialectOptions.ssl = {
    require: true,
    rejectUnauthorized: false,
  };

  production.dialectOptions.ssl = {
    require: true,
    rejectUnauthorized: false,
  };
}

module.exports = {
    development,
    production
}