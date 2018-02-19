const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('pollDB');

db.serialize(function(){
  // 1. nama politisi grade dibawah 9, urutkan asc
  db.all(`SELECT name,location,gradeCurrent, count(*) AS totalVote FROM Votes
  LEFT JOIN Politicians on Votes.politicianId = Politicians.id WHERE gradeCurrent < 9 GROUP BY name
  ORDER BY gradeCurrent ASC`,function(err, rows){
    if(err){
      console.log(err);
    } else {
      console.log(rows);
    }
  });
});

db.close();
