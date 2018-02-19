const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('../poll-db-1/poll.db', (err) => {
    if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQlite database.');
})
db.serialize(()=> {
    // 1.
    db.all(`SELECT politician_name AS name, location, grade_current, COUNT(*) AS totalVote FROM Votes
            LEFT JOIN Politicians ON Politicians.politician_id = Votes.politician_id
            WHERE grade_current < 9
            GROUP BY name
            ORDER BY grade_current ASC
            LIMIT 3`, [], (err, rows) => {
            if (err) throw err
            else {
                console.log(rows)
            }
    })
    // 2.
    db.all(`SELECT totalVote, politicianName, first_name||' '||last_name AS voterName, gender, Votes.voter_id
            FROM (SELECT COUNT(*) As totalVote, politician_name AS politicianName, Politicians.politician_id FROM Votes
            LEFT JOIN Politicians ON Politicians.politician_id = Votes.politician_id
            GROUP BY politicianName
            ORDER BY totalVote DESC
            LIMIT 3) AS TopThree
            LEFT JOIN Votes ON Votes.politician_id = TopThree.politician_id
            LEFT JOIN Voters ON Voters.voter_id = Votes.voter_id`, [], (err, rows) => {
            if (err) throw err
                else {
                    console.log(rows)
                }
    })
    // 3.
    db.all(`SELECT COUNT(*) AS totalVote, first_name||' '||last_name AS name, gender, age FROM Votes
            LEFT JOIN Voters ON Voters.voter_id = Votes.voter_id
            GROUP BY name
            HAVING totalVote > 1
            ORDER BY totalVote DESC`, [], (err, rows) => {
        if (err) throw err
            else {
                console.log(rows)
            }
    })
})

// close the database connection
db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });