var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('poll2.db');

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS politicians (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, party TEXT, location TEXT, grade_current REAL)");

  db.run("CREATE TABLE IF NOT EXISTS voters (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, gender TEXT, age TEXT)");

  db.run("CREATE TABLE IF NOT EXISTS votes (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, votersId INTEGER, politiciansId INTEGER, FOREIGN KEY(votersId) REFERENCES voters(id), FOREIGN KEY(politiciansId) REFERENCES politicians(id))");
});
 
db.close();
