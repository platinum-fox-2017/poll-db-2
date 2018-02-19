"use strict"
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('./voting.db');
var fs = require('fs')
var content_csv = fs.readFileSync('politicians.csv','utf8')
  .toString()
  .trim()
  .split("\n")
  var pisahArr=[];
for(let i=0;i<content_csv.length;i++){
  var pisah=content_csv[i].toString().split(",");
  pisahArr.push(pisah);
}

var votes_csv = fs.readFileSync('votes.csv','utf8')
  .toString()
  .trim()
  .split("\n")
  var pisahArrVotes=[];
for(let i=0;i<votes_csv.length;i++){
  var pisahVotes=votes_csv[i].toString().split(",");
  pisahArrVotes.push(pisahVotes);
}

var voter_csv = fs.readFileSync('voters.csv','utf8')
  .toString()
  .trim()
  .split("\n")
  var pisahArrVoter=[];
for(let i=0;i<voter_csv.length;i++){
  var pisahVoter=voter_csv[i].toString().split(",");
  pisahArrVoter.push(pisahVoter);
}


var arrPol=[]
for(let i=1;i<pisahArr.length;i++){
  var objPol={};
  for(let j=0;j<pisahArr[i].length;j++){
    objPol[pisahArr[0][j]]=pisahArr[i][j];
  }
  arrPol.push(objPol)
}

db.serialize(function() {
  db.run("DELETE FROM politicians");
  let stmt = db.prepare("INSERT INTO politicians (name, party, location,grade_current) VALUES (?,?,?,?)");
      for(let i=0;i<arrPol.length;i++){
        stmt.run(arrPol[i].name,arrPol[i].party,arrPol[i].location,arrPol[i].grade_current);
      }
  stmt.finalize();
});



var arrVotes=[]
for(let i=1;i<pisahArrVotes.length;i++){
  var objVotes={};
  for(let j=0;j<pisahArrVotes[i].length;j++){
    objVotes[pisahArrVotes[0][j]]=pisahArrVotes[i][j];
  }
  arrVotes.push(objVotes)
}


db.serialize(function() {
  db.run("DELETE FROM votes");
  let stmt = db.prepare("INSERT INTO votes (voterId, politiciansId) VALUES (?, ?)");
      for(let i=0;i<arrVotes.length;i++){
         stmt.run(arrVotes[i].voterId,arrVotes[i].politicianId);
      }
  stmt.finalize();
});


var arrVoter=[]
for(let i=1;i<pisahArrVoter.length;i++){
  var objVoter={};
  for(let j=0;j<pisahArrVoter[i].length;j++){
    objVoter[pisahArrVoter[0][j]]=pisahArrVoter[i][j];
  }
  arrVoter.push(objVoter)
}

db.serialize(function() {
  db.run("DELETE FROM voters");
  let stmt = db.prepare("INSERT INTO voters (first_name, last_name,gender,age) VALUES (?,?,?,?)");
      for(let i=0;i<arrVoter.length;i++){
        stmt.run(arrVoter[i].first_name,arrVoter[i].last_name,arrVoter[i].gender,arrVoter[i].age);
      }
  stmt.finalize();
});

db.close();
// for(let i=0;i<arrVoter.length;i++){
//   db.run('INSERT INTO voters (first_name, last_name,gender,age) VALUES ($first_name, $last_name,$gender,$age)', {
//     $first_name: arrVoter[i].first_name,
//     $last_name: arrVoter[i].last_name,
//     $gender: arrVoter[i].gender,
//     $age: arrVoter[i].age,
//   }, function(error) {
//     // handle errors here!
//     if(error){
//       return console.log(error);
//     }
//   });
// }
