const { Plane } = require.main.require("./database");

module.exports.findOne = async ({ body }) => {
  const plane = await Plane.findOne({
    where: { numPlane: body.numPlane },
  });
  return plane;
};
module.exports.readAll = async () => {
  const plane = await Plane.findAll();
  return plane;
};
module.exports.createOne = async ({ body }) => {
  await Plane.create({
    numPlane: body.numPlane,
    type: body.type,
    capacity: body.capacity,
  });
};
module.exports.deleteOne = async ({ body }) => {
  await Plane.destroy({ where: { numPlane: body.numPlane } });
};
