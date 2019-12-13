const firebase = require('firebase');
//var admin = require("firebase-admin");


var firebaseConfig = {
    apiKey: "AIzaSyCQ1Or7dDhTijwhE4FkQiW9zTuQ_iAr9J8",
    authDomain: "softwareprojectsprinkles.firebaseapp.com",
    databaseURL: "https://softwareprojectsprinkles.firebaseio.com",
    projectId: "softwareprojectsprinkles",
    storageBucket: "softwareprojectsprinkles.appspot.com",
    messagingSenderId: "442618048237",
    appId: "1:442618048237:web:026c24f610d0b299a4a6e4",
    measurementId: "G-87TYVWLWE7"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
//console.log( firebase )


//Todo make sure duplicates dont leak in
function createEvent(param_list){
    Event_ID = param_list[0]
    Student_ID = param_list[1]
    Event_Name = param_list[2]
    Event_Location= param_list[3]
    Event_Description = param_list[4]
    Event_Date= param_list[5]
    Event_Start = param_list[6]
    Event_End = param_list[7]
    Poster = param_list[8]
    CCSGA_Approved = param_list[9]


    var usersRef = firebase.database().ref("Events");

    usersRef.child(Event_ID).set({
        Event_ID : Event_ID,
        Student_ID : Student_ID,
        Event_Name : Event_Name,
        Event_Location : Event_Location,
        Event_Description : Event_Description,
        Event_Date: Event_Date,
        Event_Start : Event_Start,
        Event_End : Event_End,
        Poster : Poster,
        CCSGA_Approved : CCSGA_Approved
      });
 }

function getAllEvents() {
    firebase.database().ref('Events/').on('value', function (snapshot) {
        list = snapshot.val()
        console.log( list[0])
    });
}

function getSpecificEvent( event_id ) {
    var ref = firebase.database().ref('Events');
    var query = ref.orderByChild("database/Event_ID").equalTo(event_id);
    query.once("value", function(snapshot) {
      snapshot.forEach(function(child) {
        console.log(child.key, child.val().bio);
      });
    });
}


function userExistsCallback(event_id, exists) {
  if (exists) {
    console.log('event ' + event_id + ' exists!');
  } else {
    console.log('event ' + event_id + ' does not exist!');
  }
}

// Tests to see if /users/<userId> has any data.
function checkIfUserExists(event_id) {
    var ref = firebase.database().ref('Events');
    ref.child(event_id).once('value', function(snapshot) {
    var exists = (snapshot.val() !== null);
    userExistsCallback(event_id, exists);
    console.log(snapshot.val())
  });
}


//createEvent( [113 , 123456 , "test" , "somewhere" , "something" ,"now" , 1 , 2 , null , 1] )
//createEvent( [113 , 123456 , "blah" , "somewhere" , "something" ,"now" , 1 , 2 , null , 1] )
//createEvent( [23 , 123456 , "test" , "somewhere" , "something" ,"now" , 1 , 2 , null , 1] )

checkIfUserExists( 113 )
checkIfUserExists( 123 )



