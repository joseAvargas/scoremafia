// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard', true);


request.onload = function () {
  // Begin accessing JSON data here

  var data = JSON.parse(this.response);
  var events = data["events"]
  console.log(data["events"]);

  for(var i = 0; i < events.length; i++) {
    var quarter = events[i]["status"]["period"];
    var clock = events[i]["status"]["displayClock"];

    var homeTeam = events[i]["competitions"][0]["competitors"][0]["team"]["shortDisplayName"];
    var scoreHome = events[i]["competitions"][0]["competitors"][0]["score"];

    var awayTeam = events[i]["competitions"][0]["competitors"][1]["team"]["shortDisplayName"];
    var awayHome = events[i]["competitions"][0]["competitors"][1]["score"];
    
    // console.log("Q" + quarter + " Time: " + clock);
    // console.log(awayTeam + "   " + homeTeam);
    // console.log(awayHome + "   " + scoreHome);
  }
};

// Send request
request.send();

// used to help flip the cards on the left sidebar
function flip(name) {
  var x = document.getElementById(name);
  if (x.className.indexOf("flipped") == -1) {
    x.className += " flipped";
  } else { 
    x.className = x.className.replace(" flipped", "");
  }
}
