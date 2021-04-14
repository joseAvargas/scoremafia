function getAllData(data) {
    return data;
}

function getHomeTeamData(data, i) {
    let homeTeam = {
    "teamName": data[i]["competitions"][0]["competitors"][0]["team"]["shortDisplayName"],
    "teamAbbreviation": data[i]["competitions"][0]["competitors"][0]["team"]["abbreviation"],
    "teamLogo": data[i]["competitions"][0]["competitors"][0]["team"]["logo"],
    "score": data[i]["competitions"][0]["competitors"][0]["score"],
    "isWinner": data[i]["competitions"][0]["competitors"][0]["winner"],
    "fullSchedule": data[i]["competitions"][0]["competitors"][0]["team"]["links"][3]["href"]
    }
    return homeTeam;
}

function getAwayTeamData(data, i) {
    let awayTeam = {
        "teamName": data[i]["competitions"][0]["competitors"][1]["team"]["shortDisplayName"],
        "teamAbbreviation": data[i]["competitions"][0]["competitors"][1]["team"]["abbreviation"],
        "teamLogo": data[i]["competitions"][0]["competitors"][1]["team"]["logo"],
        "score": data[i]["competitions"][0]["competitors"][1]["score"],
        "isWinner": data[i]["competitions"][0]["competitors"][1]["winner"],
        "fullSchedule": data[i]["competitions"][0]["competitors"][1]["team"]["links"][3]["href"]
    }
    return awayTeam;
}

function getGameDetails(data, i) {
    let gameDetails = {
    "quarter": data[i]["status"]["period"],
    "clock": data[i]["status"]["displayClock"],
    "gameName": data[i]["shortName"],
    "status": data[i]["status"]["type"]["state"],
    "gameTime": data[i]["status"]["type"]["shortDetail"]
    }
    return gameDetails;
}

function getWinnerStates(data, i) {
    let winners = [
        data[i]["competitions"][0]["competitors"][0]["winner"],
        data[i]["competitions"][0]["competitors"][0]["team"]["shortDisplayName"],
        data[i]["competitions"][0]["competitors"][1]["winner"],
        data[i]["competitions"][0]["competitors"][1]["team"]["shortDisplayName"]
    ]
    return winners;
}

function getTopPerformers(data, i) {

    if(leadersPopulated(data,i)) {
        let topPerformers = {
        "homeLeaderName": data[i]["competitions"][0]["competitors"][0]["leaders"][3]["leaders"][0]["athlete"]["displayName"],
        "homeLeaderImage": data[i]["competitions"][0]["competitors"][0]["leaders"][3]["leaders"][0]["athlete"]["headshot"],
        "homeLeaderStats": data[i]["competitions"][0]["competitors"][0]["leaders"][3]["leaders"][0]["displayValue"],
        "awayLeaderName": data[i]["competitions"][0]["competitors"][1]["leaders"][3]["leaders"][0]["athlete"]["displayName"],
        "awayLeaderImage": data[i]["competitions"][0]["competitors"][1]["leaders"][3]["leaders"][0]["athlete"]["headshot"],
        "awayLeaderStats": data[i]["competitions"][0]["competitors"][1]["leaders"][3]["leaders"][0]["displayValue"],
        }
        return topPerformers;
    }
    else {
        return "no leaders";
    }
}

function leadersPopulated(data, i) {
    if(data[i]["competitions"][0]["competitors"][0]["leaders"] == undefined)
        return false;
    else
        return true;
}