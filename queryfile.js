const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll_data.db');

// QUERY 1
db.serialize(function() {
    db.all("SELECT name,partai,gradeCurrent FROM Politicians WHERE partai = 'R' AND gradeCurrent > 9 AND gradeCurrent < 11", function(err, row) {
        console.log(row);
        console.log('=========================')
    });
});

db.serialize(function() {
    db.all("SELECT COUNT(*) AS totalVotes,name FROM Politicians_Voters JOIN Politicians ON Politicians_Voters.polID = Politicians.id WHERE polID = 17 ", function(err, row) {
        console.log(row);
        console.log('=========================')
    });
});

db.serialize(function() {
    db.all("SELECT name,COUNT(*) AS totalVotes FROM Politicians_Voters JOIN Politicians ON Politicians_Voters.polID = Politicians.id WHERE name LIKE 'adam%' GROUP BY name ", function(err, row) {
        console.log(row);
        console.log('=========================')
    });
});


db.serialize(function() {
    db.all("SELECT COUNT(*) AS totalVotes,name,partai,location FROM Politicians_Voters JOIN Politicians ON Politicians_Voters.polID = Politicians.id GROUP BY name ORDER BY totalVotes DESC LIMIT 3", function(err, row) {
        console.log(row);
        console.log('=========================')
    });
});


db.serialize(function() {
    db.all("SELECT firstName,lastName,gender,Age FROM Voters JOIN Politicians_Voters ON Voters.id = Politicians_Voters.votersID JOIN Politicians ON Politicians_Voters.polID = Politicians.ID WHERE name = 'Olympia Snowe' ", function(err, row) {
        if (err) console.log (err);
        console.log(row);
        console.log('=========================')
    });
});


db.close();