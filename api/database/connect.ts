const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "************",
  database: "solrufdata",
});

if(db) {
    console.log('Database Connected')
}

module.exports = db;

// const mysql = require("mysql");
// let db = null;
// const connectDb = (_host: string, _user: string, _password: string, _database: string) => {
//     db = mysql.createPool({
//     host: _host,
//     user: _user,
//     password: _password,
//     database: _database,
//   });

//   if(db != null) {
//     console.log('Database Successfully Connected')
//   }
//   console.log(db)
// };

// module.exports = {connectDb, db}
