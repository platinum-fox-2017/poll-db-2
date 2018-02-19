var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./database.db')

// db.all(`SELECT name,
// location,
// grade_current,
// COUNT(*) as totalVote from Politician INNER JOIN Vote ON Vote.PoliticianId = Politician.id
// WHERE grade_current < 9 GROUP BY name
// ORDER BY grade_current ASC`, (err, data) => {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(data)

//         }
//     })Politician.name as politicianName,
// (Voter.first_name || ' ' || Voter.last_name) as voterName,
db.all(`SELECT (SELECT COUNT(*) as totalVote FROM Vote WHERE
Politician.id = Vote.politicianId ORDER BY totalVote DESC LIMIT 0,3) as totalVote,
Politician.name as politicianName,
(Voter.first_name || ' ' || Voter.last_name) as voterName,
Voter.gender from Voter
INNER JOIN Vote ON Vote.votersId = Voter.id
INNER JOIN Politician ON Politician.id = Vote.politicianId
WHERE totalVote IN
(SELECT (SELECT COUNT(*)
FROM Vote WHERE Vote.politicianId = Politician.id)
AS totalVote FROM Politician ORDER BY
totalVote DESC LIMIT 0,3)
ORDER BY totalVote DESC
`, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data);
        }
    })


// db.all(`SELECT COUNT(Vote.id) as totalVote,
// (first_name || ' ' || last_name) as name,
// gender,
// age
// FROM Voter INNER JOIN Vote ON Vote.votersId = Voter.id
// GROUP BY name
// ORDER BY totalVote DESC
// `, (err, data) => {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(data)
//         }
//     })

