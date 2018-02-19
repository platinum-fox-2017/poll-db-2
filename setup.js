var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll.db');

db.run(`CREATE TABLE IF NOT EXISTS Politicians (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	party TEXT NOT NULL,
	location TEXT NOT NULL,
	grade_current REAL NOT NULL)`);

db.run(`CREATE TABLE IF NOT EXISTS Voters (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	gender TEXT NOT NULL,
	age INTEGER NOT NULL
)`)

db.run(`CREATE TABLE IF NOT EXISTS Votes (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	voterId INTEGER,
	politicianId INTEGER,
	FOREIGN KEY (voterId) REFERENCES Voters(id),
	FOREIGN KEY (politicianId) REFERENCES Politicians(id)
)`)

db.close();