//your code here
const fs = require('fs');

const politican_file = './politicians.csv';
const voters_file = './voters.csv';
const votes_file = './votes.csv';

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll.db');

db.serialize(function() {
    db.all(`SELECT name, party, grade_current
    FROM Politicians
    WHERE party = 'R' AND
        grade_current BETWEEN 9 AND 11
    `, function(err, rows) {
        if(err) console.log(err);
        else console.log(rows)
    });

    db.all(`SELECT COUNT(*) AS totalVote, name
            FROM Votes
            LEFT JOIN Politicians
                ON Votes.politicianId = Politicians.id
            WHERE name = "Olympia Snowe"`,
            [], function(err, row) {
        console.log(row) 
    });

    db.get(`SELECT name, COUNT(*) AS totalVote
            FROM Votes
            LEFT JOIN Politicians
                ON Votes.politicianId = Politicians.id
            WHERE name LIKE "%Adam%"
            GROUP BY 1`,
            [], function(err, rows) {
        console.log(rows) 
    });

    db.all(`SELECT COUNT(*) AS totalVote, name, party, location
            FROM Votes
            LEFT JOIN Politicians
                ON Votes.politicianId = Politicians.id
            GROUP BY name
            ORDER BY 1 DESC
            LIMIT 3`,
            [], function(err, row) {
        console.log(row) 
    });

    db.all(`Select first_name, last_name, gender, age
    FROM Votes
    LEFT JOIN Politicians
        ON Votes.politicianId = Politicians.id
    LEFT JOIN Voters
        ON Votes.voterId = Voters.id
    WHERE name = "Olympia Snowe"`,
            [], function(err, row) {
        if(err)console.log(err)
        else console.log(row) 
    });

});

db.close();