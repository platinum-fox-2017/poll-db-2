const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('poll');
db.serialize(() => {
  //berapa banyak vote yang diterima Politicians yang memiliki grade di bawah 9
  query = "SELECT COUNT(*) AS totalVotes , Politicians.* FROM Votes ";
  query += "LEFT JOIN Politicians ON Politicians.id = Votes.politicianId ";
  query += "WHERE Politicians.grade_current < 9 "
  query += "GROUP BY Politicians.name ORDER BY totalVotes ASC ";
  db.each(query,(err,row) =>{
    if (err) {
      console.log(err);
    } else {
      console.log(`Name: ${row.name}, Location: ${row.location}, Grade Current: ${row.grade_current}, Total Vote: ${row.totalVotes}`);
    }
  });
  //3 Politicians yang memiliki vote terbanyak dan siapa saja yang memilih politician tersebut
  // console.log('Politicians yang grade nya di bawah 9')
  query = "SELECT  Voters.*, Politicians.*,( "
  query += "SELECT COUNT(*) FROM Votes"
  query += " WHERE Politicians.id = Votes.politicianId  ";
  query += ") AS totalVotes  FROM Votes  "
  query += "LEFT JOIN Voters ON Voters.id = Votes.voterId "
  query += "LEFT JOIN Politicians ON Politicians.id = Votes.politicianId "
  query += "WHERE Votes.politicianId IN ("
  query += "SELECT  Politicians.id FROM Votes ";
  query += "LEFT JOIN Politicians ON Politicians.id = Votes.politicianId ";
  query += "GROUP BY Politicians.name ORDER BY COUNT(*) DESC  LIMIT 3 )";
  query += "ORDER BY politicianId"
  db.each(query,(err,row) =>{
    if (err) {
      console.log(err);
    } else {
      console.log(`Full Name: ${row.first_name} ${row.last_name}, Voter Gender: ${row.gender} Politician Name: ${row.name}, Total Vote: ${row.totalVotes}`);
    }
  });
  //tampilkan voter yang melakukan vote lbih dari satu kali,
  query = "SELECT COUNT(*) AS totalVotes, Voters.* FROM Votes  "
  query += "LEFT JOIN Voters ON Voters.id = Votes.voterId "
  query += "GROUP BY voterId  HAVING totalVotes > 1"
  db.each(query,(err,row) =>{
    if (err) {
      console.log(err);
    } else {
      console.log(`Full Name: ${row.first_name} ${row.last_name}, Voter Gender: ${row.gender} , Voter Age: ${row.age} , Total Vote: ${row.totalVotes}`);
    }
  });
})
