const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll_data.db');

var pol_data = fs.readFileSync('./politicians.csv', 'UTF-8').trim().split('\r\n');
var voters_data = fs.readFileSync('./voters.csv', 'UTF-8').trim().split('\r\n');
var vote_data = fs.readFileSync('./votes.csv', 'UTF-8').trim().split('\r\n');

// INSERT FUNCTION
function insertData(tableName,name,partai,location,gradeCurrent) {
    db.serialize(function() {
        var stmt = db.prepare(`INSERT INTO ${tableName}(name,partai,location,gradeCurrent) VALUES (?,?,?,?)`);
        stmt.run([name,partai,location,gradeCurrent]);
        stmt.finalize();
        console.log(`Berhasil insert data BARU ke dalam tabel ${tableName}!`);
    });
}

// UPDATE FUNCTION
function updateData(tableName,changedData,newInput,id) {
    db.serialize(function() {
        var stmt = db.prepare(`UPDATE ${tableName} SET ${changedData} = ? WHERE ID = ?`);
        stmt.run([newInput,id]);
        stmt.finalize();
    });
    console.log(`Berhasil UPDATE data BARU ke dalam tabel ${tableName}!`);
}

// DELETE FUNCTION
function deleteData(tableName,id) {
    db.serialize(function() {
        var stmt = db.prepare(`DELETE FROM ${tableName} WHERE ID = ?`);
        stmt.run([id]);
        stmt.finalize();
    });
    console.log(`Berhasil DELETE data ke dalam tabel ${tableName}!`);
}


// // TEST CASE RELEASE 2
// updateData('Politicians','name','sebastian',21);
// insertData('Politicians','marco','R','JK',8.995621754);
// deleteData('Politicians',22);