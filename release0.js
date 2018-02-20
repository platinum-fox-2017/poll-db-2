var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('poll2.db');

db.serialize(function() {

    db.all("SELECT name, location, grade_current, (SELECT COUNT(*) FROM votes WHERE politiciansId = politicians.id) AS totalVote FROM politicians ORDER BY grade_current LIMIT 3", [], function(err, row){
        if(err){ console.log(err)}
        else{ console.log(row)}
    });

    db.all("SELECT name AS politicianName,(SELECT COUNT(*) FROM votes WHERE politiciansId = politicians.id) AS totalVote FROM politicians ORDER BY totalVote DESC LIMIT 3", [], function(err, row){
        if(err){console.log(err)}
        else{console.log(row)}
    });


});
 
db.close();
