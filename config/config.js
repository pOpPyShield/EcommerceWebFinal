const fs = require('fs')
require("dotenv").config();
module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_WORKING,
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: process.env.DB_PORT,
        migrationStorage: process.env.DB_MIGRATIONSTORAGE,
        migrationStoragePath: process.env.DB_MIGRATIONSTORAGEPATH,
        migrationStorageTableName: process.env.DB_MIGRATIONSTORAGETABLENAME,
        migrationStorageTableSchema: process.env.DB_MIGRATIONSTORAGETABLESCHEMA,
        seederStorage: process.env.DB_SEEDERSTORAGE,
        seederStoragePath: process.env.DB_SEEDERSTORAGEPATH,
        seederStorageTableName: process.env.DB_SEEDERSTORAGETABLENAME
    }
}