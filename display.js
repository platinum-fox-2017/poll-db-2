const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('poll');
db.serialize(() => {
  let query = "SELECT * FROM Politicians WHERE party = 'R' AND grade_current >= 9 AND grade_current <= 11";
  db.each(query,(err,row) =>{
    console.log(`Name: ${row.name} , Party: ${row.party}, Grade Current: ${row.grade_current}`);
  });
  query = "SELECT COUNT(*) AS totalVotes , Politicians.name AS name FROM Votes ";
  query += "LEFT JOIN Politicians ON Politicians.id = Votes.politicianId ";
  query += "WHERE Politicians.name = 'Olympia Snowe'";
  db.each(query,(err,row) =>{
    console.log(`Total Votes: ${row.totalVotes} , Name: ${row.name}`);
  });
  console.log('Yang Namanya Ada Adamnya');
  query = "SELECT COUNT(*) AS totalVotes , Politicians.name AS name FROM Votes ";
  query += "LEFT JOIN Politicians ON Politicians.id = Votes.politicianId ";
  query += "WHERE Politicians.name LIKE '%Adam%' GROUP BY Politicians.name";
  db.each(query,(err,row) =>{
    console.log(`Total Votes: ${row.totalVotes} , Name: ${row.name}`);
  });
  console.log('3 Suara Terbanyak');
  query = "SELECT COUNT(*) AS totalVotes , Politicians.name AS name FROM Votes ";
  query += "LEFT JOIN Politicians ON Politicians.id = Votes.politicianId ";
  query += "GROUP BY Politicians.name ORDER BY totalVotes DESC LIMIT 3";
  db.each(query,(err,row) =>{
    console.log(`Total Votes: ${row.totalVotes} , Name: ${row.name}`);
  });
  console.log('Yang Milih Olympia Snowe');
  query = "SELECT Voters.* FROM Votes ";
  query += "LEFT JOIN Politicians ON Politicians.id = Votes.politicianId ";
  query += "LEFT JOIN Voters ON Voters.id = Votes.voterId ";
  query += "WHERE Politicians.name = 'Olympia Snowe'";
  db.each(query,(err,row) =>{
    console.log(`First Name : ${row.first_name}, Last Name : ${row.last_name}, Gender : ${row.gender}, Age: ${row.age}`);
  });
})
