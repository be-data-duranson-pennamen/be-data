const fs = require('fs');
const samples = JSON.parse(fs.readFileSync("./generation/samples.json"))
const { employee, flight, passenger, plane, ticket } = require.main.require("./resources");

module.exports.generateAll = async () => {
    await generateEmployees()
}

module.exports.generateEmployees = async (num = 100) => {
    var usedSecuNum = await employee.getAllSecuNum();
    if(!usedSecuNum) usedSecuNum = [];
    for (let i = 0; i < num; i++)
    {
      let secuNum = generateRandomSecuNum();
      while (usedSecuNum.includes(secuNum)){
        secuNum = generateRandomSecuNum();
      }
      firstName = await getRandomFirstNames()
      lastName = await getRandomLastNames()
      address = `${Math.round(Math.random() * 200)} ${await getRandomStreets()}, ${await getRandomCities()}`;
      job = await getRandomJobs()
      license = Math.round(Math.random() * 1e8)
      salary = Math.round(100*Math.random() * 5000) / 100
      body = 
      {
        secuNum: secuNum,
        firstName: firstName,
        lastName: lastName,
        address: address,
        job: job,
        license: license,
        salary: salary,
      }
      console.log(body)
      // create employee in DB
    }
  }

function generateRandomSecuNum(){
    const firstdigit = 1 + (Math.round(Math.random()))
    const birth = 2020 - Math.round((Math.random() * 100))
    const rand = Math.round((Math.random() * 1e8))
    return firstdigit * 1e13 + birth * 1e9 + rand
}

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

const getRandomAirports = async (num = 1) => {
    const lines = samples.airports;
    indexes = getRandomIndexes(lines.length, num)
    var airports = new Array();
    for (var index of indexes)
    {
        airports.push(lines[index])
    }
    return airports
}

const getRandomCities = async (num = 1) => {
    const lines = samples.cities;
    indexes = getRandomIndexes(lines.length, num)
    var cities = new Array();
    for (var index of indexes)
    {
        cities.push(lines[index])
    }
    return cities
}

const getRandomFirstNames = async (num = 1) => {
    const lines = samples.firstNames;
    // console.log(firstNames)
    indexes = getRandomIndexes(lines.length, num)
    var firstNames = new Array();
    for (var index of indexes)
    {
        firstNames.push(lines[index])
    }
    return firstNames
}

const getRandomJobs = async (num = 1) => {
    const lines = samples.jobs;
    indexes = getRandomIndexes(lines.length, num)
    var jobs = new Array();
    for (var index of indexes)
    {
        jobs.push(lines[index])
    }
    return jobs
}

const getRandomLastNames = async (num = 1) => {
    const lines = samples.lastNames;
    indexes = getRandomIndexes(lines.length, num)
    var lastNames = new Array();
    for (var index of indexes)
    {
        lastNames.push(lines[index])
    }
    return lastNames
}

const getRandomPlaneTypes = async (num = 1) => {
    const lines = samples.planeTypes;
    indexes = getRandomIndexes(lines.length, num)
    var planeTypes = new Array();
    for (var index of indexes)
    {
        planeTypes.push(lines[index])
    }
    return planeTypes
}

const getRandomStreets = async (num = 1) => {
    const lines = samples.streets
    indexes = getRandomIndexes(lines.length, num)
    var streets = new Array();
    for (var index of indexes)
    {
        streets.push(lines[index])
    }
    return streets
}

