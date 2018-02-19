'use strict'
//require database connection and filesync
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data.db')
const fs = require('fs')

//read file from csv
let politiciansData = fs.readFileSync('./politicians.csv', 'utf8').trim().split('\n')
let votersData = fs.readFileSync('./voters.csv', 'utf-8').trim().split('\n')
let votesData = fs.readFileSync('./votes.csv', 'utf-8').trim().split('\n')

//convert data ke object
function convertPolitician(csv) {
    let arr = []
    for (let a = 0; a < csv.length; a++) {
        arr.push(csv[a].split(','))
    }
    let politicianObj = []
    for (let b = 1; b < arr.length; b++) {
        let obj = {}
        for (let c = 0; c < arr[b].length; c++) {
            obj[arr[0][c]] = arr[b][c]
        }
        politicianObj.push(obj)
    }
    return politicianObj
}

function seedData(csv, table) {
    let obj = convertPolitician(csv)
    let text3 = ""
    for (let a = 0; a < obj.length; a++) {
        let count = 0
        let text = ""
        let text2 = ``
        for (let x in obj[a]) { //looping object.keys sebanyak data
            if (obj[a][x].indexOf('\'') != -1) { //cek tanda ' di object
                let temp = ''
                for (let c = 0; c < obj[a][x].length; c++) {
                    if (obj[a][x][c] == "'") {
                        temp += obj[a][x][c] + "'"
                    } else {
                        temp += obj[a][x][c]
                    }
                }
                text += "'" + temp + "'" + ","
            } else if (x === 'age' && count === Object.keys(obj[a]).length - 1) {
                text += +obj[a][x]
            } else if (x === 'age') {
                text += +obj[a][x] + ","
            } else if (count === Object.keys(obj[a]).length - 1) {
                text += "'" + obj[a][x] + "'"
            } else {
                text += "'" + obj[a][x] + "'" + ","
            }
            count++
        }
        text2 += `(null, ${text})`
        if(a < obj.length - 1){
            text3 += text2 + ","
        }else{
            text3 += text2
        }
    }
    db.run(`INSERT INTO ${table} VALUES ${text3}`)
}
//================================= politicians data =====================
function insertDataPoliticians(table, name, party, location, grade_current) {
    db.run(`INSERT INTO ${table} VALUES (null, "${name}", "${party}", "${location}", ${grade_current})`)
}

function updateDataPoliticians(table, name, party, location, grade_current, value) {
    db.run(`UPDATE ${table} SET name="${name}", party="${party}", location="${location}", grade_current=${grade_current} WHERE id = ${value}`)
}

function deleteDataPoliticians(table, value) {
    db.run(`DELETE FROM ${table}  WHERE id = ${value}`)
}
//================================= voters data ===========================
function insertDataVoters(table, first_name, last_name, gender, age) {
    db.run(`INSERT INTO ${table} VALUES (null, "${first_name}", "${last_name}")`)
}

function updateDataVoters(table, first_name, last_name, value) {
    db.run(`UPDATE ${table} SET first_name="${first_name}", last_name="${last_name}" WHERE id = ${value}`)
}

function deleteDataVoters(table, value) {
    db.run(`DELETE FROM ${table} WHERE id = ${value}`)
}
//================================= voter data ============================
function insertDataVotes(table, voterId, politicianId) {
    db.run(`INSERT INTO ${table} VALUES (null, ${voterId}, ${politicianId})`)
}

function updateDataVotes(table, voterId, politicianId, value) {
    db.run(`UPDATE ${table} SET voterId="${voterId}", politicianId="${politicianId}" WHERE id = ${value}`)
}

function deleteDataVotes(table, value) {
    db.run(`DELETE FROM ${table} WHERE id = ${value}`)
}

// seedData(politiciansData, 'Politicians')
// seedData(votersData, 'Voters')
// seedData(votesData, 'Votes')

// console.log(seedData(politiciansData, 'Politicians'))
// console.log(convertPolitician(politiciansData))

// insertDataPoliticians('Politicians', "David", "R", "IL", 7.892)
// updateDataPoliticians('Politicians', "David", "L", "WA", 2.987, 162)
// deleteDataPoliticians('Politicians', 162)


//================================ release 3 ===============================


const gradeData = grade_current => {
    db.all(`SELECT name, location, grade_current, count(votes.politicianId) as totalVote FROM politicians
            INNER JOIN votes ON votes.politicianId = politicians.id  WHERE grade_current < ${grade_current} GROUP BY name ORDER BY grade_current`, (err, row) => {
            if (err) throw err
            console.log(row)
        })
}

const maxVote = () => {
    db.all(`SELECT (select count(*) from votes WHERE votes.politicianId = politicians.id) as totalVote, 
    politicians.name as politicianName, 
    first_name || ' ' || last_name  as voterName, 
    gender 
    FROM votes
    INNER JOIN voters ON voters.id = votes.voterId
    INNER JOIN politicians ON politicians.id = votes.politicianId
    WHERE politicians.id IN (
        SELECT votes.politicianId FROM votes
        INNER JOIN politicians ON politicians.id = votes.politicianId
        GROUP BY politicianId
        ORDER BY(select count(*) from votes WHERE votes.politicianId = politicians.id) DESC
        LIMIT 3) ORDER BY totalVote DESC`, (err, row) => {
            if (err) throw err
            console.log(row)
        });
}

const cheaterVoter = () => {
    db.all(`SELECT (select count(*) from votes WHERE votes.voterId = voters.id ) as totalVote, first_name || ' ' || last_name as name, gender, age FROM votes
    INNER JOIN voters ON voters.id = votes.voterId GROUP BY name ORDER BY totalVote DESC `, (err, row) => {
            if (err) throw err
            console.log(row)
        })
}

gradeData(9)
maxVote()
cheaterVoter()