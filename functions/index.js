const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.scheduledFunction = functions.pubsub
  .schedule('every 2 minutes')
  .onRun(context => {
    async function rss_getter() {
      var rss_url =
        'https://feed2json.org/convert?url=https%3A%2F%2Fcoloradocollege-web.ungerboeck.com%2Fcalendar%2Fapi%2FrssFeed%3F%24filter%3D%28CampusDisplay%2520eq%2520%2527PUBANDINT%2527%2520or%2520CampusDisplay%2520eq%2520%2527INTERNAL%2527%29';
      let feed = await get(rss_url);
      item_list = feed.items;
      d = new DatabaseManager();
      rss_events = [];

      for (var i in item_list) {
        event = formatter(item_list[i]);
        rss_events.push(event);
        if (rss_events.length > 4) {
          break;
        }
      }
      rss_events.forEach(event => {
        createEventRSS(event);
      });

      function formatter(rss_item) {
        var Event_ID, url;

        var subtitle_raw = rss_item.summary.replace('<p>', '');
        var subtitle_list = subtitle_raw.split('</p>', 1);
        var subtitle = subtitle_list[0];

        url = rss_item.url;
        Event_ID = getEventID(url);
        Student_ID = 0;
        Event_Name = rss_item.title;
        Location = 'none given';
        Event_Description = getSummary(rss_item.summary, subtitle);
        Event_Date = subtitle;
        formated_time = formatTimes(Event_Date, Event_ID);
        Event_Start = formated_time[0];
        Event_End = formated_time[1];

        if (Event_ID === 'deny') {
          console.log('badd juju ahead');
        }
        param_list = [
          Event_ID,
          Student_ID,
          Event_Name,
          Location,
          Event_Description,
          Event_Date,
          Event_Start,
          Event_End,
          'no image',
          'true',
          url,
          'SchoolEvents',
        ];
        return param_list;
      }
      function getEventID(url) {
        var targetString = 'EventID=';
        var length = targetString.length;
        if (url.match(new RegExp(targetString, 'g') || []).length === 1) {
          var start_loc = url.indexOf(targetString);
          var start_point = start_loc + length;
          var leftOver = url.substring(start_point, url.length);
          var Event_ID_possible = leftOver.split('&')[0];
          if (!isNaN(Event_ID_possible)) {
            Event_ID = Number(Event_ID_possible);
          } else {
            Event_ID = 'deny';
          }
        } else {
          Event_ID = 'deny';
        }
        return Event_ID;
      }
      function getSummary(summary, subtitle) {
        //summary = "<p><div blah>content</p>"
        start = null;
        end = null;
        summary = summary.replace('<p>', '');
        summary = summary.replace('</p>', '');
        summary = summary.replace(/[\r\n\t]+/gm, '');
        summary = summary.replace(/&rsquo;/gi, "'");
        summary = summary.replace(/&ldquo;/gi, '"');
        summary = summary.replace(/&rdquo;/gi, '"');
        summary = summary.replace(/&#39;/gi, "'");
        summary = summary.replace(/&mdash;/gi, '-');

        len = summary.length;
        i = 0;
        while (i < len) {
          if (summary[i] === '<') {
            start = i;
          } else if (summary[i] === '>') {
            end = i;
            before_str = summary.substring(0, start);
            after_str = summary.substring(end + 1, summary.length);
            summary = before_str + after_str;
            len = summary.length;
            i = start;
          }
          i++;
        }
        return summary.replace(subtitle, '');
      }
      function formatTimes(date_str) {
        ends = date_str.split('-');

        start_comps = ends[0].trim().split(' ');
        start = getUnixTime(start_comps);
        end_comps = ends[1].trim().split(' ');
        if (end_comps.length < 3) {
          end_working = start_comps;
          end_working[4] = end_comps[0];
          end_working[5] = end_comps[1];
          end = getUnixTime(end_working);
        } else {
          end = getUnixTime(end_comps);
        }

        return [start, end];
      }
      function getUnixTime(comp_list) {
        month = comp_list[1];
        day = comp_list[2];
        year = comp_list[3];
        time = comp_list[4];
        hour = time.substring(0, time.indexOf(':'));
        minute = time.substring(time.indexOf(':'), time.length);
        AmOrPm = comp_list[5];

        //Make military Time
        if (AmOrPm === 'PM' && hour !== '12') {
          hour = Number(hour) + 12;
        }
        //Make the hours be 2 digits long
        if (Number(hour) < 10) {
          hour = '0' + hour;
        }

        date_str_formated =
          String(month + ' ' + day + ' ' + year + ' ' + hour) + minute + ':00 ';

        let date = new Date(date_str_formated);

        unix_timestamp = date.getTime() / 1000;
        return unix_timestamp;
      }
      function createEventRSS(param_list) {
        Event_ID = param_list[0];
        Student_ID = param_list[1];
        Event_Name = param_list[2];
        Event_Location = param_list[3];
        Event_Description = param_list[4];
        Event_Date = param_list[5];
        Event_Start = param_list[6];
        Event_End = param_list[7];
        Poster = param_list[8];
        CCSGA_Approved = param_list[9];
        Link = param_list[10];
        Tags = param_list[11];

        var usersRef = firebase.database().ref('Events/RSS');
        usersRef.child(Event_ID).set({
          Event_ID: Event_ID,
          Student_ID: Student_ID,
          Event_Name: Event_Name,
          Event_Location: Event_Location,
          Event_Description: Event_Description,
          Event_Date: Event_Date,
          Event_Start: Event_Start,
          Event_End: Event_End,
          Poster: Poster,
          CCSGA_Approved: CCSGA_Approved,
          Link: Link,
          Tags: Tags,
        });

        var tag_list = Tags.split(',');
        for (i in tag_list) {
          addTaggedEvent(tag_list[i], Event_ID);
        }
      }
      function addTaggedEvent(tag_name, Event_ID) {
        var refName = 'Tags/' + tag_name;
        var tagRef = firebase.database().ref(refName);
        tagRef.child(Event_ID).set({
          Event_ID: Event_ID,
        });
      }
      async function get(endpoint) {
        const res = await fetch(endpoint);
        const data = await res.json();
        return data;
      }
    }
  });
