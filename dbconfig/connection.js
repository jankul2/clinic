import dotenv from 'dotenv';
import createError from 'http-errors';
import path from 'path';
import mysql from 'mysql2';
dotenv.config();
class Connection {
    constructor() {
        console.log(process.env.host,process.env.password,process.env.user,process.env.database);
        this.conn = mysql.createPool({
            host: process.env.host,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

    }

}

const dbconnection = new Connection();

export default Connection;
