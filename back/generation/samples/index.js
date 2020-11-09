const fs = require('fs');

function getRandomIndexes(listLength, num = 1){
    if (listLength < num){
        // [0, 1, .. , listLength]
        return Array.from(Array(listLength).keys())
    }
    var indexes = new Array()
    var index = 0;
    while (num > 0){
        index = Math.floor(Math.random() * listLength)
        if (!indexes.includes(index)){
            indexes.push(index)
            num -= 1
        }
    }
    return indexes
}

module.exports.getRandomAirport = async (num = 1) => {
    var airports = fs.readFileSync("./resources/samples/airports.txt");
    const lines = data.split(/\r?\n/);
    indexes = getRandomIndexes(lines.length, num)
    var airports = new Array();
    for (var index of indexes)
    {
        airports.push(lines[index])
    }
    return airports
}

module.exports.getRandomCities = async (num = 1) => {
    var cities = fs.readFileSync("./resources/samples/cities.txt");
    const lines = data.split(/\r?\n/);
    indexes = getRandomIndexes(lines.length, num)
    var cities = new Array();
    for (var index of indexes)
    {
        cities.push(lines[index])
    }
    return cities
}

module.exports.getRandomFirstNames = async (num = 1) => {
    var firstNames = fs.readFileSync("./resources/samples/firstNames.txt");
    const lines = data.split(/\r?\n/);
    indexes = getRandomIndexes(lines.length, num)
    var firstNames = new Array();
    for (var index of indexes)
    {
        firstNames.push(lines[index])
    }
    return firstNames
}

module.exports.getRandomJobs = async (num = 1) => {
    var jobs = fs.readFileSync("./resources/samples/jobs.txt");
    const lines = data.split(/\r?\n/);
    indexes = getRandomIndexes(lines.length, num)
    var jobs = new Array();
    for (var index of indexes)
    {
        jobs.push(lines[index])
    }
    return jobs
}

module.exports.getRandomLastNames = async (num = 1) => {
    var lastNames = fs.readFileSync("./resources/samples/lastNames.txt");
    const lines = data.split(/\r?\n/);
    indexes = getRandomIndexes(lines.length, num)
    var lastNames = new Array();
    for (var index of indexes)
    {
        lastNames.push(lines[index])
    }
    return lastNames
}

module.exports.getRandomPlaneTypes = async (num = 1) => {
    var planeTypes = fs.readFileSync("./resources/samples/planeTypes.txt");
    const lines = data.split(/\r?\n/);
    indexes = getRandomIndexes(lines.length, num)
    var planeTypes = new Array();
    for (var index of indexes)
    {
        planeTypes.push(lines[index])
    }
    return planeTypes
}

module.exports.getRandomStreets = async (num = 1) => {
    var streets = fs.readFileSync("./resources/samples/streets.txt");
    const lines = data.split(/\r?\n/);
    indexes = getRandomIndexes(lines.length, num)
    var streets = new Array();
    for (var index of indexes)
    {
        streets.push(lines[index])
    }
    return streets
}