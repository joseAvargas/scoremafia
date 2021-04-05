

function getApiData(data) {

  events = data;
  let divCount = $('#card-deck').children('div').length;

  // first check if there are any games at all
  if(events.length == 0) {
  // no games today checkout the other links for different sports or maybe create a cool message??
    console.log("No Games Today!")
  }
  // elif card-deck is empty then loadApiData to create cards
  else if(events.length > 0 && divCount == 0) {
    loadApiData(events);
  }
  // update data if cards have been already created
  else {
    updateData(events);
  }
};

function updateData(data) {
  events = data;

  for(let i = 0; i < events.length; i++) {

    const homeTeam = events[i]["competitions"][0]["competitors"][0]["team"]["shortDisplayName"];
    const homeScore = events[i]["competitions"][0]["competitors"][0]["score"];

    const awayTeam = events[i]["competitions"][0]["competitors"][1]["team"]["shortDisplayName"];
    const awayScore = events[i]["competitions"][0]["competitors"][1]["score"];

    const quarter = events[i]["status"]["period"];
    const clock = events[i]["status"]["displayClock"];
    const status = events[i]["status"]["type"]["state"];
    const gameTime = events[i]["status"]["type"]["shortDetail"];

    id = "id" + i.toString();
    let changeHomeScore = homeTeam + "-" + i.toString();
    let homeScoreObject = document.getElementById(changeHomeScore);
    homeScoreObject.innerHTML = homeScore;

    let changeAwayScore = awayTeam + "-" + i.toString();
    let awayScoreObject = document.getElementById(changeAwayScore);
    awayScoreObject.innerHTML = awayScore;

    let getTime = "time-" + i.toString();
    let timeObject = document.getElementById(getTime);
    timeObject.innerHTML = checkTime(status, gameTime, quarter, clock, homeScore, awayScore);


  }
}


function checkTime(gStatus, gTime, quarter, clock, homeS, awayS) {

  let time = ''
  //check if game has started
  if(gStatus === "pre") {

    time = gTime;
  }
  // check for end of game
  else if(gStatus === "post") {

    time = "FINAL"
  }
  else if([1, 2, 3, 4].includes(quarter) && clock != '0.0') {
    time = "Q" + quarter + " " + clock;
  }
  // check for end of quarter
  else if(quarter in [1, 3] && clock === '0.0') {

    time = "End of Q" + quarter;
  }
  // check for half time
  else if(quarter === 2 && clock === '0.0') {
    time = "Half Time";
  }
  // check for overtime
  else if(quarter > 4 && clock != '0.0') {
    const ot = quarter % 4;
    time = "OT" + ot + " " + clock;
  }


  return time
}




function loadApiData(apiData) {

  for(let i = 0; i < apiData.length; i++) {

    const quarter = apiData[i]["status"]["period"];
    const clock = apiData[i]["status"]["displayClock"];


    const homeTeam = apiData[i]["competitions"][0]["competitors"][0]["team"]["shortDisplayName"];
    const homeLogo = apiData[i]["competitions"][0]["competitors"][0]["team"]["logo"];
    const homeScore = apiData[i]["competitions"][0]["competitors"][0]["score"];
    const homeIsWinner = apiData[i]["competitions"][0]["competitors"][0]["winner"]

    const gameN = apiData[i]["shortName"];

    const awayTeam = apiData[i]["competitions"][0]["competitors"][1]["team"]["shortDisplayName"];
    const awayLogo = apiData[i]["competitions"][0]["competitors"][1]["team"]["logo"];
    const awayScore = apiData[i]["competitions"][0]["competitors"][1]["score"];
    const awayIsWinner = apiData[i]["competitions"][0]["competitors"][1]["winner"]

    const status = events[i]["status"]["type"]["state"];
    const gameTime = events[i]["status"]["type"]["shortDetail"];

    let time = checkTime(status, gameTime, quarter, clock, homeScore, awayScore);

    insertGameCards(document.getElementById('card-deck'), createCards(i, gameN, awayLogo, awayScore, homeLogo, homeScore, homeTeam, awayTeam, time));
    markWinningTeam(i, ...checkForWinningTeam(homeIsWinner, homeTeam, awayIsWinner, awayTeam));

  }

};

// helper function that checks if there is winner and who that winner is
function checkForWinningTeam(homeIsWinner, homeTeam, awayIsWinner, awayTeam)
{
  if(homeIsWinner) return [homeIsWinner, homeTeam];
  if(awayIsWinner) return [awayIsWinner, awayTeam];

  return [false, "none"];
}

// used to mark the winning team on a game card
function markWinningTeam(num, winnerExists, winningTeam)
{
  if(winnerExists) { document.getElementById(`${winningTeam}-${num}`).className += " winner"; }
}

// used to create the front and back of the game cards
function createCards(num, gameName, awayImg, awayScore, homeImg, homeScore, homeTeam, awayTeam, time)
{
    let htmlString = `<div class="col mb-4" id="div${num}">
        <div class="card-flip" id="card-${num}">
            <div class="front card h-100 card-custom bg-white border-white border-0">
                <span class="card-stats-right">
                    <button class="btn text-white" title="view stats" onclick="flip('card-${num}')"><i class="fas fa-list-ul fa-2x"></i></button>
                </span>
                <div class="card-header text-center bg-dark-orange">${gameName}</div>
                <div class="image-row bg-white">
                    <div class="image-col text-center">
                        <img class="card-img-top" src="${awayImg}" alt="...">
                        <h3 id="${awayTeam}-${num}" class="py-3">${awayScore}</h3>
                    </div>
                    <div class="image-col text-center">
                        <img class="card-img-top" src="${homeImg}" alt="...">
                        <h3 id="${homeTeam}-${num}" class="py-3">${homeScore}</h3>
                    </div>
                </div>
                <div id="time-${num}"class="card-footer text-center bg-light-orange">${time}</div>
            </div>
            <div class="back card h-100 bg-light-aqua" style="position: absolute; top: 0;">
                <span class="card-return-icon-left">
                    <button class="btn" title="view score" onclick="flip('card-${num}')"><i class="fas fa-undo-alt fa-2x"></i></button>
                </span>
                <div class="card-body" style="overflow-y: auto;">
                    <h5 class="card-title py-3">Sample Title</h5>
                </div>
            </div>
        </div>
    </div>`

    return htmlString;
}

// used to insert game cards into the card-deck
function insertGameCards(referenceNode, htmlString) { referenceNode.insertAdjacentHTML('afterbegin', htmlString); }

// used to help flip the cards on the left sidebar
function flip(name) {
  const x = document.getElementById(name);
  if (x.className.indexOf("flipped") == -1) {
    x.className += " flipped";
  } else {
    x.className = x.className.replace(" flipped", "");
  }
}

// request.send();
