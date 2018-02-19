const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// database
let poll_db = new sqlite3.Database('./poll.db', function(err){
  if (err){
    console.log(err);
  }
});

poll_db.serialize(function(){

  poll_db.run('CREATE TABLE IF NOT EXISTS politicians (politicians_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT, party TEXT, location TEXT, grade_current REAL)', function(err){
    if (err){
      console.log(err);
    }
  })

  poll_db.run('CREATE TABLE IF NOT EXISTS voter (voter_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, gender TEXT, age INTEGER)', function(err){
    if (err){
      console.log(err);
    }
  })

  poll_db.run('CREATE TABLE IF NOT EXISTS votes (votes_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, voter_id INTEGER, politicians_id INTEGER, FOREIGN KEY (politicians_id) REFERENCES politicians(politicians_id), FOREIGN KEY (voter_id) REFERENCES voter(voter_id))', function(err){
    if (err){
      console.log(err);
    }
  })

})


poll_db.close()
