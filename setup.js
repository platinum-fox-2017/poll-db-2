//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

const fs = require('fs');
const voters = fs.readFileSync('./voters.csv','utf8').split('\n');
const votes = fs.readFileSync('./votes.csv', 'utf8').split('\n');
const politicians = fs.readFileSync('./politicians.csv','utf8').split("\n");

create_database_politicians();
create_database_voters();
create_database_votes();

db.close();


function create_database_politicians(){
    let tempArr = politicians[0].split(',');
    db.serialize(function(){
        db.run(`DROP TABLE politicians`);
        db.run(`CREATE TABLE IF NOT EXISTS politicians (politicians_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ${tempArr[0]} VARCHAR(50) NOT NULL, ${tempArr[1]} VARCHAR(2) NOT NULL, ${tempArr[2]} VARCHAR(2) NOT NULL, ${tempArr[3]} REAL NOT NULL);`);
        console.log(`Succeed to create politicians table!`);
    });
}

function create_database_voters(){
    let tempArr = voters[0].split(',');
    db.serialize(function(){
        db.run(`DROP TABLE voters`);
        db.run(`CREATE TABLE IF NOT EXISTS voters (voters_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ${tempArr[0]} VARCHAR(20) NOT NULL,${tempArr[1]} VARCHAR(20) NOT NULL,${tempArr[2]} VARCHAR(6) NOT NULL,${tempArr[3]} INTEGER NOT NULL);`);
        console.log(`Succeed to create voters table!`);
    });
}

function create_database_votes(){
    let tempArr = votes[0].split(',');
    db.serialize(function(){
        db.run(`DROP TABLE votes`);
        db.run(`CREATE TABLE IF NOT EXISTS votes (votes_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,${tempArr[0]} INTEGER NOT NULL,${tempArr[1]} INTEGER NOT NULL, FOREIGN KEY (${tempArr[1]}) REFERENCES politicians(${tempArr[1]}),FOREIGN KEY (${tempArr[0]}) REFERENCES voters(${tempArr[0]}));`);
        console.log(`Succeed to create votes table!`);
    });
}
