//your code here
const fs = require('fs');

const politican_file = './politicians.csv';
const voters_file = './voters.csv';
const votes_file = './votes.csv';

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll.db');

let politiciansDB = fs.readFileSync(politican_file, 'utf8').trim().split('\n').map(a=>a.split(','));
let votersDB = fs.readFileSync(voters_file, 'utf8').trim().split('\n').map(a=>a.split(','));
let votesDB = fs.readFileSync(votes_file, 'utf8').trim().split('\n').map(a=>a.split(','));

db.serialize(function() {
    for(let i =1; i<politiciansDB.length; i++) {
        db.run(`INSERT INTO Politicians(${politiciansDB[0].join(',')}) VALUES("${politiciansDB[i][0]}","${politiciansDB[i][1]}","${politiciansDB[i][2]}",${Number(politiciansDB[i][3])})`, [], function(err) {
            if (err) {return console.log(err.message);}
        });
    }

    for(let i =1; i<votersDB.length; i++) {
        db.run(`INSERT INTO Voters(${votersDB[0].join(',')}) VALUES("${votersDB[i][0]}","${votersDB[i][1]}","${votersDB[i][2]}",${Number(votersDB[i][3])})`, [], function(err) {
            if (err) {return console.log(err.message);}
        });
    }

    for(let i =1; i<votesDB.length; i++) {
        db.run(`INSERT INTO Votes(${votesDB[0].join(',')}) VALUES(${votesDB[i][0]},${votesDB[i][1]})`, [], function(err) {
            if (err) {return console.log(err.message);}
        });
    }

    db.run(`INSERT INTO Voters (first_name,last_name,gender,age) VALUES ("Ervan", "Adetya", "male", 20)`);
    db.run(`UPDATE Voters SET age = 18 WHERE first_name = "Ervan"`);
    db.run(`DELETE FROM Voters WHERE first_name = "Ervan"`);
});

db.close();