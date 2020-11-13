const { employee, passenger, plane } = require("./");
const {generateEmployees,generatePassengers,generatePlanes} = require.main.require("./generation");

module.exports.generateRandom = async ({query}) => {
    if(query) {
        const numEmployees = query.numEmployees ? Number(query.numEmployees) : 0;
        const employees = await generateEmployees(numEmployees==NaN ? 0 : numEmployees)
        await employee.createMany(employees)
        const numPassengers= query.numPassengers? Number(query.numPassengers) : 0;
        const passengers = await generatePassengers(numPassengers==NaN ? 0 : numPassengers)
        await passenger.createMany(passengers)
        const numPlanes = query.numPlanes ? Number(query.numPlanes) : 0;
        const planes = await generatePlanes(numPlanes==NaN ? 0 : numPlanes)
        await plane.createMany(planes)
    }
    return 
}
