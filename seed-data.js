const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('pollDB');

const fs = require ('fs');
var politicians = fs.readFileSync('politicians.csv','UTF-8')
  .split('\n');
var voters = fs.readFileSync('voters.csv','UTF-8')
  .split('\n');
var votes = fs.readFileSync('votes.csv','UTF-8')
  .split('\n');

db.serialize(function() {
  let insertPoliticians = db.prepare("INSERT INTO Politicians (name,party,location,gradeCurrent) VALUES (?,?,?,?)");
  for (let i=1; i<politicians.length-1; i++){
    let politician = politicians[i].split(',');
    let nama = politician[0];
    let party = politician[1];
    let location = politician[2];
    let gradeCurrent = politician[3];
    insertPoliticians.run(nama,party,location,gradeCurrent);
  }
  insertPoliticians.finalize();

  let inserVoters = db.prepare("INSERT INTO Voters (firstName,lastName,gender,age) VALUES (?,?,?,?)");
  for (let i=1; i<voters.length-1; i++){
    let voter = voters[i].split(',');
    let firstName = voter[0];
    let lastName = voter[1];
    let gender = voter[2];
    let age = voter[3];
    inserVoters.run(firstName,lastName,gender,age);
  }
  inserVoters.finalize();

  let insertVotes = db.prepare("INSERT INTO Votes (voterId,politicianId) VALUES (?,?)");
  for (let i=1; i<votes.length-1; i++){
    let vote = votes[i].split(',');
    let voteId = vote[0];
    let politicianId = vote[1];
    insertVotes.run(voteId,politicianId);
  }
  insertVotes.finalize();
  console.log('Insert All Data, Complete');

});

db.close();
