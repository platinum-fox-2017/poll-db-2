const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./data.db')

db.all(`SELECT name, location, grade_current, COUNT (*) as TotalVote
        FROM Politicians LEFT JOIN Votes ON politicians.id = Votes.id_politician
        where grade_current <= 9 GROUP BY name ORDER BY TotalVote`,
        function (err, data) {
                console.log(data);
        })


db.all(`SELECT COUNT (*) as TotalVote, name as politicianName, Politicians.id,
                (SELECT first_name||" "||last_name FROM Voters WHERE Voters.id = Votes.id_voter) as voterName,
                (SELECT gender FROM Voters Where Voters.id = votes.id_voter) as gender
        FROM Politicians INNER JOIN Votes ON Politicians.id = Votes.id_politician
        GROUP BY Votes.id_politician
        ORDER BY TotalVote DESC
        limit 0, 3`,
        function (err, data) {
                for (var i = 0; i < data.length; i++) {
                        db.all(`SELECT (SELECT COUNT(Votes.id_voter) from Votes
                                WHERE Votes.id_politician = ${data[i].id}) as totalVote,
                                (SELECT name FROM Politicians WHERE Votes.id_politician = Politicians.id) as politicianName,
                        Voters.first_name||" "||Voters.last_name as voterName, gender FROM Votes JOIN Voters
                        ON Voters.id = Votes.id_voter
                        WHERE Votes.id_politician = ${data[i].id}`,function (err2,data2) {
                                console.log(data2);
                        })
                }
        })


db.all(`SELECT COUNT (*) as TotalVote, first_name||" "||last_name as name, gender, age FROM Voters
        LEFT JOIN Votes ON Voters.id = Votes.id_voter GROUP BY name HAVING TotalVote > 1 ORDER BY TotalVote DESC`,
        function (err, data) {
                console.log(data);
        })
