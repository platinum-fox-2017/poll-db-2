const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll_data.db');

// QUERY 1
db.serialize(function() {
    db.all("SELECT name,location,gradeCurrent,COUNT(*) AS totalVotes FROM Politicians JOIN Politicians_Voters ON Politicians.id = Politicians_Voters.polID WHERE gradeCurrent < 9 GROUP BY name ORDER BY totalVotes", function(err, row) {
    if (err) console.log(err);
    console.log(row);
    console.log('=========================')
    });
});


// QUERY 2
// db.serialize(function() {
//     db.all("SELECT totalVotes,politicianName,firstName|| ' ' ||lastName AS voterName,gender FROM (SELECT COUNT(*) AS totalVotes,name AS politicianName,polID FROM Voters JOIN Politicians_Voters ON Voters.id = Politicians_Voters.votersID JOIN Politicians ON Politicians_Voters.polID = Politicians.ID GROUP BY name ORDER BY totalVotes DESC LIMIT 3) AS tableTOP3 JOIN Politicians_Voters ON tableTOP3.polID = Politicians_Voters.polID JOIN Voters ON Politicians_Voters.votersID = Voters.ID ORDER BY totalVotes DESC", function(err, row) {
//         if (err) console.log (err);
//         console.log(row);
//         console.log('=========================')
//     });
// });

// QUERY 3
db.serialize(function() {
    db.all(`SELECT totalVotes,name,gender,age FROM (SELECT COUNT(*) AS totalVotes,firstName|| ' ' ||lastName AS name,gender,age FROM Politicians_Voters JOIN Voters ON Politicians_Voters.votersID = Voters.ID GROUP BY votersID) AS table4 WHERE totalVotes > 1 ORDER BY totalVotes DESC`, function(err, row) {
    if (err) console.log(err);
    console.log(row);
    console.log('=========================')
    });
});




db.close();