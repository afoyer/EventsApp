var firebase = require('firebase');
var firebaseResumeDownloadAdd = null;
var imageToBlob = require( 'image-to-blob' )
let Parser = require('rss-parser');
let parser = new Parser();

//export default class DatabaseManager {
class DatabaseManager {
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
           console.log("connection  established");
        }
        else{
          //console.log("Connectionot established");
        }
    }

    //Todo make sure duplicates dont leak in
    createEvent( param_list){
        var Poster;
        Event_ID = param_list[0]
        Student_ID = param_list[1]
        Event_Name = param_list[2]
        Event_Location = param_list[3]
        Event_Description = param_list[4]
        Event_Date= param_list[5]
        Event_Start = param_list[6]
        Event_End = param_list[7]
        CCSGA_Approved = param_list[9]
        Link = param_list[10]
        Tags = param_list[11]


        this.formatImg( param_list[8] , Event_ID ).then( url => {
            Poster = url;
        }).then(function(){
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
        });

        var tag_list = Tags.split(",")
        for( i in tag_list ){
            this.addTaggedEvent( tag_list[i] , Event_ID)
        }
    }

    addTaggedEvent( tag_name , event_id ){
        var refName = "Tags/" + tag_name
        console.log("refname  = " + refName)
        var tagRef = firebase.database().ref(refName);
        tagRef.child(Event_ID).set({
            Event_ID : event_id
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

    //Todo contemplate whether to pull all of tags and filter versus make db do it and have mulitple connections (time?)
    async getEventsFilteredByTags( tag_list ){
        var return_list_big = []
        var events_list
        var return_set = new Set([])


        async function getEventsForTag( tag ){
            var return_list_small = []
            var refName = "Tags/" + tag
            return new Promise(function(resolve, reject) {
                firebase.database().ref(refName).on('value', function (big_snapshot) {
                    if( !big_snapshot){
                        reject("its empty?")
                    }
                    else{
                        big_snapshot.forEach(function (snapshot) {
                            var obj = snapshot.val();
                            return_list_small.push( obj.Event_ID )
                        });
                        resolve(return_list_small)
                    }
                });
            });
        }
        async function getEvents(){
            return new Promise(async function(resolve, reject) {
                var small_list = []
                if( tag_list.length == 0){
                    console.log("no tags")
                    resolve(small_list)
                }
                else{
                    for ( var i in tag_list ){
                        small_list = await getEventsForTag(tag_list[i])
                        return_list_big.push(small_list)
                    }
                    resolve(return_list_big)
                }
            });
        }

        events_list = await getEvents()
        events_list.forEach(out_list => {
            out_list.forEach(element => {
                return_set.add(element);
            });
        });
        return return_set;

    }

    //todo reason = "something went wrong" no notes needed
    async getAllEvents() {
        var data_row = {}
        var data = []
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

        // Todo check with efficency?
        var childRef = ("uploads/"+id+".jpg")
        var storageRef = firebase.storage().ref();
        return new Promise(function(resolve, reject) {
            if ( img_uri == "no image"){
                resolve( "no image")
            }
            else{
                uriToBlob( img_uri ).then( blob => {
                    storageRef.child(childRef).put(blob, {
                        contentType: 'image/jpeg'
                    }).then((snapshot)=>{
                        blob.close();
                        var storageRef = firebase.storage().ref(childRef);
                        storageRef.getDownloadURL().then(url => {
                        resolve( url )
                        });
                    });
                });
            }
        });
    }
}



async function rss_getter(){
    var rss_url = 'https://feed2json.org/convert?url=https%3A%2F%2Fcoloradocollege-web.ungerboeck.com%2Fcalendar%2Fapi%2FrssFeed%3F%24filter%3D%28CampusDisplay%2520eq%2520%2527PUBANDINT%2527%2520or%2520CampusDisplay%2520eq%2520%2527INTERNAL%2527%29'
    let feed = await get(rss_url);
    console.log(feed.title);
    item_list = feed.items;

    for ( var i in item_list){
        if( item_list[i].title.includes("Colorado College Men's Basketball")){
            formatter(item_list[i])
            break
        }
    }

    function formatter( rss_item){
        var subtitle = rss_item.summary.split("</p>",1);
        const nowUTC = moment.utc();
        var sub2 = subtitle[0].substr(3);
        var sub3 = sub2.split(" ");
        const test = sub3[0] + ' ' + sub3[1] + ' ' + sub3[2].substr(0,2)+ ' ' + sub3[3] + ' ' + sub3[4] + ' ' + sub3[5]
        const endtime = this.getEndDate(sub3)
        const timestart  = moment(sub3[0] + ' ' + sub3[1] + ' ' + sub3[2].substr(0,2) + 'th ' + sub3[3] + ' ' + sub3[4] + ' ' + sub3[5], "LLLL").format()
        const timeend = moment(endtime).format();

        console.log(test)
    }

    async function get(endpoint){
        const res = await fetch(endpoint);
        const data = await res.json();
        return data;
    }







}

rss_getter()






//function test_code(){
//    d = new DatabaseManager();
//
//    d.getEventsFilteredByTags(["fun","lit"]).then( list => {
//        console.log(list)
//    });
//}
//
//test_code();
//        setTimeout(function(){
//            console.log(list)
//        }, 2000);
