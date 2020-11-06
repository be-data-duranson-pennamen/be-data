const { Passenger } = require.main.require("./database");

module.exports.findOne = async ({ body }) => {
  const passenger = await Passenger.findOne({
    where: { numero: body.numero },
  });
  return passenger;
};
module.exports.readAll = async () => {
  const passenger = await Passenger.findAll();
  console.log('OUI')
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
module.exports.deleteOne = async ({ body }) => {
  await Passenger.destroy({ where: { numero: body.numero } });
};
