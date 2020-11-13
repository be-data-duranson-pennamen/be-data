const fs = require('fs');
const samples = JSON.parse(fs.readFileSync("./generation/samples.json"))
const { employee, flight, passenger, plane, ticket } = require.main.require("./resources");


const generateAll = async () => {
  await generateEmployees()
  await generatePassengers()
  await generatePlanes()
}

const generateEmployees = async (num = 10) => {
  var usedSecuNum = await employee.getAllSecuNum();
  if(!usedSecuNum) usedSecuNum = [];
  var employees = new Array(num)
  for (let i = 0; i < num; i++)
  {
    let secuNum = generateRandomSecuNum();
    while (usedSecuNum.includes(secuNum)){
      secuNum = generateRandomSecuNum();
    }
    let firstName = getRandomFirstNames()[0]
    let lastName = getRandomLastNames()[0]
    let address = `${Math.round(Math.random() * 200)} ${getRandomStreets()[0]}, ${getRandomCities()[0]}`;
    let job = getRandomJobs()[0]
    let license = Math.round(Math.random() * 1e8)
    let salary = Math.round(100*Math.random() * 5000) / 100
    let body = 
    {
      secuNum: secuNum,
      firstName: firstName,
      lastName: lastName,
      address: address,
      job: job,
      license: license,
      salary: salary,
    }
    // console.log(body)
    employees[i] = body
    // create employee in DB
  }
  return employees
}

const generatePassengers = async (num = 100) => {
  var usedSecuNum = await passenger.getAllSecuNum();
  if(!usedSecuNum) usedSecuNum = [];
  var passengers = new Array(num)
  for (let i = 0; i < num; i++)
  {
    let numero = generateRandomSecuNum();
    while (usedSecuNum.includes(numero)){
      numero = generateRandomSecuNum();
    }
    let firstName = getRandomFirstNames()[0]
    let lastName = getRandomLastNames()[0]
    let address = `${Math.round(Math.random() * 200)} ${getRandomStreets()}, ${getRandomCities()}`;
    let body = 
    {
      numero: numero,
      firstName: firstName,
      lastName: lastName,
      address: address,
    }
    // console.log(body)
    passengers[i] = body
    // create employee in DB
  }
  return passengers
}

const generatePlanes = async (num = 10) => {
    let numPlane = await plane.getNewPlaneNum();
    var planes = new Array(num)
    for (let i = 0; i < num; i++)
    {
        let type = getRandomPlaneTypes()[0]
        let capacity = 2 * Math.round(100 * Math.random())
        let body = 
        {
        numPlane: numPlane,
        type: type,
        capacity: capacity,
        }
        // console.log(body)
        planes[i] = body
        numPlane = numPlane + 1
        // create employee in DB
    }
    return planes
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

const getRandomAirports = (num = 1) => {
  const lines = samples.airports;
  indexes = getRandomIndexes(lines.length, num)
  var airports = new Array();
  for (var index of indexes)
  {
    airports.push(lines[index])
  }
  return airports
}

const getRandomCities = (num = 1) => {
  const lines = samples.cities;
  indexes = getRandomIndexes(lines.length, num)
  var cities = new Array();
  for (var index of indexes)
  {
    cities.push(lines[index])
  }
  return cities
}

const getRandomFirstNames = (num = 1) => {
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

const getRandomJobs = (num = 1) => {
  const lines = samples.jobs;
  indexes = getRandomIndexes(lines.length, num)
  var jobs = new Array();
  for (var index of indexes)
  {
    jobs.push(lines[index])
  }
  return jobs
}

const getRandomLastNames = (num = 1) => {
  const lines = samples.lastNames;
  indexes = getRandomIndexes(lines.length, num)
  var lastNames = new Array();
  for (var index of indexes)
  {
    lastNames.push(lines[index])
  }
  return lastNames
}

const getRandomPlaneTypes = (num = 1) => {
  const lines = samples.planeTypes;
  indexes = getRandomIndexes(lines.length, num)
  var planeTypes = new Array();
  for (var index of indexes)
  {
    planeTypes.push(lines[index])
  }
  return planeTypes
}

const getRandomStreets = (num = 1) => {
  const lines = samples.streets
  indexes = getRandomIndexes(lines.length, num)
  var streets = new Array();
  for (var index of indexes)
  {
    streets.push(lines[index])
  }
  return streets
}

module.exports = {
    generateAll,
    generateEmployees,
    generatePassengers,
    generatePlanes
}
