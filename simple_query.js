const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./polldb-2.db", sqlite3.OPEN_READWRITE, err => {
  if (err) throw err;
  console.log(`Connected to the poll database`);
});

db.serialize(() => {
  db.all(`SELECT name, location, grade_current, COUNT(*) AS totalVote 
         FROM Votes LEFT JOIN Politicians ON Politicians.id = Votes.politicianId 
         WHERE grade_current < 9 GROUP BY name ORDER BY grade_current`, (err, rows) => {
    if(err) throw err
    console.log(rows)
  })

  db.all(`SELECT (SELECT COUNT(*) FROM Votes WHERE Votes.politicianId = Politicians.id) AS totalVote, name AS politicianName, 
         first_name || ' ' || last_name AS voterName, gender FROM Votes 
         LEFT JOIN Politicians ON Politicians.id = Votes.politicianId 
         LEFT JOIN Voters ON Voters.id = Votes.voterId 
         WHERE Politicians.name IN ('Candice Miller', 'Adam Smith', 'Anna Eshoo') 
         ORDER BY totalVote DESC`, (err, rows) => {
    if(err) throw err
    console.log(rows)
  })

  db.all(`SELECT COUNT(*) AS totalVote, first_name || ' ' || last_name AS name, gender, age FROM Votes 
         LEFT JOIN Voters ON Voters.id = Votes.voterId 
         GROUP BY voterId HAVING totalVote > 1 ORDER BY totalVote DESC`, (err, rows) => {
    if(err) throw err
    console.log(rows)
  })
});


db.close();