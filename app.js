var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');
 
db.serialize(function() {
    // no 1
    let query1 = `SELECT name, location, grade_current, Count(Votes.politicianId) as totalVote FROM Politicians 
                Inner Join Votes On Politicians.id = Votes.politicianId 
                GROUP BY name 
                Having grade_current < 9               
                ORDER BY totalVote`
    db.all(query1,(err,rows)=>{
        if (err) throw err;
        console.log(rows)
    })

    // no 2
    let query2 = `SELECT count.totalVote, Politicians.name as politicianName, 
                Voters.first_name ||' '||Voters.last_name as voterName, Voters.gender
                from Votes
                JOIN(
                SELECT Count(*) as totalVote, PoliticianId
                    from Votes
                    GROUP BY politicianId
                    ORDER BY Count(*) DESC
                    LIMIT 3
                ) AS count ON Votes.politicianId = count.politicianId
                LEFT JOIN Politicians ON Votes.PoliticianId = Politicians.id
                LEFT JOIN Voters ON Votes.voterId = Voters.id`
    db.all(query2,(err,rows)=>{
        if (err) console.log(err);
        console.log(rows)
    })


    //no 3
    let query3 = `SELECT Count(voterId) as totalVote, voters.first_name||' '||last_name as name, voters.gender, voters.age  
                FROM Votes INNER Join Voters ON Votes.voterId=Voters.id
                GROUP BY voterId
                HAVING totalVote > 1
                ORDER BY totalVote DESC`
    db.all(query3,(err,rows)=>{
        if (err) throw err;
        console.log(rows)
    })
});
 
db.close();
