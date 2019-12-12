var mysql = require('mysql');

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

const createConnection = function(){
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host     : "eventsdatabasegood.ckdvrhiblj4u.us-east-2.rds.amazonaws.com",
        user     : "Drewship",
        password : "cupcake1234",
        database : "eventdb"
    });
    console.log("Connected to eventdb")
    return con
}

const createEvent = function( con , param_list ){
    con.connect()
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


// The first param is the connection object created by createConnection
// The second param is the callback function, this needs to be the last step
// in the datas journey to avoid callback hell
// see packageResults for an example of a callback function that works
const getAllEvents = function( con , callback){
    sql_get_all_events_current = "SELECT * FROM events LIMIT 2"
        con.query(sql_get_all_events_current, function (err, result) {
          if (err) {
            console.log("Events not got" )
            callback( err , null )

          }
          else {
           var massaged_list = []
            for( i in result){
                var dict = {
                    "Event_ID" : data[i].Event_ID ,
                    "Student_ID" : data[i].Student_ID ,
                    "Event_Name" : data[i].Event_Name ,
                    "Event_Location" : data[i].Event_Location,
                    "Event_Description" : data[i].Event_Description ,
                    "Event_Date" : data[i].Event_Date,
                    "Event_Start" : data[i].Event_Start ,
                    "Event_End" : data[i].Event_End ,
                    "Poster" : data[i].Poster ,
                    "CCSGA_Approved" : data[i].CCSGA_Approved
                }
                massaged_list.push( dict)
            }
            callback(null, massaged_list);
           }
     });
}


// This is an example of a function that can be used as a callback
// for getAllEvents, it has two parameters and views the first as
// An Error
const packageResults =  function( err , data){
    if ( err ) { console.log( err )}
    var return_list = []
     //res.json(data);

    for( i in data){
        var dict = {
            "Event_ID" : data[i].Event_ID ,
            "Student_ID" : data[i].Student_ID ,
            "Event_Name" : data[i].Event_Name ,
            "Event_Location" : data[i].Event_Location,
            "Event_Description" : data[i].Event_Description ,
            "Event_Date" : data[i].Event_Date,
            "Event_Start" : data[i].Event_Start ,
            "Event_End" : data[i].Event_End ,
            "Poster" : data[i].Poster ,
            "CCSGA_Approved" : data[i].CCSGA_Approved

        }

        return_list.push( dict)
    }


}

function main() {

    var con = createConnection()
    //createDatabase(con)
    //createEventsTable(con)
    //createTagsTable( con )
    //p_list = [1223 , 123456 , "test" , "somewhere" , "something" ,"now" , 1 , 2 , null , 1]
    //createEvent( con , p_list )
    getAllEvents( con  , packageResults )
    con.end

}

main()

module.exports ={
    createConnection
}


