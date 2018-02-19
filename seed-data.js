const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// read csv
let politicians = fs.readFileSync('./politicians.csv', 'utf8').trim().split('\n')
let voters  = fs.readFileSync('./voters.csv', 'utf8').trim().split('\n')
let votes   = fs.readFileSync('./votes.csv', 'utf8').trim().split('\n')


// database
let poll_db = new sqlite3.Database('./poll.db', function(err){
  if (err) {
    console.error(err.message);
  }
});

poll_db.serialize(function(){

  // prep
  let inputPol = poll_db.prepare('INSERT INTO politicians (name, party, location, grade_current) VALUES (?, ?, ?, ?)', function(err){
    if (err) {
      console.log(err);
    }
  });

  for (let i = 1; i < politicians.length; i++) {
    let data = politicians[i].split(',')
    inputPol.run(data[0], data[1], data[2], data[3]);
  }

  inputPol.finalize();


  // prep
  let inputVoter = poll_db.prepare('INSERT INTO voter (first_name, last_name, gender, age) VALUES (?, ?, ?, ?)', function(err){
    if (err) {
      console.log(err);
    }
  });

  for (let i = 1; i < voters.length; i++) {
    let data = voters[i].split(',')
    inputVoter.run(data[0], data[1], data[2], data[3]);
  }

  inputVoter.finalize();


  // prep
  let inputVotes = poll_db.prepare('INSERT INTO votes (voter_id, politicians_id) VALUES (?, ?)', function(err){
    if (err) {
      console.log(err);
    }
  });

  for (let i = 1; i < votes.length; i++) {
    let data = votes[i].split(',')
    inputVotes.run(data[0], data[1]);
  }

  inputVotes.finalize();

})


poll_db.close()
