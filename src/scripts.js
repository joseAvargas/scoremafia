// Create a request letiable and assign a new XMLHttpRequest object to it.
const request = new XMLHttpRequest();
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard', true);

function getApiData() {
  request.onload = function () {
    // Begin accessing JSON data here
    let data = JSON.parse(this.response);
    let events = data["events"]
    loadApiData(events);
  };

  // loadApiData(data['events']);
};

function loadApiData(apiData) {

  for(let i = 0; i < apiData.length; i++) {

    const quarter = apiData[i]["status"]["period"];
    const clock = apiData[i]["status"]["displayClock"];

    const time = "Q" + quarter + " " + clock;

    if(quarter === 4 && clock === 0.0) { time = "FINAL"; }

    const homeTeam = apiData[i]["competitions"][0]["competitors"][0]["team"]["shortDisplayName"];
    const homeLogo = apiData[i]["competitions"][0]["competitors"][0]["team"]["logo"];
    const homeScore = apiData[i]["competitions"][0]["competitors"][0]["score"];


    const gameN = apiData[i]["shortName"];

    const awayTeam = apiData[i]["competitions"][0]["competitors"][1]["team"]["shortDisplayName"];
    const awayLogo = apiData[i]["competitions"][0]["competitors"][1]["team"]["logo"];
    const awayScore = apiData[i]["competitions"][0]["competitors"][1]["score"];

    insertGameCards(document.getElementById('card-deck'), createCards(i, gameN, awayLogo, awayScore, homeLogo, homeScore, time));

  }

};

// used to create the front and back of the game cards
function createCards(num, gameName, awayImg, awayScore, homeImg, homeScore, time)
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
                        <h3 class="py-3">${awayScore}</h3>
                    </div>
                    <div class="image-col text-center">
                        <img class="card-img-top" src="${homeImg}" alt="...">
                        <h3 class="py-3">${homeScore}</h3>
                    </div>
                </div>
                <div class="card-footer text-center bg-light-orange">${time}</div>
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

request.send();
