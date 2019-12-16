var firebase = require('firebase');
//var firebase = require( '@firebase/app' )
//var File = require('File')
var firebaseResumeDownloadAdd = null;
var imageToBlob = require( 'image-to-blob' )

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
          //console.log("Connectionot established");
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
        Link = param_list[10]
        Tags = param_list[11]

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
            Link : Link,
            Tags : Tags
          });

     }

    addStudent( param_list){
        Student_ID = 0
        Number_of_events = 0
        Student_Name = 1
        Student_Photo  = 1

        var usersRef = firebase.database().ref("Students");
        usersRef.child(Student_ID).set({
            Student_ID : Student_ID,
            Number_of_events : Number_of_events,
            Student_Name : Student_Name,
            Student_Photo  : Student_Photo,
        });
    }

    getStudent( student_ID ){
        var ref = this.firebase.database().ref('Events');
        var query = ref.orderByChild("database/Event_ID").equalTo(event_id);
        query.once("value", function(snapshot) {
            snapshot.forEach(function(child) {
                console.log(child.key, child.val().bio);
            });
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
                    "Link" : row.Link,
                    "Tags" : row.Tags
                }
                return data_row
        }


//        async function getInfo() {
            return new Promise(function(resolve, reject) {

                firebase.database().ref('Events/').on('value', function (big_snapshot) {

                if( !big_snapshot){ reject("its empty?")}

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

    formatImg ( img_uri , id ){
        async function uriToBlob( uri ){
              const response = await fetch(uri);
              const blob = await response.blob();
              return blob;
        }
        // Todo this is a mess, promise or not?
        var storageRef = firebase.storage().ref();
        return new Promise(function(resolve, reject) {
            uriToBlob( img_uri ).then( blob => {
                storageRef.child("uploads/"+id+".jpg").put(blob, {
                    contentType: 'image/jpeg'
                    }).then((snapshot)=>{
                       blob.close(); // let's free up the blob
                       var name = resolve( snapshot.metadata.fullPath)
                       if(!name){
                            reject("stinky err message")
                       }
                       else{
                          resolve(name)
                       }
                    });
            });
        });
    }

    async getImgByPath(path){
        return new Promise( async function(resolve, reject) {
            if( path == null ){
                reject("something horrible happened")
            }
            console.log("hi but more verbose")
            var storageRef = firebase.storage().ref("uploads/3.jpg");
            storageRef.getDownloadURL().then(function(url) {
              console.log(url);
              resolve( url )
            });


        });
    }

}



function test_code(){
    d = new DatabaseManager();
    d.getImgByPath("uploads/3.jpg").then( url =>{
        console.log( url )
        setTimeout(function(){
            console.log( url )
        }, 2000);
    });

}

//test_code();
