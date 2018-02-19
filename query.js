'use strict'

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

db.serialize(function() {
  db.all(`SELECT name,location,grade_current,COUNT(*) AS totalVote
  FROM Politicians LEFT JOIN Votes ON Politicians.id = Votes.politicianId
  WHERE Politicians.grade_current < 9 GROUP BY name ORDER BY totalVote`,(err,data) => {
    console.log(data)
  })
  db.all(`SELECT COUNT(*) AS totalVote, name AS politicianName,Politicians.id,
  (SELECT first_name||" "||last_name FROM Voters WHERE Voters.id = Votes.voterId) AS voterName,
  (SELECT gender FROM Voters WHERE Voters.id = Votes.voterId) AS gender FROM Politicians
  INNER JOIN Votes ON Politicians.id = Votes.politicianId GROUP BY politicianName ORDER BY totalVote DESC LIMIT 3`,(err,data) => {
    // console.log(data)
    for(let i = 0; i < data.length; i++) {
      db.all(`SELECT
      (SELECT COUNT(Votes.VoterId) FROM Votes WHERE Votes.politicianId = ${data[i].id}) AS totalVote,
      (SELECT name FROM Politicians WHERE Votes.politicianId = Politicians.id) AS politicianName,
      Voters.first_name||" "||Voters.last_name AS voterName, gender FROM Votes JOIN Voters ON Voters.id = Votes.voterId
      WHERE Votes.politicianId = ${data[i].id}`, (err,data2) => {
        console.log(data2);
      })
    }
  })
  db.all(`SELECT COUNT(*) AS totalVote, first_name||" "||last_name AS name,gender,age FROM Voters
  INNER JOIN Votes ON Votes.voterId = Voters.id GROUP BY name HAVING totalVote > 1 ORDER BY totalVote DESC`, (err,data) => {
    console.log(data)
  })

});

db.close();
