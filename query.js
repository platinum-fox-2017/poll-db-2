const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('polldb.db');



// 1.Berapa banyak vote yang diterima Politicians yang memiliki grade di bawah 9
// (gunakan field grade_current)? Tampilkan nama politician, lokasi, grade_current dan jumlah vote-nya. 
// Urutkan berdasarkan grade yang paling kecil.
let query1 = `select Politicians.name, Politicians.location, Politicians.grade_current, count(*)as totalVote from Votes
inner join Politicians on Votes.politicianId= Politicians.id
where Politicians.grade_current<9
group by Politicians.name
order by Politicians.grade_current asc`
db.all(query1,(err,data)=>{
  if(err){
    console.log(err)
  }else{
    // console.log(data)
  }
})



// 2.Tampilkan 3 Politicians yang memiliki vote terbanyak dan siapa saja yang memilih Politician tersebut. 
// List nama politician, total vote, full_name voter-nya dan jenis kelamin pemilih-nya
let idPolitician = `select count (*) as totalVote, Politicians.name as PoliticianName,
Votes.politicianId
from Votes inner join Politicians on Votes.politicianId = Politicians.id
group by Politicians.id
order by totalVote desc
limit 3`
db.all(idPolitician,(err,data)=>{
    // console.log(data)
    for(let i=0;i<data.length;i++){
      // console.log(data[i].politicianId)
      db.all(`select 
      (select count (*) from Votes where Votes.politicianId = ${data[i].politicianId})as totalVote,
      (select name from Politicians where Politicians.id = Votes.politicianId) as PoliticianName,
      (select first_name ||" "||last_name from Voters where Voters.id = Votes.voterId) as voterName,
      (select gender from Voters where Voters.id = Votes.voterId)as gender
      from Votes inner join Voters on Votes.voterId = Voters.id
      where Votes.politicianId = ${data[i].politicianId}`,(errResult,dataList)=>{
        if(errResult){
          console.log(errResult)
        }else{
          console.log(dataList)
        }
      })
    }
  
})
// 3.List nama orang-orang yang melakukan kecurangan, yaitu yang melakukan vote lebih dari satu kali.
// Tampilkan jumlah voting yang dia lakukan, nama lengkap, jenis kelamin dan umur-nya. 
// Urutkan berdasarkan jumlah voting fraud yang banyak dan berdasarkan nama lengkap dari pemilih.
 let query3 = `select count(*) as totalVote,
 (select first_name || " " || last_name from Voters where Voters.id = Votes.voterId)as name,
 Voters.gender,Voters.age from Votes
 inner join Voters on Votes.voterId = Voters.id
 group by Voters.id
 having totalVote >1
 order by totalVote desc
 `
 db.all(query3,(err,data)=>{
   if(err){
     console.log(err)
   }else{
    //  console.log(data)
   }
 })
  
//  select (select first_name || " " || last_name from Voters where Voters.id = Votes.voterId)as name,
//  Votes.politicianId
//  from Votes
//  inner join Voters on Voters.id = Votes.voterId
//  group by Voters.id