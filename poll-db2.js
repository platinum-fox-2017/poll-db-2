//your code here
const fs = require('fs');

const politican_file = './politicians.csv';
const voters_file = './voters.csv';
const votes_file = './votes.csv';

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll.db');

db.serialize(function() {
    db.all(`SELECT name, location, grade_current, (SELECT COUNT(*) FROM Votes WHERE politicianId = Politicians.id) AS totalVote
    FROM Politicians
    WHERE grade_current < 9
    ORDER BY 4
    `, function(err, rows) {
        if(err) console.log(err);
        else console.log(rows)
    });

    db.all(`
    SELECT totalVote, name, first_name||' '||last_name AS voterName, gender
    FROM (
        SELECT Politicians.id, name, count(*) AS totalVote
        FROM Politicians
        LEFT JOIN Votes
            ON Politicians.id = Votes.politicianId
        GROUP BY 2
        ORDER BY 3 DESC
        LIMIT 3
    ) AS Top3
    LEFT JOIN Votes
        ON Votes.politicianId = Top3.id
    LEFT JOIN Voters
        ON Votes.voterId = Voters.id
    

    `, function(err, rows) {
        if(err) console.log(err);
        else console.log(rows)
    });

    db.each(`
    SELECT Count(*) AS totalVote, first_name||' '||last_name AS name, gender, age
    FROM Votes
    LEFT JOIN Voters
        ON Voters.id = Votes.voterId
    GROUP BY 2
    HAVING totalVote > 1
    ORDER BY 1 DESC
    `, function(err, rows) {
        if(err) console.log(err);
        else console.log(rows)
    });
});

db.close();