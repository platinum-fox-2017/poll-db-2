//your code here
'use strict'
//import sqlite3 module
const sqlite3 = require('sqlite3').verbose()

//create database object
const db = new sqlite3.Database('data.db', (err) => {
    if (err) {
        throw err
    }
    console.log('Connected to data.db SQLite Database')
})

//create table in database object
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Politicians(
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(30),
        party VARCHAR(10),
        location VARCHAR(10),
        grade_current INT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Voters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(30),
        last_name VARCHAR(30),
        gender VARCHAR(12),
        age INTEGER
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS Votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        voterId INTEGER,
        politicianId INTEGER,
        FOREIGN KEY(voterId) REFERENCES Voters(id),
        FOREIGN KEY(politicianId) REFERENCES Politicians(id)
  )`);
  //drop table (if needed)
    // db.run(`DROP TABLE Politicians`);
    // db.run(`DROP TABLE Votes`);
    // db.run(`DROP TABLE Voters`);
})

//close database connection
db.close((err) => {
    if (err) {
        throw err
    }
    console.log('Close the database connection')
})