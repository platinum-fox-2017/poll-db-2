const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./poll.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

let sql  = `SELECT name, location, gradeCurrent, Count(*) as totalVote
            FROM Politicians
            JOIN Votes ON Politicians.id = Votes.idPoliticians
            WHERE gradeCurrent < 9
            GROUP BY name
            ORDER BY count(*) ASC`;
db.all(sql, [], function(err, rows){
    if(err){
        console.log(err);
    }else{
        console.log(rows);
        console.log('-----------------------------------------------------------------------\n')
    }
});


let sql2 = `SELECT count(*) as totalVote, Politicians.name as politicianName, (Voters.firstName || " " || Voters.lastName) as voterName, Voters.gender
            FROM Votes
            JOIN Politicians ON Votes.idPoliticians = Politicians.id
            JOIN Voters ON Votes.idVoters = Voters.id
            GROUP BY Voters.firstName
            ORDER BY totalVote DESC`;
db.all(sql2, [], function(err, rows){
    if(err){
        console.log(err);
    }else{
        console.log(rows);
        console.log('-----------------------------------------------------------------------\n')
    }
});

let sql3 = `SELECT count(*) as totalVote, (Voters.firstName || " " || Voters.lastName) as name, Voters.gender, Voters.age
            FROM Votes
            JOIN Voters ON Votes.idVoters = Voters.id
            GROUP BY Voters.firstName
            HAVING COUNT(*) > 1
            ORDER BY totalVote DESC;`;
db.all(sql3, [], function(err, rows){
    if(err){
        console.log(err);
    }else{
        console.log(rows);
        console.log('-----------------------------------------------------------------------\n')
    }
});
























/*
(SELECT count(*) 
FROM Votes 
WHERE Politicians.id = Votes.idPoliticians ) */