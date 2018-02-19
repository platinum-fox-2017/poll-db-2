var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll.db');

db.serialize(function() {
  db.run("DROP TABLE IF EXISTS Voters")
  db.run("CREATE TABLE Voters (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(20), last_name VARCHAR(20), gender VARCHAR(10), age INTEGER)");

  db.run("DROP TABLE IF EXISTS Politicians")
  db.run("CREATE TABLE Politicians (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), party VARCHAR(2), location VARCHAR(5), grade_current REAL)")

  db.run("DROP TABLE IF EXISTS Votes")
  db.run("CREATE TABLE Votes (id INTEGER PRIMARY KEY AUTOINCREMENT, voterId INTEGER, politicianId INTEGER, FOREIGN KEY (voterId) REFERENCES Voters(id), FOREIGN KEY (politicianId) REFERENCES Politicians(id))")

  console.log("berhasil membuat table Voters, Politicians dan Votes");
});

db.close();
