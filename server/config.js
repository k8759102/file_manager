const COOKIE_SECRET =
  process.env.COOKIE_SECRET || "T7TKJA99QLM9KR0TRCAXL90NHBDRJMFN";
const JWT_SECRET = process.env.JWT_SECRET || "BVA5D4TR7ZIKZ4256PZ5WMZY0FF9JO5X";
const AES_SECRET = process.env.AES_SECRET || "5DSDN6A9JGCJZHKJGOFA1FUT4GJYUPJA";

const DB_TYPE = process.env.DB_TYPE || "mysql";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 3306;
const DB_USER = process.env.DB_USER || "root";
const DB_PASS = process.env.DB_PW || "root";
const DB_TARGET = process.env.DB_DB || "filemanager";

const PORT = process.env.PORT || 3000;
const APP_URL = `http://localhost:${PORT}`;
const MAX_SESSION_MIN = 180;

const config = {
  COOKIE_SECRET,
  JWT_SECRET,
  AES_SECRET,

  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_TARGET,

  PORT,
  APP_URL,
  MAX_SESSION_MIN,
};

module.exports = config;
