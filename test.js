var mysql = require('mysql');



//function myFunc( con ) {
//  con.connect(function(err) {
//    if (err) throw err;
//    console.log("Connected!");
//    con.query("CREATE DATABASE IF NOT EXISTS eventdb", function (err, result) {
//      if (err) throw err;
//      console.log("Database created");
//      con.end();
//    });
//    });
//}

function createDatabase( con ) {
    con.query("CREATE DATABASE IF NOT EXISTS eventdb", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
}

function createEventsTable( con ) {

    var sql_create_table = " CREATE TABLE IF NOT EXISTS events ( \
                               Event_ID INTEGER NOT NULL PRIMARY KEY, \
                               Student_ID INTEGER NOT NUll, \
                               Event_Name TEXT NOT NULL, \
                               Event_Location TEXT NOT NULL, \
                               Event_Description TEXT, \
                               Event_Date TEXT NOT NULL, \
                               Event_Start TEXT NOT NULL, \
                               Event_End TEXT, \
                               Tags TEXT, \
                               Poster Blob, \
                               CCSGA_Approved INTEGER NOT NULL); ";


    con.query(sql_create_table, function (err, result) {
      if (err) throw err;
      console.log("Events table created");
    });
}

function createTagsTable( con ) {

    var sql_create_table = " CREATE TABLE IF NOT EXISTS taggedEvents ( \
                             TagName TEXT NOT NULL, \
                             EventID INTEGER NOT NUll);";



    con.query(sql_create_table, function (err, result) {
      if (err) throw err;
      console.log("Events table created");
    });
}

function createTagsTable( con ) {

    var sql_create_table = " CREATE TABLE IF NOT EXISTS taggedEvents ( \
                             TagName TEXT NOT NULL, \
                             EventID INTEGER NOT NUll);";



    con.query(sql_create_table, function (err, result) {
      if (err) throw err;
      console.log("Events table created");
    });
}


function main() {

    var con = mysql.createConnection({
      host : "localhost",
      user : "root",
      password : "cupcake123",
      database : "eventdb"
    });
    con.connect()
    createDatabase(con)
    createEventsTable(con)
    createTagsTable( con )
    con.end

}

main()