var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');
var Table = require('cli-table')


function selectPoliticianRating(){
  let query = `SELECT name, location, grade_current, count(votes.politicianId) as totalVote FROM politicians
               INNER JOIN votes ON votes.politicianId = politicians.id
               WHERE grade_current < 9
               GROUP BY name ORDER BY grade_current`
  var table = new Table({
    head: ['Name', 'Location','Grade Current','TotalVote']
  });
  db.all(query,function(err,data){
          // console.log(data);
          for(let i =0;i<data.length;i++){
            table.push(
              [`${data[i].name}`,`${data[i].location}`,`${data[i].grade_current}`,`${data[i].totalVote}`]
            )
          }
            console.log(table.toString())
          }
        )
}

// selectPoliticianRating()



function mostVoters(){
     let subquery = `SELECT votes.politicianId FROM votes
     INNER JOIN politicians ON politicians.id = votes.politicianId
     GROUP BY politicianId
     ORDER BY(select count(*) from votes WHERE votes.politicianId = politicians.id) DESC
     LIMIT 3`
     let query = `SELECT (select count(*) from votes WHERE votes.politicianId = politicians.id) as totalVote,
     politicians.name as politicianName,
     first_name || ' ' || last_name  as voterName,
     gender
     FROM votes
     INNER JOIN voters ON voters.id = votes.voterId
     INNER JOIN politicians ON politicians.id = votes.politicianId
     WHERE politicians.id IN (${subquery}) ORDER BY politicianName DESC`

  var table = new Table({
    head: ['Total Vote', 'Politician Name','Voter Name','Voter Gender']
  });

  db.all(query,function(err,data){
          // console.log(data);
          for(let i =0;i<data.length;i++){
            table.push(
              [`${data[i].totalVote}`,`${data[i].politicianName}`,`${data[i].voterName}`,`${data[i].gender}`]
            )
          }
          console.log(table.toString())
  })
}

mostVoters()

function cheaterVoter(){
  let query = `SELECT (select count(*) from votes
               WHERE votes.voterId = voters.id ) as totalVote, first_name || ' ' || last_name as name, gender, age
               FROM votes
               INNER JOIN voters ON voters.id = votes.voterId GROUP BY name ORDER BY totalVote DESC`
var table = new Table({
 head: ['Total Vote', 'Politician Name','Voter Name','Voter Gender']
});

   db.all(query,function(err,data){
       // console.log(data);
     for(let i =0;i<data.length;i++){
       table.push(
         [`${data[i].totalVote}`,`${data[i].name}`,`${data[i].gender}`,`${data[i].age}`]
       )
     }
     console.log(table.toString())
   })
}

// cheaterVoter()
