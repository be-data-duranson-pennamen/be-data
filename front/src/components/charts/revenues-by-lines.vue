<script>
import { Bar } from 'vue-chartjs'
//import axios from "axios";

var data = {}

const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        title: {
            display: true,
            text: 'Revenues from air lines (€)'
        },
        legend: {
            display: false,
        }
    }

export default {
    extends: Bar,
    async mounted () {
        //var tickets = await axios.get(`${process.env.VUE_APP_API_URL}/ticket`);

        const tickets = {
            data:[
                {
                    flightId : 1
                },
                {
                    flightId : 1
                },
                {
                    flightId : 1
                },
                {
                    flightId : 2
                },
                {
                    flightId : 2
                },
                {
                    flightId : 3
                }
            ]
        }
        const flights = [
                {
                    data : {
                        id : 1,
                        price : 100,
                        departureAirport : "CDG",
                        arrivalAirport : "FRA"
                    }
                },
                {
                    data : {
                        id : 2,
                        price : 27.5,
                        departureAirport : "AKK",
                        arrivalAirport : "OIO"
                    }
                },
                {
                    data : {
                        id : 3,
                        price : 37.5,
                        departureAirport : "FRA",
                        arrivalAirport : "CDG"
                    }
                }
            ]
        var counts = tickets.data.reduce((p, c) => {
            var ticketNum = c.flightId;
            if (ticketNum == null) {
                return p
            }
            if (!(ticketNum in p)) {
                p[ticketNum] = 0;
            }
            p[ticketNum]++;
            return p;
        }, {});

        var lines = {} // object utilisé comme dictionnaire avec comme clefs les lignes et en valeurs les chiffres d'Affaire

        for(const flightId in counts){
            //var flight = await axios.post(`${process.env.VUE_APP_API_URL}/flight/`,{id:flightId});
            const flight = flights[flightId - 1] // Cas particulier (je me suis arrange pour)
            const line = [flight.data.departureAirport, flight.data.arrivalAirport].sort().join("-")  // On parle de ligne pour s'affranchir du problème aller-retour
            if (!(line in lines)) {
                lines[line] = 0;
            }
            lines[line] += flight.data.price * counts[flightId]; // prix du vol * nombre de tickets sur ce vol
        }
        var dataValues = []
        var labels = []
        for (const line in lines){
            labels.push(line)
            dataValues.push(lines[line])
        }

        data = {
            labels: labels,
            datasets: [{
                data: dataValues,
                backgroundColor: 'rgba(133, 187, 101,0.4)',
                borderColor: 'rgba(0, 0, 0,,1)',
                borderWidth: 1
            }]
        }
        this.renderChart(data, options)
    }
};
</script>

<style>
</style>