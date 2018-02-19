const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

const getGrade = grade_current => {
    db.all(`SELECT name, location, grade_current, count(votes.politicianId) as totalVote FROM politicians
            INNER JOIN votes ON votes.politicianId = politicians.id  WHERE grade_current < ${grade_current} GROUP BY name ORDER BY grade_current`, (err, row) => {
        if(err) throw err
        console.log(row)
    })
}

const maxVote = () => {
    db.all(`SELECT (select count(*) from votes WHERE votes.politicianId = politicians.id) as totalVote, 
    politicians.name as politicianName, 
    first_name || ' ' || last_name  as voterName, 
    gender 
    FROM votes
    INNER JOIN voters ON voters.id = votes.voterId
    INNER JOIN politicians ON politicians.id = votes.politicianId
    WHERE politicians.id IN (
        SELECT votes.politicianId FROM votes
        INNER JOIN politicians ON politicians.id = votes.politicianId
        GROUP BY politicianId
        ORDER BY(select count(*) from votes WHERE votes.politicianId = politicians.id) DESC
        LIMIT 3) ORDER BY totalVote DESC`, (err, row) => {
        if (err) throw err
       console.log(row)
    });
}

const cheaterVoter = () => {
    db.all(`SELECT (select count(*) from votes WHERE votes.voterId = voters.id ) as totalVote, first_name || ' ' || last_name as name, gender, age FROM votes
    INNER JOIN voters ON voters.id = votes.voterId GROUP BY name ORDER BY totalVote DESC `, (err,row) => {
        if (err) throw err
        console.log(row)
    })
}

// getGrade(9)
// maxVote()
cheaterVoter()