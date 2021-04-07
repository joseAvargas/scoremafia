const fetch = require("node-fetch");
const settings = require("../app-settings.json")

// Defining async function
async function getapi() {

    if(settings.development_env) {
        const response = await fetch(settings.dev_api_url);
        var data = await response.json();
        return data
    } else {
        // Storing response
        const response = await fetch(settings.apiUrl);

        // Storing data in form of JSON
        var data = await response.json();

        return data["events"]
    }
}

exports.getData = getapi;
