// Import SQLite3 Modul
const sqlite3 = require('sqlite3').verbose();

// Database Object
let db = new sqlite3.Database('poll.db')

db.serialize(()=>{
    db.run(`CREATE TABLE IF NOT EXISTS Voters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR (50),
        last_name VARCHAR (50),
        gender VARCHAR (10),
        age integer NOT NULL
    ); `)

    db.run(`CREATE TABLE IF NOT EXISTS Politicians (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR (50),
        party VARCHAR (50),
        location VARCHAR (50),
        grade_current INTEGER NOT NULL
    );`)

    db.run(`CREATE TABLE IF NOT EXISTS Votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        voterId INTEGER,
        politicianId INTEGER
    );`)
})

db.close()