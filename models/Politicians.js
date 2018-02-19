
const sqlite3 = require('sqlite3').verbose();

function insertPolitician(name,party,location, grade_current){
  const db = new sqlite3.Database('poll');
  db.serialize(function() {
    const stmt = db.prepare("INSERT INTO Politicians (name, party, location, grade_current) VALUES (?,?,?,?)");
    stmt.run([name,party,location,grade_current]);
    stmt.finalize();
    console.log("Berhasil Memasukkan Data Politician");
  });
  db.close();
}
function updatePolitician(id,name,party,location, grade_current){
  const db = new sqlite3.Database('poll');
  db.serialize(function() {
    const stmt = db.prepare("UPDATE Politicians SET name = ?, party = ?, location = ?, grade_current = ? WHERE id = ?");
    stmt.run([name,party,location,grade_current,id]);
    stmt.finalize();
    console.log("Berhasil Merubah Data Politician");
  });
  db.close();
}
function deletePolitician(id){
  const db = new sqlite3.Database('poll');
  db.serialize(function() {
    const stmt = db.prepare("DELETE FROM Politicians WHERE id = ?");
    stmt.run(id);
    stmt.finalize();
    console.log("Berhasil Menghapus Data Politician");
  });
  db.close();
}
module.exports = {
  insertPolitician: insertPolitician,
  updatePolitician: updatePolitician,
  deletePolitician: deletePolitician
}
