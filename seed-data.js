//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

const fs = require('fs');
const voters = fs.readFileSync('./voters.csv','utf8').split('\n');
const votes = fs.readFileSync('./votes.csv', 'utf8').split('\n');
const politicians = fs.readFileSync('./politicians.csv','utf8').split("\n");

write_database(politicians,'politicians');
write_database(voters,'voters');
write_database(votes,'votes');

db.close();


function write_database(arr,table){
    db.serialize(function(){
        for(let i = 1; i < arr.length-1; i++){
            db.run(`INSERT INTO ${table} VALUES (null,${convert_array_value(arr[i])})`);
        }
        console.log(`Succeed to insert ${table} data to database`);
    });
}

function convert_array_value(arr){
    let tempArr = arr.split(',');
    for(let i = 0;i<tempArr.length;i++){
        if(typeof tempArr[i] == 'string'){
            tempArr[i] = `"${tempArr[i]}"`
        }
    }
    return tempArr.join(',');
}

function delete_data(table,id){
    db.serialize(function(){
        db.run(`DELETE FROM ${table} WHERE id = ${id}`);
        console.log(`Deleted data ${id}`);
    });
}

function update_data(table,id,parameter,data){
    db.serialize(function(){
        db.run(`UPDATE ${table} SET ${parameter} = ${data} WHERE id = ${id}`);
        console.log(`Update ${parameter} to ${data} in ${id}`);
    });
}
