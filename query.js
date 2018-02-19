const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./data.db')

db.all(`SELECT name, location, grade_current, COUNT (*) as TotalVote
        FROM Politicians LEFT JOIN Votes ON politicians.id = Votes.id_politician
        where grade_current <= 9 GROUP BY name ORDER BY TotalVote`,
        function (err, data) {
                // console.log(data);
        })


db.all(`SELECT COUNT (*) as TotalVote, name as politicianName,
                (SELECT first_name||" "||last_name FROM Voters WHERE Voters.id = Votes.id_voter) as voterName,
                (SELECT gender FROM Voters Where Voters.id = votes.id_voter) as gender
        FROM Politicians INNER JOIN Votes ON Politicians.id = Votes.id_politician
        GROUP BY Votes.id_politician
        ORDER BY TotalVote DESC
        limit 0, 3
        `,
        function (err, data) {
                // console.log(data);
        })


db.all(`SELECT COUNT (*) as TotalVote, first_name||" "||last_name as name, gender, age FROM Voters
        LEFT JOIN Votes ON Voters.id = Votes.id_voter GROUP BY name ORDER BY TotalVote DESC LIMIT 9`,
        function (err, data) {
                console.log(data);
        })
