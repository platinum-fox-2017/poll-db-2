const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('pollDB');

db.serialize(function(){
  // 1. nama politisi grade dibawah 9, urutkan asc
  // db.all(`SELECT name,location,gradeCurrent,COUNT(*) AS totalVote
  // FROM Votes
  // JOIN Politicians on
  //   Votes.politicianId = Politicians.id
  // WHERE gradeCurrent < 9
  // GROUP BY name
  // ORDER BY gradeCurrent ASC`,function(err, rows){
  //   if(err){
  //     console.log(err);
  //   } else {
  //     console.log(rows);
  //   }
  // });

  // 2. 3 politisi dengan vote terbanyak dan siapa saja yang memilih politisi tersebut
  db.all(`SELECT totalVote, politicianName, firstName||' '||lastName AS voterName, gender, Three.id
  FROM (SELECT count(*) AS totalVote, name AS politicianName, Politicians.id FROM Votes
  JOIN Politicians ON Votes.politicianId = Politicians.id GROUP BY name ORDER BY totalVote DESC
  LIMIT 3) AS Three
  JOIN Votes ON Votes.politicianId = Three.id
  JOIN Voters ON Voters.id = Votes.voterId
  ORDER BY Three.id DESC`
  , function(err,rows){
    if(err){
      console.log(err);
    } else {
      console.log(rows);
    }
  }); // belom selesai

  // 3. orang curang vote >1
  // db.all(`SELECT count(*) AS totalVote, firstName||' '||lastName AS name, gender, age
  // FROM Votes
  // JOIN Voters
  //   ON Voters.id = Votes.voterId
  // GROUP BY name
  // HAVING totalVote > 1
  // ORDER BY totalVote DESC`, function(err,rows){
  //   if(err){
  //     console.log(err);
  //   } else {
  //     console.log(rows);
  //   }
  // });
});

db.close();
