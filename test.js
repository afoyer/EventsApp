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
                               Event_Start INTEGER NOT NULL, \
                               Event_End INTEGER NOT NULL, \
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




function createEvent( con , param_list ){
    sql_add_event = "INSERT INTO events (Event_ID , Student_ID , \
                                         Event_Name , Event_Location, \
                                         Event_Description , Event_Date, \
                                         Event_Start , Event_End , \
                                         Poster , CCSGA_Approved) \
                     VALUES( ? , ? , ? , ? , ? , ?, ? , ? , ? ,?)"


    con.query(sql_add_event, param_list,  function (err, result) {
          if (err) throw err;
          console.log("Event " + Event_ID + " added");
     });
}

exports.getAllEvents = function( con , callBack){
    sql_get_all_events_current = "SELECT * FROM events"

        con.query(sql_get_all_events_current,  function (err, result) {
              if (err) throw err;
              console.log("Events grabbed");
         });


}



function main() {
    var mysql = require('mysql');
    var con = mysql.createConnection({
      host     : "eventsdatabasegood.ckdvrhiblj4u.us-east-2.rds.amazonaws.com",
      user     : "Drewship",
      password : "Iolani1234",
      database : "eventdb"

    });
    con.connect()
    createDatabase(con)
    createEventsTable(con)
    createTagsTable( con )
    p_list = [5 , 123456 , "test" , "somewhere" , "something" ,"now" , 1 , 2 , null , 1]
    createEvent( con , p_list )
    //var result = getEvents( con );
   con.end

}

main()