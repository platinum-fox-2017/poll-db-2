const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll_data.db');

var pol_data = fs.readFileSync('./politicians.csv', 'UTF-8').trim().split('\r\n');
var voters_data = fs.readFileSync('./voters.csv', 'UTF-8').trim().split('\r\n');
var vote_data = fs.readFileSync('./votes.csv', 'UTF-8').trim().split('\r\n');
// console.log(pol_data); // array of strings // length: 21

db.serialize(function() {
    var stmt = db.prepare("INSERT INTO Politicians(name,partai,location,gradeCurrent) VALUES (?,?,?,?)");
    for (var i = 1; i < pol_data.length; i++) {
        var listPol = pol_data[i].split(',');
        var name = listPol[0]
        var partai = listPol[1]
        var location = listPol[2]
        var gradeCurrent = listPol[3]
        stmt.run([name,partai,location,gradeCurrent]);
    }
    stmt.finalize();
    console.log('Berhasil input data csv ke dalam tabel Politicians!');
});
   
db.serialize(function() {
    var stmt = db.prepare("INSERT INTO Voters(firstName,lastName,gender,age) VALUES (?,?,?,?)");
    for (var i = 1; i < voters_data.length; i++) {
        var listVoters = voters_data[i].split(',');
        var firstName = listVoters[0];
        var lastName = listVoters[1];
        var gender = listVoters[2];
        var age = listVoters[3];
        stmt.run([firstName,lastName,gender,age]);
    }
    stmt.finalize();
    console.log('Berhasil input data csv ke dalam tabel Voters!');
});


db.serialize(function() {
    var stmt = db.prepare("INSERT INTO Politicians_Voters(polID,votersID) VALUES (?,?)");
    for (var i = 1; i < vote_data.length; i++) {
        var listVotes = vote_data[i].split(',');
        var votersID = listVotes[0];
        var polID = listVotes[1];
        stmt.run([polID,votersID]);
    }
    stmt.finalize();
    console.log('Berhasil input data csv ke dalam tabel Votes!');
});




db.close();


