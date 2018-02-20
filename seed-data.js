const fs = require('fs');

let dataPoliticians = fs.readFileSync('./politicians.csv', 'utf8').trim().split('\n');
let dataVoters = fs.readFileSync('./voters.csv', 'utf8').trim().split('\n');
let dataVotes = fs.readFileSync('./votes.csv', 'utf8').trim().split('\n');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('poll2.db');

db.serialize(function() {

    let stmt1 = db.prepare("INSERT INTO politicians (name, party, location, grade_current) VALUES (?,?,?,?)");
    for (let i = 1; i < dataPoliticians.length; i++) {
        let dataPoliticiansArr = dataPoliticians[i].split(',')
        let name = dataPoliticiansArr[0];
        let party = dataPoliticiansArr[1];
        let location = dataPoliticiansArr[2];
        let gradeCurrent = dataPoliticiansArr[3];
        stmt1.run(name, party, location, gradeCurrent);
    }
    stmt1.finalize();


    let stmt2 = db.prepare("INSERT INTO voters (firstName, lastName, gender, age) VALUES (?,?,?,?)");
    for(let i = 1; i < dataVoters.length; i++){
    let dataVotersArr = dataVoters[i].split(',');
    let fname = dataVotersArr[0];
    let lname = dataVotersArr[1];
    let gender = dataVotersArr[2];
    let age = dataVotersArr[3];
    stmt2.run(fname, lname, gender, age);
    }
    stmt2.finalize();

    let stmt3  = db.prepare("INSERT INTO votes (votersId, politiciansId) VALUES (?,?)");
    for(let i = 1; i < dataVotes.length; i++){
    let dataVotesArr = dataVotes[i].split(',');
    let politicId = dataVotesArr[1];
    let voterId = dataVotesArr[0];
    stmt3.run(voterId, politicId);
    }
    stmt3.finalize();

});
 
db.close();