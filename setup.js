const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('pollDB');

db.serialize(function() {
  db.run("DROP TABLE IF EXISTS Politicians");

  db.run("DROP TABLE IF EXISTS Voters");

  db.run("DROP TABLE IF EXISTS Votes");

  db.run("CREATE TABLE Politicians (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), party VARCHAR(2), location VARCHAR(2), gradeCurrent REAL)");

  db.run("CREATE TABLE Voters (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName VARCHAR(25), lastName VARCHAR(25), gender VARCHAR(10), age REAL)");

  db.run("CREATE TABLE Votes (id INTEGER PRIMARY KEY AUTOINCREMENT, voterId INTEGER, politicianId INTEGER, FOREIGN KEY(voterId) REFERENCES Voters (id), FOREIGN KEY (politicianId) REFERENCES Politicians (id))");
});

db.close();
