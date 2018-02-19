const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// const db = new sqlite3.Database('./poll.db');

// let politicians = fs.readFileSync('./politicians.csv', 'utf8').trim().split('\n');
// let voters = fs.readFileSync('./voters.csv', 'utf8').trim().split('\n');
// let votes = fs.readFileSync('./votes.csv', 'utf8').trim().split('\n');

function newData(namaTable, name, party, location, grade_current) {
  const db = new sqlite3.Database('./poll.db');
  let temp = fs.readFileSync(`./${namaTable}.csv`, 'utf8').trim().split('\n');

  var stmt = db.prepare(`INSERT INTO ${namaTable}(name, party, location, grade_current) VALUES (?, ?, ?, ?)`);
  stmt.run([name, party, location, grade_current]);
  stmt.finalize();
  console.log(`Berhasil menambah data ${namaTable}`);
}

// newData('politicians','wika', 'w', 'ny', 11.2231231)

function deleteData(namaTable, id) {
  const db = new sqlite3.Database('./poll.db');
  let temp = fs.readFileSync(`./${namaTable}.csv`, 'utf8').trim().split('\n');

  var stmt = db.prepare(`DELETE FROM ${namaTable} WHERE id = ?`);
  stmt.run([id]);
  stmt.finalize();
  console.log(`Berhasil menghapus data ${id} pada table ${namaTable}`);
}

// deleteData('politicians',22);

function updateData(namaTable, colomnName, colomnValue, id) {
  const db = new sqlite3.Database('./poll.db');
  let temp = fs.readFileSync(`./${namaTable}.csv`, 'utf8').trim().split('\n');

  var stmt = db.prepare(`UPDATE ${namaTable} SET ${colomnName} = ? WHERE id = ?`);
  stmt.run([colomnValue, id]);
  stmt.finalize();
  console.log(`Berhasil mengupdate data ${id} pada table ${namaTable}`);
}

updateData('politicians','party','R',1);
