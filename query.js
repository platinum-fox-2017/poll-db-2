const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');


function release_0_1() {
    db.serialize(function(){
        db.all("SELECT name,location,grade_current,(SELECT COUNT(*) FROM votes WHERE politicians_id = politicians.politicians_id) AS totalValue FROM politicians WHERE grade_current < 9 ORDER BY grade_current ASC", (err,rows)=>{
            console.log("\nRelease 0 1:");
            console.log(rows);
        });
    });
}



function release_0_2() {
    db.serialize(function(){
        db.all(`SELECT (SELECT COUNT(*) FROM votes WHERE politicians_id = politicians.politicians_id) AS totalVote, politicians.name AS politicianName,(first_name||' '||last_name) AS voterName,gender FROM voters
        LEFT JOIN votes ON politicians.politicians_id = votes.politicians_id
        LEFT JOIN politicians ON voters.voters_id = votes.voters_id WHERE totalVote IN (SELECT (SELECT COUNT(*) FROM votes WHERE politicians_id = politicians.politicians_id) AS totalVote FROM politicians ORDER BY totalVote DESC LIMIT 3)
        ORDER BY totalVote DESC`,(err,rows)=>{
            if(err)
                console.log(err);
            console.log("\nRelease 0 2:");
            console.log(rows);
        })
    })
}

function release_0_3() {
    db.serialize(function() {
        db.all("SELECT (SELECT COUNT(*) FROM votes WHERE voters_id = voters.voters_id) AS totalVote,(first_name|| ' '||last_name) AS name,gender,age FROM voters WHERE totalVote > 1 ORDER BY totalVote DESC",
            (err, rows) => {
                if(err)
                    console.log(err);
                console.log("\nRelease 0 3:");
                console.log(rows);
            });
    });
}



// release_0_1();
// release_0_2();
release_0_3();
