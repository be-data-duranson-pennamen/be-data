<script>
import { Bar } from 'vue-chartjs'
import axios from "axios";

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
        const tickets = await axios.get(`${process.env.VUE_APP_API_URL}/ticket`);
        
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
            const flight = await axios.post(`${process.env.VUE_APP_API_URL}/flight/`,{id:flightId});
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