const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// database
// let poll_db = new sqlite3.Database('./poll.db', function(err){
//   if (err){
//     console.log(err);
//   }
// });
// poll_db.close();

function insertTableData(tableName, tableParams){
  // insert into database
  let poll_db = new sqlite3.Database('./poll.db', function(err){
    if (err){
      console.log(err);
    }
  });
  // prep
  let questionMarks = [];
  // tableParams.forEach(() =>{ questionMarks.push('?') });
  for (let i = 0; i < tableParams.length; i++) {
    questionMarks.push('?');
  }
  poll_db.run(`INSERT INTO ${tableName} VALUES (${questionMarks.join(',')})`, tableParams, function(err){
    if (err) {
      console.log(err);
    } else {
      console.log('saved!')
    }
  });
  poll_db.close();
}

function updateTableData(tableName, columnToUpdate, newValue, whereCond){
  // update into database
  let poll_db = new sqlite3.Database('./poll.db', function(err){
    if (err){
      console.log(err);
    }
  });

  poll_db.run(`UPDATE ${tableName} SET ${columnToUpdate} = '${newValue}' WHERE ${whereCond}`, function(err){
    if (err) {
      console.log(err);
    } else {
      console.log('updated!')
    }
  });
  poll_db.close();
}

function deleteData(tableName, whereCond){
  // delete into database
  let poll_db = new sqlite3.Database('./poll.db', function(err){
    if (err){
      console.log(err);
    }
  });

  poll_db.run(`DELETE FROM ${tableName} WHERE ${whereCond}`, function(err){
    if (err) {
      console.log(err);
    } else {
      console.log('deleted!')
    }
  });
  poll_db.close();
}


function showCompetentPoliticians(party, gradeRange1, gradeRange2) {
  let poll_db = new sqlite3.Database('./poll.db', function(err){
    if (err){
      console.log(err);
    }
  });

  poll_db.all(`SELECT name, party, grade_current FROM politicians WHERE party = '${party}' AND grade_current BETWEEN ${gradeRange1} AND ${gradeRange2} `, function(err, rows){
    if (err) {
      console.log(err);
    } else {
      console.log('data acquired');
      console.log(rows);
    }
  })

  poll_db.close();
}

function countVoteForPol(name) {
  let poll_db = new sqlite3.Database('./poll.db', function(err){
    if (err){
      console.log(err);
    }
  });

  poll_db.get(`SELECT COUNT(*) AS totalVotes, name FROM politicians JOIN votes ON politicians.politicians_id = votes.politicians_id WHERE politicians.name = '${name}'`, function(err, row){
    if (err) {
      console.log(err);
    } else {
      console.log('data acquired');
      console.log(row);
    }
  })
  poll_db.close();
}


function countVoteForPolPartial(namePartial) {
  let poll_db = new sqlite3.Database('./poll.db', function(err){
    if (err){
      console.log(err);
    }
  });

  poll_db.all(`SELECT name, COUNT(votes.voter_id) AS totalVotes FROM politicians JOIN votes ON politicians.politicians_id = votes.politicians_id WHERE politicians.name LIKE '%${namePartial}%' GROUP BY politicians.name`, function(err, rows){
    if (err) {
      console.log(err);
    } else {
      console.log('data acquired');
      console.log(rows);
    }
  })
  poll_db.close();
}

function topThreePolVotes() {
  let poll_db = new sqlite3.Database('./poll.db', function(err){
    if (err){
      console.log(err);
    }
  });

  poll_db.all(`SELECT COUNT(*) AS totalVotes, name, party, location FROM politicians JOIN votes ON politicians.politicians_id = votes.politicians_id GROUP BY politicians.name ORDER BY totalVotes DESC LIMIT 3`, function(err, rows){
    if (err) {
      console.log(err);
    } else {
      console.log('data acquired');
      console.log(rows);
    }
  })
  poll_db.close();
}


function voterForPol(name) {
  let poll_db = new sqlite3.Database('./poll.db', function(err){
    if (err){
      console.log(err);
    }
  });

  poll_db.all(`SELECT voter.first_name, voter.last_name, voter.gender, voter.age FROM politicians JOIN votes ON politicians.politicians_id = votes.politicians_id JOIN voter ON votes.voter_id = voter.voter_id WHERE politicians.name = '${name}';`, function(err, rows){
    if (err) {
      console.log(err);
    } else {
      console.log('data acquired');
      console.log(rows);
    }
  })
  poll_db.close();
}

// Driver code
// ###############################
// insertTableData('voter', [null, 'Teddy', 'Lisman', 'male', '29']);
// updateTableData('voter', 'first_name', 'Fanny', 'voter_id = 154');
// deleteData('voter', 'voter_id = 152');
// showCompetentPoliticians('R', 9, 11)
// countVoteForPol('Olympia Snowe');
// countVoteForPolPartial('Adam');
// topThreePolVotes();
// voterForPol('Olympia Snowe');

// ########### EXPOSE VOTER FRAUD ##############

function showLowGradePol() {
  let poll_db = new sqlite3.Database('./poll.db', function(err){
    if (err){
      console.log(err);
    }
  });

  poll_db.all(`SELECT name, location, grade_current, COUNT(*) AS totalVotes FROM politicians JOIN votes ON politicians.politicians_id = votes.politicians_id WHERE politicians.grade_current < 9 GROUP BY politicians.name ORDER BY politicians.grade_current`, function(err, rows){
    if (err) {
      console.log(err);
    } else {
      console.log('data acquired');
      console.log(rows);
    }
  })
  poll_db.close();
}

function topThreePolVoterNames() {
  let poll_db = new sqlite3.Database('./poll.db', function(err){
    if (err){
      console.log(err);
    }
  });

  poll_db.all(`WITH top_three AS ( SELECT COUNT(*) AS totalVotes, name, party, location FROM politicians JOIN votes ON politicians.politicians_id = votes.politicians_id GROUP BY politicians.name ORDER BY totalVotes DESC LIMIT 3 ) SELECT top_three.totalVotes, politicians.name, voter.first_name || ' ' || voter.last_name AS name, voter.gender FROM politicians JOIN votes ON politicians.politicians_id = votes.politicians_id JOIN voter ON votes.voter_id = voter.voter_id JOIN top_three ON politicians.name = top_three.name GROUP BY voter.first_name ORDER BY top_three.totalVotes DESC `, function(err, rows){
    if (err) {
      console.log(err);
    } else {
      console.log('data acquired');
      console.log(rows);
    }
  })
  poll_db.close();
}

function voterFrauds() {
  let poll_db = new sqlite3.Database('./poll.db', function(err){
    if (err){
      console.log(err);
    }
  });

  poll_db.all(`SELECT COUNT(*) AS totalVotes, voter.first_name || ' ' || voter.last_name AS name, voter.gender, voter.age FROM voter JOIN votes ON voter.voter_id = votes.voter_id GROUP BY name ORDER BY totalVotes DESC `, function(err, rows){
    if (err) {
      console.log(err);
    } else {
      console.log('data acquired');
      console.log(rows);
    }
  })
  poll_db.close();
}



// showLowGradePol()
// topThreePolVoterNames()
voterFrauds()
