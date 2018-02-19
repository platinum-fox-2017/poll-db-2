const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./poll.db');

let politicians = fs.readFileSync('./politicians.csv', 'utf8').trim().split('\n');
let voters = fs.readFileSync('./voters.csv', 'utf8').trim().split('\n');
let votes = fs.readFileSync('./votes.csv', 'utf8').trim().split('\n');

db.serialize(function() {
  var stmt = db.prepare("INSERT INTO Voters(first_name, last_name, gender, age) VALUES (?, ?, ?, ?)");
  for (let i = 1; i < voters.length; i++) {
    let voter = voters[i].split(',')
    stmt.run([voter[0], voter[1], voter[2], voter[3]]);
  }
  stmt.finalize();
  console.log('Berhasil memasukan data Voters');

  var stmt = db.prepare("INSERT INTO Politicians(name, party, location, grade_current) VALUES (?, ?, ?, ?)");
  for (let i = 1; i < politicians.length; i++) {
    let politician = politicians[i].split(',')
    stmt.run([politician[0], politician[1], politician[2], politician[3]]);
  }
  stmt.finalize();
  console.log('Berhasil memasukan data Politicians');

  var stmt = db.prepare("INSERT INTO Votes(voterId, politicianId) VALUES (?,?)");
  for(let i = 1; i < votes.length; i++) {
    let vote = votes[i].split(',')
    stmt.run([vote[0],vote[1]])
  }
  stmt.finalize();
  console.log('Berhasil memasukan data Votes');
});

db.close();
