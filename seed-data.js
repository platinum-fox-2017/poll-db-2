// Import SQLite3 Modul
const sqlite3 = require('sqlite3').verbose();

const fs = require('fs')

// Database Object
let db = new sqlite3.Database('poll.db')

class ReadData{
    constructor(){
        this.data = []
    }


    readFile(source,callback){
        fs.readFile(source,'UTF-8', (err, data) => {
            if (err){
                throw err;
            } else{
                let splitData = data.split('\n')
                let newData = []
                for(let i = 0; i < splitData.length; i++){
                    let splitComma = splitData[i].split(",")
                    newData.push(splitComma)
                }
                
                callback(newData)
            }
        });
    }

    processData(source,callback){
        this.readFile(source,(readFileData)=>{
            let convertData = []
            for(let i = 1; i < readFileData.length; i++){
                let obj = {}
                for(let j = 0;j < readFileData[i].length; j++){
                    obj[readFileData[0][j]] = readFileData[i][j]
                }
                convertData.push(obj)
            }

            callback(convertData)
        })
    }

    updateTable(object,nameTable,id){
        let string = `SET `
        let obj = {}
        Object.keys(object).forEach(function(key,index){
            if(index === Object.keys(object).length - 1){
                string += `${key} = $${key}`
            }else{
                string += `${key} = $${key},`
            }
            obj[`$${key}`] = `${object[key]}`
        })
        db.run(`UPDATE ${nameTable}
                    ${string}
                    WHERE id = ${id};`,obj)
    }

    deleteTable(nameTable,id){
        db.run(`DELETE FROM ${nameTable}
                ;`)
    }

    insert(object,nameTable){
        let string = `null, `
        Object.keys(object).forEach((key,index)=>{
            if(key === 'voterId'){
                string += `${Number(object[key])},`
            }else if(key === 'politicianId'){
                string += Number(object[key])
            }else if(key === 'age' && Object.keys(object).length - 1){
                string += Number(object[key])
            }else if(index === Object.keys(object).length - 1){
                string += `"${object[key]}"`
            }else{
                string += `"${object[key]}",`
            }
            
        })
        db.run(`INSERT INTO ${nameTable}
                    VALUES (${string});`)
    }

    seed_data(source,table){
        this.processData(source,(convertData)=>{
            let text = ""
            for(let i = 0; i < convertData.length; i++){
                let string = ""
                Object.keys(convertData[i]).forEach(function(key,index){

                    if(key === 'voterId'){
                        string += `${Number(convertData[i][key])},`
                    }else if(key === 'politicianId'){
                        string += Number(convertData[i][key])
                    }else if(key === 'age' && Object.keys(convertData[i]).length - 1){
                        string += Number(convertData[i][key])
                    }else if(index === Object.keys(convertData[i]).length - 1){
                        string += `"${convertData[i][key]}"`
                    }else{
                        string += `"${convertData[i][key]}",`
                    }
                })
                
                if(i < convertData.length - 1){
                    text += `(null, ${string}),`
                }else{
                    text += `(null, ${string})`
                }
            }
            // db.run(`INSERT INTO ${table}
            //         VALUES ${text};`)
        })
    }

    release0(){
        let query = `SELECT (SELECT name from Politicians WHERE Votes.politicianId = id) AS 'name', 
        (SELECT location from Politicians WHERE Votes.politicianId = id) AS 'location', 
        (SELECT grade_current FROM Politicians where Votes.politicianId = id) AS "grade_current",
        COUNT(politicianId) AS "TOTAL VOTE"
        from votes where 
        politicianId in (SELECT id FROM Politicians)
        group by politicianId
        ORDER BY "grade_current" ASC
        LIMIT 3`

        db.all(query,(err,data)=>{
            console.log(data)
        })
    }

    release1(){
        let query = `select count(Votes.politicianId) as "totalVote", Politicians.id  from Votes join Politicians
                    ON Votes.politicianId = Politicians.id
                    JOIN Voters ON Votes.voterId = Voters.id
                    GROUP BY Votes.politicianId
                    ORDER BY "totalVote" DESC
                    LIMIT 3`
        db.all(query,(err,data)=>{
            
            for(let i = 0; i < data.length; i++){
                let query2 = `select (select count(Votes.politicianId) as "totalVote" from Votes join Politicians
                            ON Votes.politicianId = Politicians.id
                            JOIN Voters ON Votes.voterId = Voters.id
                            WHERE Votes.politicianId = ${data[i].id}) AS 'totalVote', Politicians.name,
                             (Voters.first_name ||" "|| Voters.last_name) AS voterName, Voters.gender FROM VOTES 
                            JOIN Voters ON VOTES.voterId = Voters.id
                            JOIN Politicians ON Votes.politicianId = Politicians.id
                            WHERE Votes.politicianId = ${data[i].id}`
                db.all(query2,(err,data2)=>{
                    console.log(data2)
                })
            }
        })
    }

    release2(){
        let query = `SELECT count(Votes.voterId) AS totalVote, (Voters.last_name ||" "||Voters.first_name) AS name, Voters.gender,Voters.age 
        from Votes JOIN Voters ON Votes.voterId = Voters.id
        GROUP BY Votes.voterId
        ORDER BY totalVote desc`

        db.all(query,(err,data)=>{
            const limit = data.filter(each=>{
                if(each.totalVote > 1){
                    return each
                }
            })
            console.log(limit)
        })
    }
}

let data = new ReadData()

let votersObj = {
    first_name: "Kevin",
    last_name: "Ajah",
    gender: "male",
    age: 24
}

// data.seed_data('votes.csv','Votes')
// Update Param 1 bentuk object, param 2 string nama table
// where for ID
// data.updateTable(votersObj,'Voters',421)
// insert param 1 bentuk object, param 2 nama table
// data.insert(votersObj,'Voters')
// data.deleteTable('Voters',421)
// data.release0()
// data.release1()
// data.release2()





// SELECT count(politicianId) AS 'totalVote',politicianId,
// 	(select name from Politicians where Politicians.id = votes.politicianId ) as PoliticiansName,
// 	(select first_name from VOTERS where Voters.id = Votes.voterId) as voterName,
// 	(select gender from VOTERS where Voters.id = Votes.voterId) as gender,
// 	voterId
// FROM Votes

// group by voterId
// order by voterId DESC
// -- UNION ALL
// -- select id FROM Voters;

// -- WHERE VOTES.politicianId in (SELECT id from Politicians)
// --GROUP BY politicianId
// -- ORDER BY count(politicianId) DESC
