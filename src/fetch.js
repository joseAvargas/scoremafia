const fetch = require("node-fetch");
const apiUrl ='http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard';

// Defining async function
async function getapi() {

    // Storing response
    const response = await fetch(apiUrl);

    // Storing data in form of JSON
    var data = await response.json();

    return data["events"]

}

exports.getData = getapi;
