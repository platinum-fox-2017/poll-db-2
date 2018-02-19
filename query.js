const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db')

db.serialize(function(){
    
    db.all(`SELECT name, location, grade_current, COUNT(Voting.politicianId) 
    AS totalVote FROM Politicians
    INNER JOIN Voting ON Politicians.id = Voting.politicianId
    WHERE grade_current < 9 GROUP BY name 
    ORDER BY totalVote`,
    (err, rows) => {
        if(err){
            console.log(err.message)
        }
        console.log('=========Banyak Vote Yang Diterima Politician========')
        console.log(rows)
    })

    
    db.all(`SELECT totalVote, Politicians.name AS politicianName, 
    Voters.first_name ||' '||Voters.last_name AS voterName, Voters.gender
    FROM Voting
    JOIN (SELECT Count(*) AS totalVote, PoliticianId FROM Voting
    GROUP BY politicianId
    ORDER BY Count(*) DESC LIMIT 3) AS TopThree 
    ON Voting.politicianId = TopThree.politicianId
    LEFT JOIN Politicians ON Voting.PoliticianId = Politicians.id
    LEFT JOIN Voters ON Voting.voterId = Voters.id;`,
    
    (err, rows) => {
        if(err){
            console.log(err.message)
        }
        console.log('=======3 Politican Terbanyak, dan Data voter yang memilih=======')
        console.log(rows)
    })

    db.all(`SELECT COUNT(*) AS totalVote, first_name||' '||last_name AS name, 
    gender, age FROM Voting
    LEFT JOIN Voters ON Voters.id = Voting.voterId
    GROUP BY name
    HAVING totalVote > 1
    ORDER BY totalVote DESC;`,
    (err, rows) => {
        if(err){
            console.log(err.message)
        }
        console.log('=======List orang yang melakukan kecurangan=======')
        console.log(rows)
    })

    db.close()

})




