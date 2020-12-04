const fs = require("fs");
const { samples } = require.main.require("./samples");

const generateRandomSecuNum = () => {
  const firstdigit = 1 + Math.round(Math.random());
  const birth = 2020 - Math.round(Math.random() * 100);
  const rand = Math.round(Math.random() * 1e8);
  return firstdigit * 1e13 + birth * 1e9 + rand;
};

const getRandomIndexes = (listLength, num = 1) => {
  if (listLength < num) {
    // [0, 1, .. , listLength]
    return Array.from(Array(listLength).keys());
  }
  var indexes = new Array();
  var index = 0;
  while (num > 0) {
    index = Math.floor(Math.random() * listLength);
    if (!indexes.includes(index)) {
      indexes.push(index);
      num -= 1;
    }
  }
  return indexes;
};

const getRandomFirstNames = (num = 1) => {
  const lines = samples.firstNames;
  // console.log(firstNames)
  indexes = getRandomIndexes(lines.length, num);
  var firstNames = new Array();
  for (var index of indexes) {
    firstNames.push(lines[index]);
  }
  return firstNames;
};

const getRandomLastNames = (num = 1) => {
  const lines = samples.lastNames;
  indexes = getRandomIndexes(lines.length, num);
  var lastNames = new Array();
  for (var index of indexes) {
    lastNames.push(lines[index]);
  }
  return lastNames;
};
const getRandomStreets = (num = 1) => {
  const lines = samples.streets;
  indexes = getRandomIndexes(lines.length, num);
  var streets = new Array();
  for (var index of indexes) {
    streets.push(lines[index]);
  }
  return streets;
};

const getRandomCities = (num = 1) => {
  const lines = samples.cities;
  indexes = getRandomIndexes(lines.length, num);
  var cities = new Array();
  for (var index of indexes) {
    cities.push(lines[index]);
  }
  return cities;
};

const getRandomPlaneTypes = (num = 1) => {
  const planePossibilities = samples.planeTypes;
  let planeTypes = [];
  for (let i = 0; i < num; i++) {
    const randomPlane =
      planePossibilities[
        Math.floor(Math.random() * (planePossibilities.length - 1))
      ];
    if (randomPlane.type) {
      planeTypes.push(randomPlane);
    }
  }
  return planeTypes;
};

module.exports.getRandomIndexes = getRandomIndexes;
module.exports.generateRandomSecuNum = generateRandomSecuNum;
module.exports.getRandomFirstNames = getRandomFirstNames;
module.exports.getRandomLastNames = getRandomLastNames;
module.exports.getRandomStreets = getRandomStreets;
module.exports.getRandomCities = getRandomCities;
module.exports.getRandomPlaneTypes = getRandomPlaneTypes;
