const { Employee } = require.main.require("./database");

module.exports.findOne = async ({ body }) => {
  const employee = await Employee.findOne({
    where: { secuNum: body.secuNum },
  });
  return employee;
};
module.exports.readAll = async () => {
  const employee = await Employee.findAll();
  return employee;
};
module.exports.createOne = async ({ body }) => {
  await Employee.create({
    secuNum: body.secuNum,
    firstName: body.firstName,
    lastName: body.lastName,
    address: body.address,
    job: body.job,
    license: body.license,
    salary: body.salary,
  });
};
module.exports.deleteOne = async ({ body }) => {
  await Employee.destroy({ where: { secuNum: body.secuNum } });
};

module.exports.getAllSecuNum = async () => {
  const output = await Employee.findAll()
  return output.map(x => x.secuNum)
}