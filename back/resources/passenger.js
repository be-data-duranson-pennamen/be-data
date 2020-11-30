const { Passenger } = require.main.require("./model");
const { getRandomCities, getRandomFirstNames, getRandomLastNames, getRandomStreets, generateRandomSecuNum } = require.main.require("./utils");

module.exports.findOne = async (body) => {
  const passenger = await Passenger.findOne({
    where: { numero: body.numero },
  });
  return passenger;
};
module.exports.readAll = async () => {
  const passenger = await Passenger.findAll();
  return passenger;
};
module.exports.createOne = async ({ body }) => {
  await Passenger.create({
    numero: body.numero,
    firstName: body.firstName,
    lastName: body.lastName,
    address: body.address,
  });
};
module.exports.createMany = async (list) => {
  if (list.length > 0) {
    await Passenger.bulkCreate(list);
  }
};
module.exports.deleteOne = async ({ body }) => {
  await Passenger.destroy({ where: { numero: body.numero } });
};

module.exports.getAllSecuNum = async () => {
  const output = await Passenger.findAll();
  return output.map((x) => x.secuNum);
};
module.exports.generateRandom = async (num = 100) => {
  console.log('oui')
  const allPassengers = await Passenger.findAll();
  const usedSecuNum = allPassengers.map((x) => x.secuNum);
  if (!usedSecuNum) usedSecuNum = [];
  let passengers = [];
  for (let i = 0; i < num; i++) {
    let numero = generateRandomSecuNum();
    while (
      usedSecuNum.includes(numero) ||
      passengers.find((passenger) => passenger.numero == numero)
    ) {
      numero = generateRandomSecuNum();
    }
    const firstName = getRandomFirstNames()[0];
    const lastName = getRandomLastNames()[0];
    const address = `${Math.round(
      Math.random() * 200
    )} ${getRandomStreets()}, ${getRandomCities()}`;
    passengers.push({
      numero,
      firstName,
      lastName,
      address,
    });
  }
  await Passenger.bulkCreate(passengers);
};
