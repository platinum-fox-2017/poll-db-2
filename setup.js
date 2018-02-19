//your code here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('poll');

db.serialize(function() {
  db.run("DROP TABLE IF EXISTS  Politicians");

  db.run("CREATE TABLE IF NOT EXISTS Politicians (id INTEGER PRIMARY KEY, name TEXT,party TEXT, location TEXT, grade_current REAL)");

  db.run("DROP TABLE IF EXISTS Voters");

  db.run("CREATE TABLE IF NOT EXISTS  Voters (id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, gender TEXT, age INTEGER)");

  db.run("DROP TABLE IF EXISTS Votes");

  db.run("CREATE TABLE IF NOT EXISTS Votes (id INTEGER PRIMARY KEY, voterId INTEGER, politicianId INTEGER, FOREIGN KEY (voterId) REFERENCES Voters(id), FOREIGN KEY (politicianId) REFERENCES Politicians(id))");

  console.log('Berhasil Membuat Table Politians, Voters dan Votes');



});

db.close();
