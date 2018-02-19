const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

function cheatingPoliticians(){
    db.all(`select politicians.name,politicians.location,politicians.grade_current ,count(politicians.id)as totalvote
        from politicians inner join votes on politicians.id = votes.politicianId 
        where politicians.grade_current < 9 group by politicians.name order by totalvote`,function(err,data){
        if(err) throw err
        console.log(data)
    })
}

function totalVote(){
    db.all(`select politicians.id,count(*) as totalvote from politicians
            join votes on politicians.id = votes.politicianId
            join voters on politicians.id = voters.id
            group by politicians.id order by totalvote desc limit 3`,function(err,data){
                if(err) throw err
                for(let i = 0; i < data.length; i++){
                    db.all(`SELECT (select count(*) as totalvote from politicians
                    join votes on politicians.id = votes.politicianId
                    join voters on politicians.id = voters.id
                    where votes.politicianId = ${data[i].id})as totalVote, (Voters.first_name||" "||Voters.last_name)AS voterName, VOTErS.gender, Politicians.name FROM Votes
                    JOIN Voters ON VOTES.voterId = Voters.id
                    JOIN Politicians ON Votes.politicianId = Politicians.id
                    WHERE Votes.politicianId = ${data[i].id}`,(err,data2)=>{
                        console.log(data2)
                    })
                }
            })
}

function cheatVote(){
    db.all(`select count(*) as totalvote,(voters.first_name||" "||voters.last_name) as name,
            voters.gender,voters.age from voters join votes
            on voters.id = votes.voterId group by voters.id
            having totalvote >1
            order by totalvote desc`,function(err,data){
                if(err) throw err
                console.log(data)
            })
}

// cheatingPoliticians()
// totalVote()
cheatVote()