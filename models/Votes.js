const sqlite3 = require('sqlite3').verbose();

function insertVotes(voterId,politicianId){
  const db = new sqlite3.Database('poll');
  db.serialize(function() {
    const stmt = db.prepare("INSERT INTO Votes (voterId, politicianId) VALUES (?,?)");
    stmt.run([voterId,politicianId]);
    stmt.finalize();
    console.log("Berhasil Memasukkan Data Votes");
  });
  db.close();
}
function updateVotes(id,voterId,politicianId){
  const db = new sqlite3.Database('poll');
  db.serialize(function() {
    const stmt = db.prepare("UPDATE Votes SET voterId = ?, politicianId = ? WHERE id = ?");
    stmt.run([voterId,politicianId,id]);
    stmt.finalize();
    console.log("Berhasil Merubah Data Votes");
  });
  db.close();
}
function deleteVotes(id){
  const db = new sqlite3.Database('poll');
  db.serialize(function() {
    const stmt = db.prepare("DELETE FROM Votes WHERE id = ?");
    stmt.run(id);
    stmt.finalize();
    console.log("Berhasil Menghapus Data Votes");
  });
  db.close();
}
module.exports = {
  insertVotes: insertVotes,
  updateVotes: updateVotes,
  deleteVotes: deleteVotes
}
