const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db', sqlite3.OPEN_READWRITE, (err) => {
  if(err) throw err
  console.log(`Connected to the poll database`)
})


db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS Politicians (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, party TEXT, location TEXT, grade_current REAL)");
  db.run("CREATE TABLE IF NOT EXISTS Voters (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, gender TEXT, age INTEGER)");
  db.run("CREATE TABLE IF NOT EXISTS Votes (voterId INTEGER, politicianId INTEGER, FOREIGN KEY(voterId) REFERENCES Voters(id), FOREIGN KEY(politicianId) REFERENCES Politicians(id))");
});

db.close();