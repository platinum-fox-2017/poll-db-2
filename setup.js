const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('./voting.db');
db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS voters (votersId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,first_name TEXT NOT NULL,last_name TEXT NOT NULL,gender TEXT NOT NULL,age INTEGER NOT NULL)", error => {
    if (error) {
      throw error;
    }
  });
});
db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS politicians (politiciansId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,party TEXT NOT NULL,location TEXT NOT NULL,grade_current REAL NOT NULL)", error => {
    if (error) {
      throw error;
    }
  });
});

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS  votes (votesId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,voterId INTEGER NOT NULL,politiciansId INTEGER NOT NULL,FOREIGN KEY (voterId) REFERENCES voters(votersId),FOREIGN KEY (politiciansId) REFERENCES politicians(politiciansId))", error => {
    if (error) {
      throw error;
    }
  });
});

db.close();
