var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll.db');

db.serialize(function() {
  db.all(`SELECT name, location, grade_current, (SELECT COUNT(*) FROM Votes WHERE politicianId = Politicians.id) AS totalVote
    FROM Politicians
    WHERE grade_current <= 9 ORDER BY grade_current ASC`, function(err, rows) {
      if(err) {
        console.log(err)
      } else {
        console.log('=====SOAL 1=====');
        console.log(rows);
      }
  });

  db.all(`SELECT totalVote, politicianName, first_name||' '||last_name AS voterName, gender
  FROM (SELECT id, (SELECT COUNT(*) FROM Votes WHERE politicianId = Politicians.id) AS totalVote, Politicians.name AS politicianName
  FROM Politicians ORDER BY totalVote DESC LIMIT 3) AS table4
  LEFT JOIN Votes ON table4.id = Votes.politicianId
  LEFT JOIN Voters ON Votes.voterId = Voters.id
  ORDER BY totalVote DESC`, function(err, rows) {
      if(err) {
        console.log(err)
      } else {
        console.log('=====SOAL 2=====');
        console.log(rows);
      }
  });

  let query = `SELECT (SELECT COUNT(*)
                FROM Votes
                WHERE Votes.voterId = voters.id) AS totalVote,
                (Voters.first_name||' '||Voters.last_name) AS name,
                gender,
                age
                FROM Voters
                WHERE totalVote > 1
                ORDER BY totalVote DESC`;

  db.all(query, function(err, rows) {
      console.log(query);
      if(err) {
        console.log(err)
      } else {
        console.log('=====SOAL 3=====');
        console.log(rows);
      }
  });

});

db.close();
