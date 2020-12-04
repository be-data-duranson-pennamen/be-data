const { Passenger } = require.main.require("./model");
const {
  getRandomCities,
  getRandomFirstNames,
  getRandomLastNames,
  getRandomStreets,
} = require.main.require("./utils");

module.exports.findOne = async (body) => {
  const passenger = await Passenger.findOne({
    where: { id: body.id },
  });
  return passenger;
};
module.exports.readAll = async () => {
  const passenger = await Passenger.findAll();
  return passenger;
};
module.exports.createOne = async ({ body }) => {
  await Passenger.create(body);
  return await Passenger.findOne({where : body})
};
module.exports.createMany = async (list) => {
  if (list.length > 0) {
    await Passenger.bulkCreate(list);
  }
};
module.exports.deleteOne = async ({ body }) => {
  await Passenger.destroy({ where: { id: body.id } });
};
module.exports.deleteAll = async () => {
  await Passenger.destroy({ truncate: true });
};

module.exports.generateRandom = async (num = 100) => {
  let passengers = [];
  for (let i = 0; i < num; i++) {
    const firstName = getRandomFirstNames()[0];
    const lastName = getRandomLastNames()[0];
    const address = `${Math.round(
      Math.random() * 200
    )} ${getRandomStreets()}, ${getRandomCities()}`;
    passengers.push({
      firstName,
      lastName,
      address,
    });
  }
  await Passenger.bulkCreate(passengers);
};
