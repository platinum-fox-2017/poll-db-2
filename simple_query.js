const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./poll.db", sqlite3.OPEN_READWRITE, err => {
  if (err) throw err;
  console.log(`Connected to the poll database`);
});

db.serialize(() => {
  db.all(`SELECT name, party, grade_current FROM Politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`, (err, rows) => {
    if(err) throw err
    console.log(rows)
  })

  db.all(`SELECT COUNT(*) AS totalVote, Politicians.name FROM Votes LEFT JOIN Politicians ON Politicians.id = Votes.politicianId WHERE Politicians.name = 'Olympia Snowe'`, (err, rows) => {
    if(err) throw err
    console.log(rows)
  })

  db.all(`SELECT Politicians.name, COUNT(*) AS totalVote FROM Votes LEFT JOIN Politicians ON Politicians.id = Votes.politicianId WHERE Politicians.name LIKE 'Adam%' GROUP BY Politicians.name`, (err, rows) => {
    if(err) throw err
    console.log(rows)
  })

  db.all(`SELECT COUNT(*) AS totalVote, Politicians.name, Politicians.party, Politicians.location FROM Votes LEFT JOIN Politicians ON Politicians.id = Votes.politicianId GROUP BY Politicians.name ORDER BY totalVote DESC LIMIT 3`, (err, rows) => {
    if(err) throw err
    console.log(rows)
  })

  db.all(`SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age FROM Votes LEFT JOIN Politicians ON Politicians.id = Votes.politicianId LEFT JOIN Voters ON Voters.id = Votes.voterId WHERE Politicians.name = 'Olympia Snowe'`, (err, rows) => {
    if(err) throw err
    console.log(rows)
  })
});

db.close();