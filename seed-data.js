const sqlite3 = require('sqlite3').verbose();
const fs = require('fs')
const db = new sqlite3.Database('./poll.db', sqlite3.OPEN_READWRITE, (err) => {
  if(err) throw err
  console.log(`Connected to the candidates database`)
})

const politician = fs.readFileSync('./politicians.csv', 'utf8').split('\r\n')
// console.log(politician)
const voters = fs.readFileSync('./voters.csv', 'utf8').split('\r\n')
const votes = fs.readFileSync('./votes.csv', 'utf8').split('\r\n')

db.serialize(() => {
  var stmt = db.prepare("INSERT INTO Politicians(name, party, location, grade_current) VALUES (?,?,?,?)");
  for(let i = 1; i < politician.length; i++) {
    let polSplit = politician[i].split(',')
    stmt.run([polSplit[0], polSplit[1], polSplit[2], polSplit[3]])
  }
  stmt.finalize();
  console.log(`Insert into Politicians done`)

  var stmt = db.prepare("INSERT INTO Voters(first_name, last_name, gender, age) VALUES (?,?,?,?)");
  for(let i = 1; i < voters.length; i++) {
    let votersSplit = voters[i].split(',')
    stmt.run([votersSplit[0], votersSplit[1], votersSplit[2], votersSplit[3]])
  }
  stmt.finalize();
  console.log(`Insert into Voters done`)

  var stmt = db.prepare("INSERT INTO Votes(voterId, politicianId) VALUES (?,?)");
  for(let i = 1; i < votes.length; i++) {
    let votesSplit = votes[i].split(',')
    stmt.run([votesSplit[0], votesSplit[1]])
  }
  stmt.finalize();
  console.log(`Insert into Votes done`)
});

db.close();