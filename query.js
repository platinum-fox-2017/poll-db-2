const sqlite3 = require('sqlite3').verbose();
const pathDB = './poll';

function query(sqlScript, callback) {
	let db = new sqlite3.Database(pathDB);
	 
	db.all(sqlScript, [], (err, rows) => {
	  if (err) {
	    throw err;
	  }
	  callback(rows);
	});
	 
	db.close();
}

// Output 1
query(`	SELECT name, location, grade_current, (SELECT COUNT(*) FROM Votes WHERE Votes.politicianId = Politicians.id) AS totalVote
		FROM Politicians 
		WHERE grade_current < 9
		ORDER BY totalVote ASC`, function (rows) {
	console.log(rows);
});

// Output 2
query(`	SELECT (SELECT COUNT(*) FROM Votes WHERE Votes.politicianId = Politicians.id) AS totalVote, Politicians.name AS politicianName, (Voters.first_name || ' ' || Voters.last_name) AS voterName, Voters.gender
		FROM Politicians
		LEFT JOIN Votes
			ON Politicians.id = Votes.politicianId
		LEFT JOIN Voters
			ON Votes.voterId = Voters.id
		WHERE Politicians.name IN (SELECT name FROM (SELECT (SELECT COUNT(*) FROM Votes WHERE Votes.politicianId = Politicians.id) AS totalVote, name
									FROM Politicians
									ORDER BY totalVote DESC
									LIMIT 0, 3))
		ORDER BY totalVote DESC`, function (rows) {
	console.log(rows);
});

// Output 3
query(`	SELECT (SELECT COUNT(*) FROM Votes WHERE Votes.voterId = Voters.id) AS totalVote, (Voters.first_name || ' ' || Voters.last_name) AS name, gender, age
		FROM Voters
		WHERE totalVote > 1
		ORDER BY totalVote DESC`, function (rows) {
	console.log(rows);
});