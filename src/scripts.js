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
    let homeTeam = getHomeTeamData(events, i);
    let awayTeam = getAwayTeamData(events, i);
    let gameDetails = getGameDetails(events, i);

    let changeHomeScore = homeTeam.teamName + "-" + i.toString();
    let homeScoreObject = document.getElementById(changeHomeScore);
    homeScoreObject.innerHTML = homeTeam.score;

    let changeAwayScore = awayTeam.teamName + "-" + i.toString();
    let awayScoreObject = document.getElementById(changeAwayScore);
    awayScoreObject.innerHTML = awayTeam.score;

    let getTime = "time-" + i.toString();
    let timeObject = document.getElementById(getTime);
    timeObject.innerHTML = checkTime(gameDetails.status, gameDetails.gameTime.toUpperCase(), gameDetails.quarter, gameDetails.clock, homeTeam.score, awayTeam.score);

    markWinningTeam(i, ...checkForWinningTeam(...getWinnerStates(events, i)));

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

    time = gTime;
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
    let homeTeam = getHomeTeamData(apiData, i);
    let awayTeam = getAwayTeamData(apiData, i);
    let gameDetails = getGameDetails(apiData, i);
    let topPerformers = getTopPerformers(apiData, i);

    let time = checkTime(gameDetails.status, gameDetails.gameTime.toUpperCase(), gameDetails.quarter, gameDetails.clock, homeTeam.score, awayTeam.score);

    insertGameCards(document.getElementById('card-deck'), createCards(i, homeTeam, awayTeam, gameDetails, time, topPerformers));
    markWinningTeam(i, ...checkForWinningTeam(...getWinnerStates(apiData, i)));
  }

};

function createBackCard(homeTeam, awayTeam, gameDetails, topPerformers)
{
  let htmlString;

  if(topPerformers === "no leaders") {
    htmlString = `<div class="card-header text-center bg-dark-orange">${gameDetails.gameTime}</div>
                    <div class="image-row bg-white">
                    <div class="image-col text-center">
                      <img class="card-img-top" src="${awayTeam.teamLogo}" alt="...">
                      <a href="${awayTeam.fullSchedule}" target=_blank>
                        <p class="pt-2">See ${awayTeam.teamAbbreviation} full schedule</p>
                      </a>
                    </div>
                    <div class="image-col text-center">
                      <img class="card-img-top" src="${homeTeam.teamLogo}" alt="...">
                      <a href="${homeTeam.fullSchedule}" target=_blank>
                        <p class="pt-2">See ${homeTeam.teamAbbreviation} full schedule</p>
                      </a>
                    </div>
                  </div>`
  }
  else {
    let title = "";
    gameDetails.status !== "pre" ? title="TOP PERFORMERS" : title="PLAYERS TO WATCH";

    htmlString = `<div class="card-header text-center bg-dark-orange">${title}</div>
                    <div class="image-row bg-white pt-4">
                      <div class="image-col text-center">
                        <img class="card-img-top" src="${topPerformers.awayLeaderImage}" alt="...">
                        <h4 class="pt-2">${topPerformers.awayLeaderName}</h4>
                        <p style="font-size: 9pt; font-weight: bold;" class="px-3 text-muted">${topPerformers.awayLeaderStats}</p>
                      </div>
                    <div class="image-col text-center">
                      <img class="card-img-top" src="${topPerformers.homeLeaderImage}" alt="...">
                      <h4 class="pt-2">${topPerformers.homeLeaderName}</h4>
                      <p style="font-size: 9pt; font-weight: bold;" i class="px-3 text-muted">${topPerformers.homeLeaderStats}</p>
                    </div>
                  </div>`
  }

  return htmlString;

}

// helper function that checks if there is winner and who that winner is
function checkForWinningTeam(homeIsWinner, homeTeam, awayIsWinner, awayTeam) {
  if(homeIsWinner) return [homeIsWinner, homeTeam];
  if(awayIsWinner) return [awayIsWinner, awayTeam];

  return [false, "none"];
}

// used to mark the winning team on a game card
function markWinningTeam(num, winnerExists, winningTeam) {
  if(winnerExists) { document.getElementById(`${winningTeam}-${num}`).className += " winner"; }
}

// used to create the front and back of the game cards
function createCards(num, homeTeam, awayTeam, gameDetails, time, topPerformers)
{
    let htmlString = `<div class="col mb-4" id="div${num}">
        <div class="card-flip" id="card-${num}">
            <div class="front card h-100 card-custom bg-white border-white border-0">
                <span class="card-stats-right">
                    <button class="btn text-white" title="view stats" onclick="flip('card-${num}')"><i class="fas fa-list-ul fa-2x"></i></button>
                </span>
                <div class="card-header text-center bg-dark-orange">${gameDetails.gameName}</div>
                <div class="image-row bg-white">
                    <div class="image-col text-center">
                        <img class="card-img-top" src="${awayTeam.teamLogo}" alt="...">
                        <h3 id="${awayTeam.teamName}-${num}" class="py-3">${awayTeam.score}</h3>
                    </div>
                    <div class="image-col text-center">
                        <img class="card-img-top" src="${homeTeam.teamLogo}" alt="...">
                        <h3 id="${homeTeam.teamName}-${num}" class="py-3">${homeTeam.score}</h3>
                    </div>
                </div>
                <div id="time-${num}"class="card-footer text-center bg-light-orange">${time}</div>
            </div>
            <div class="back card h-100 bg-white" style="position: absolute; top: 0;">
                <span class="card-return-icon-left">
                    <button class="btn text-white" title="view score" onclick="flip('card-${num}')"><i class="fas fa-undo-alt fa-2x"></i></button>
                </span>
                ${createBackCard(homeTeam, awayTeam, gameDetails, topPerformers)}
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
