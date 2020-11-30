const { Employee } = require.main.require("./model");
const { getRandomCities, getRandomFirstNames, getRandomLastNames, getRandomStreets, generateRandomSecuNum } = require.main.require("./utils");

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
module.exports.createMany = async (list) => {
  if (list.length > 0) {
    await Employee.bulkCreate(list);
  }
};
module.exports.deleteOne = async ({ body }) => {
  await Employee.destroy({ where: { secuNum: body.secuNum } });
};

module.exports.generateRandom = async (num = 10) => {
  const allEmployees = await Employee.findAll()
  let usedSecuNum = allEmployees.map((x) => x.secuNum);
  if (!usedSecuNum) usedSecuNum = [];
  let employees = [];
  for (let i = 0; i < num; i++) {
    let secuNum = generateRandomSecuNum();
    while (usedSecuNum.includes(secuNum) || employees.find(employee => employee.secuNum == secuNum)) {
      secuNum = generateRandomSecuNum();
    }
    const firstName = getRandomFirstNames()[0];
    const lastName = getRandomLastNames()[0];
    const address = `${Math.round(Math.random() * 200)} ${
      getRandomStreets()[0]
    }, ${getRandomCities()[0]}`;
    const job = Math.random() > 0.5 ? "pilot" : "stewart";
    const license = Math.round(Math.random() * 1e8);
    const salary = Math.round(100 * Math.random() * 5000) / 100;
    employees.push({
      secuNum: secuNum,
      firstName: firstName,
      lastName: lastName,
      address: address,
      job: job,
      license: license,
      salary: salary,
    });
  }
  await Employee.bulkCreate(employees)
};
