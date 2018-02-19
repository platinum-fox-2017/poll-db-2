const sqlite3 = require('sqlite3').verbose();

function insertVoter(first_name,last_name,gender, age){
  const db = new sqlite3.Database('poll');
  db.serialize(function() {
    const stmt = db.prepare("INSERT INTO Voters (first_name, last_name, gender,age) VALUES (?,?,?,?)");
    stmt.run([first_name,last_name,gender,age]);
    stmt.finalize();
    console.log("Berhasil Memasukkan Data Voter");
  });
  db.close();
}
function updateVoter(id,first_name,last_name,gender, age){
  const db = new sqlite3.Database('poll');
  db.serialize(function() {
    const stmt = db.prepare("UPDATE Voters SET first_name = ?, last_name = ?, gender = ?, age = ? WHERE id = ?");
    stmt.run([first_name,last_name,gender,age,id]);
    stmt.finalize();
    console.log("Berhasil Merubah Data Voter");
  });
  db.close();
}
function deleteVoter(id){
  const db = new sqlite3.Database('poll');
  db.serialize(function() {
    const stmt = db.prepare("DELETE FROM Voters WHERE id = ?");
    stmt.run(id);
    stmt.finalize();
    console.log("Berhasil Menghapus Data Voter");
  });
  db.close();
}
module.exports = {
  insertVoter: insertVoter,
  updateVoter: updateVoter,
  deleteVoter: deleteVoter
}
