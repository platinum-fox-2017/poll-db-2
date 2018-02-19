"use strict"
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('./voting.db');


db.all("SELECT name,location,grade_current, COUNT(*) as totalVote FROM votes JOIN politicians ON votes.politiciansId=politicians.politiciansId WHERE grade_current<9 GROUP BY name ORDER BY grade_current ASC",
   (error, rows) => {
     console.log('========================================================================');
     console.log(rows);
      console.log('========================================================================');
})

db.all("CREATE VIEW v_topthree AS SELECT COUNT(*) as totalVote,votes.politiciansId,name,party,location FROM votes JOIN politicians ON politicians.politiciansId=votes.politiciansId GROUP BY name ORDER BY totalVote DESC LIMIT 3",
   (error, rows) => {
     //console.log(rows);
})

db.all("SELECT v_topthree.totalVote as totalVote,v_topthree.name,first_name || ' ' || last_name AS voterName ,gender from votes JOIN voters ON voters.votersId=votes.voterId JOIN politicians ON politicians.politiciansId=votes.politiciansId JOIN v_topthree ON politicians.politiciansId=v_topthree.politiciansId GROUP BY voterName ORDER BY totalVote DESC",
   (error, rows) => {
    console.log('========================================================================');
    console.log(rows);
    console.log('========================================================================');
})

db.all("SELECT COUNT(*) AS totalVote ,first_name || ' ' || last_name AS voterName ,gender,age FROM votes JOIN voters ON voters.votersId=votes.voterId GROUP BY voterName HAVING totalVote>1 ORDER BY totalVote DESC",
   (error, rows) => {
    console.log('========================================================================');
    console.log(rows);
    console.log('========================================================================');
})

db.close()
