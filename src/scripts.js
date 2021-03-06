// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard', true);

function getApiData() {
  // request.onload = function () {
  //   // Begin accessing JSON data here
  //   var data = JSON.parse(this.response);
  //   var events = data["events"]
  //   loadApiData(events);
  // };

  loadApiData(data['events']);
};

function loadApiData(apiData) {

  for(var i = 0; i < apiData.length; i++) {

  // for(var i = 0; i < 1; i++) {
    var quarter = apiData[i]["status"]["period"];
    var clock = apiData[i]["status"]["displayClock"];

    var time = "Q" + quarter + " " + clock;

    if(quarter === 4 && clock === 0.0) {
      time = "FINAL";
    }

    var homeTeam = apiData[i]["competitions"][0]["competitors"][0]["team"]["shortDisplayName"];
    var homeLogo = apiData[i]["competitions"][0]["competitors"][0]["team"]["logo"];
    var homeScore = apiData[i]["competitions"][0]["competitors"][0]["score"];


    var gameN = apiData[i]["shortName"];

    var awayTeam = apiData[i]["competitions"][0]["competitors"][1]["team"]["shortDisplayName"];
    var awayLogo = apiData[i]["competitions"][0]["competitors"][1]["team"]["logo"];
    var awayScore = apiData[i]["competitions"][0]["competitors"][1]["score"];

    createCardsFront(i, gameN, awayLogo, awayScore, homeLogo, homeScore, time);
  }

};

function createCardsFront(num, gameName, awayImg, awayScore, homeImg, homeScore, time) {


  // <div class="col mb-4">
  var idName = "div" + (num + 1);
  var newDiv = document.createElement("div");
  newDiv.className = "col mb-4";
  newDiv.id = idName
  // console.log(newDiv.id);

  //<div class="card-flip" id='card-2'>
  var cardFlipId = "card-" + (num + 1);
  var cardFlipDiv = document.createElement("div");
  cardFlipDiv.className = "card-flip";
  cardFlipDiv.id = cardFlipId;
  newDiv.appendChild(cardFlipDiv);

  //     <div class="card h-100">
  var subDiv = document.createElement("div");
  subDiv.className = "front card h-100 card-custom bg-white border-white border-0";
  cardFlipDiv.appendChild(subDiv);

  //<span class="card-stats-right">
  var spanStats = document.createElement("span");
  spanStats.className = "card-stats-right";
  subDiv.appendChild(spanStats);

  //<button class="btn text-white" title="view stats" onclick="flip('card-1')">
  var spanStatsBtn = document.createElement("button");
  spanStatsBtn.className = "btn text-white";
  spanStatsBtn.setAttribute("title", "view stats");
  spanStatsBtn.setAttribute("onClick", "flip('" + cardFlipId + "')");
  spanStats.appendChild(spanStatsBtn);

  //<i class="fas fa-list-ul fa-2x"></i>
  var statsIcon = document.createElement("i");
  statsIcon.className = "fas fa-list-ul fa-2x";
  spanStatsBtn.appendChild(statsIcon);

  // <div class="card-header text-center">DET @ NY</div>
  //set the team names here for the game
  var cardHeader = document.createElement("div");
  cardHeader.className = "card-header text-center bg-dark-orange";
  cardHeader.innerHTML = gameName;
  subDiv.appendChild(cardHeader);

  // <div class="image-row">
  var imageRow = document.createElement("div");
  imageRow.className = "image-row bg-white";
  insertAfter(cardHeader, imageRow);

  // <div class="image-col text-center">
  var imageColAway = document.createElement("div");
  imageColAway.className = "image-col text-center";
  imageRow.appendChild(imageColAway);

  // <img src="https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/det.png" class="card-img-top" alt="...">
  //set the away team logo here
  var imageAway = document.createElement("img");
  imageAway.setAttribute("class","card-img-top");
  imageAway.setAttribute("src", awayImg);
  imageAway.setAttribute("alt", "...");
  imageColAway.appendChild(imageAway);

  //set the away team score here
  var scoreAway = document.createElement("h3");
  scoreAway.className = "py-3";
  scoreAway.innerHTML = awayScore;
  insertAfter(imageAway, scoreAway);

  // <div class="image-col text-center">
  var imageColHome = document.createElement("div");
  imageColHome.className = "image-col text-center";
  imageRow.appendChild(imageColHome);

  // <img src="https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/det.png" class="card-img-top" alt="...">
  //set the home team logo here
  var imageHome = document.createElement("img");
  imageHome.setAttribute("class","card-img-top");
  imageHome.setAttribute("src", homeImg);
  imageHome.setAttribute("alt", "...");
  imageColHome.appendChild(imageHome);

  //set home score here
  var scoreHome = document.createElement("h3");
  scoreHome.className = "py-3";
  scoreHome.innerHTML = homeScore;
  insertAfter(imageHome, scoreHome);

  // <div class="card-footer text-center">Q3 10:00</div>
  //set the quarter and time here
  var gameTime = document.createElement("div");
  gameTime.className = "card-footer text-center bg-light-orange";
  gameTime.innerHTML = time;
  insertAfter(imageRow, gameTime);

  createCardsBack(cardFlipId, cardFlipDiv);

  if(num === 0) {
    var currentDiv = document.getElementById("card-deck");
    // document.body.insertBefore(newDiv, currentDiv);
    currentDiv.appendChild(newDiv);
  }
  else {
    var currentDiv = document.getElementById("div" + (num));
    insertAfter(currentDiv, newDiv)
  }
};

function createCardsBack(cardFlipId, referenceNode) {
  //<div class="back card h-100 bg-light-aqua" style="position: absolute; top: 0;">
  var backDiv = document.createElement("div");
  backDiv.className = "back card h-100 bg-light-aqua";
  backDiv.setAttribute("style", "position: absolute; top: 0;")
  referenceNode.appendChild(backDiv);

  //<span class="card-return-icon-left">
  var spanReturn = document.createElement("span");
  spanReturn.className = "card-return-icon-left";
  backDiv.appendChild(spanReturn);

  //<button class="btn" title="view score" onclick="flip('card-1')">
  var returnBtn = document.createElement("button");
  returnBtn.className = "btn";
  returnBtn.setAttribute("title", "view score");
  returnBtn.setAttribute("onClick", "flip('" + cardFlipId + "')");
  spanReturn.appendChild(returnBtn);

  //<i class="fas fa-undo-alt fa-2x"></i>
  var returnIcon = document.createElement("i");
  returnIcon.className ="fas fa-undo-alt fa-2x";
  returnBtn.appendChild(returnIcon);

  var backCardBody = document.createElement("div");
  backCardBody.className = "card-body";
  backCardBody.setAttribute("style", "overflow-y: auto;");
  backDiv.appendChild(backCardBody);

  var backCardTitle = document.createElement("h5");
  backCardTitle.className = "card-title py-3";
  backCardTitle.innerHTML = "Sample Title";
  backCardBody.appendChild(backCardTitle);

}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// used to help flip the cards on the left sidebar
function flip(name) {
  var x = document.getElementById(name);
  if (x.className.indexOf("flipped") == -1) {
    x.className += " flipped";
  } else { 
    x.className = x.className.replace(" flipped", "");
  }
}

//request.send();
