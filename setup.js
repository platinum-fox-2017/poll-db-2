//your code here

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll_data.db');
 
db.serialize(function() {
    db.run("DROP TABLE IF EXISTS Politicians");
    db.run("CREATE TABLE IF NOT EXISTS Politicians (ID INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, partai TEXT, location TEXT, gradeCurrent REAL)"); 
    console.log('Tabel Politicians sudah berhasil dibuat !');
    
    db.run("DROP TABLE IF EXISTS Voters");
    db.run("CREATE TABLE IF NOT EXISTS Voters (ID INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, gender TEXT, Age INTEGER)"); 
    console.log('Tabel Voters sudah berhasil dibuat !');

    db.run("DROP TABLE IF EXISTS Politicians_Voters");
    db.run("CREATE TABLE IF NOT EXISTS Politicians_Voters (ID INTEGER PRIMARY KEY AUTOINCREMENT, polID INTEGER, votersID INTEGER, FOREIGN KEY (polID) REFERENCES Politicians (ID), FOREIGN KEY (votersID) REFERENCES Voters (ID))"); 
    console.log('Tabel Votes sudah berhasil dibuat !');
});
db.close();

/*
function convertDataPoltoArr(arrData) { // create nested array data poll
    var arrPol = [];
    for (var i = 0; i < arrData.length; i++) {
        arrPol.push(arrData[i].split(','));   
    }
    return arrPol;
}

function arrObjPol() {
    var nestedArr = convertDataPoltoArr(pol_data);
    var arrHasil = [];
    for (var i = 1; i < nestedArr.length; i++) {
        var emptyObj = {};
        for (var j = 0; j < nestedArr[i].length; j++) {
            emptyObj[nestedArr[0][j]] = nestedArr[i][j];
        }
        arrHasil.push(emptyObj);
    }
    return arrHasil;
}

// console.log(arrObjPol());
*/