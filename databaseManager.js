var firebase = require('firebase');
var firebaseResumeDownloadAdd = null;

export default class DatabaseManager {
//class DatabaseManager {
    constructor(){
        // this.firebase = firebase;
        var con = {
                        apiKey: "AIzaSyCQ1Or7dDhTijwhE4FkQiW9zTuQ_iAr9J8",
                        authDomain: "softwareprojectsprinkles.firebaseapp.com",
                        databaseURL: "https://softwareprojectsprinkles.firebaseio.com",
                        projectId: "softwareprojectsprinkles",
                        storageBucket: "softwareprojectsprinkles.appspot.com",
                        messagingSenderId: "442618048237",
                        appId: "1:442618048237:web:026c24f610d0b299a4a6e4",
                        measurementId: "G-87TYVWLWE7"
                      };



//inside function check before initializing
        if(firebaseResumeDownloadAdd==null){
           firebaseResumeDownloadAdd =
           firebase.initializeApp(con);
           console.log("connection established");
        }
        else{
          console.log("Connection ndot established");
        }



    }



    //Todo make sure duplicates dont leak in
     createEvent( param_list){
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
        Link = param_list[9]

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
            CCSGA_Approved : CCSGA_Approved,
            Link : Link
          });
     }

     addStudent( param_list){
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
             Link = param_list[9]

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
                 CCSGA_Approved : CCSGA_Approved,
                 Link : Link
               });
          }





    //todo reason = "something went wrong" no notes needed
    async getAllEvents() {
        var data_row = {}
        var data = []
        var first_this = this;
        // Package the data nicely for return
        function eventPack( row ) {
                data_row = {
                    "Event_ID" : row.Event_ID ,
                    "Student_ID" : row.Student_ID ,
                    "Event_Name" : row.Event_Name ,
                    "Event_Location" : row.Event_Location,
                    "Event_Description" : row.Event_Description ,
                    "Event_Date" : row.Event_Date,
                    "Event_Start" : row.Event_Start ,
                    "Event_End" : row.Event_End ,
                    "Poster" : row.Poster ,
                    "CCSGA_Approved" : row.CCSGA_Approved,
                    "Link" : row.Link
                }
                return data_row
        }


//        async function getInfo() {
            return new Promise(function(resolve, reject) {

                firebase.database().ref('Events/').on('value', function (big_snapshot) {

                if( !big_snapshot){ reject("its e mpty?")}

                big_snapshot.forEach(function (snapshot) {
                    var obj = snapshot.val();
                    var temp = eventPack(obj);
                    data.push( temp )
                })
                resolve(data)
                });
            });

        //let a = await getInfo()
        return a
    }

    getSpecificEvent( event_id ) {
        var ref = this.firebase.database().ref('Events');
        var query = ref.orderByChild("database/Event_ID").equalTo(event_id);
        query.once("value", function(snapshot) {
          snapshot.forEach(function(child) {
            console.log(child.key, child.val().bio);
          });
        });
    }


     userExistsCallback(event_id, exists) {
      if (exists) {
        console.log('event ' + event_id + ' exists!');
      } else {
        console.log('event ' + event_id + ' does not exist!');
      }
    }

    // Tests to see if /users/<userId> has any data.
    checkIfEventExists(event_id) {
        var ref = firebase.database().ref('Events');
        ref.child(event_id).once('value', function(snapshot) {
        var exists = (snapshot.val() !== null);
        if (exists) {
            console.log('event ' + event_id + ' exists!');
        } else {
            console.log('event ' + event_id + ' does not exist!');
        }
        console.log(snapshot.val())
      });
    }


}

//function test_code(){
//    d = new DatabaseManager();
//    da = []
//    d.getAllEvents().then( data => {
//        console.log(data[0].Event_ID)
//        setTimeout(function(){console.log(data)}, 2000);
//
//    })
//    console.log( da )
//}
//
//test_code();
