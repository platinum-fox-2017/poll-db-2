const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('../poll-db-1/pool1.db');

db.serialize(function() {

  db.all("SELECT politik.name,politik.location,politik.grade_current,COUNT(*) AS totalvote FROM votes LEFT JOIN politik ON votes.politikid=politik.id_politik where politik.grade_current<9 GROUP BY politik.name ORDER BY politik.grade_current ASC",function(err,rows) {
    if (err) {
      return console.error(err.message);
    }else{
      console.log();
      console.log('========total vote olympia snowe======');

      return console.log(rows)
    }
  });
});

db.serialize(function() {

  db.all("SELECT totalvote,politikname,voters.first_name||' '||voters.last_name AS votername,voters.gender FROM (SELECT COUNT(*) AS totalvote,politik.name as politikname,politik.id_politik AS politikids FROM votes LEFT JOIN politik ON votes.politikid=politik.id_politik GROUP BY politik.name ORDER BY totalvote DESC LIMIT 3) AS toptree LEFT JOIN votes ON Votes.politikid = toptree.politikids LEFT JOIN voters ON voters.id_voters = votes.voterid",function(err,rows) {
    if (err) {
      return console.error(err.message);
    }else{
      console.log();
      console.log('========3 vote teratas======');

      return console.log(rows)
    }
  });
});

db.serialize(function() {

  db.all("SELECT COUNT (*) AS totalvote,voters.first_name||' '||voters.last_name AS firstname,voters.gender,voters.age FROM votes LEFT JOIN voters ON votes.voterid=voters.id_voters GROUP BY firstname HAVING totalvote > 1 ORDER BY totalvote DESC",function(err,rows) {
    if (err) {
      return console.error(err.message);
    }else{
      console.log();
      console.log('========tampilkan yang curang======');

      return console.log(rows)
    }
  });
});
