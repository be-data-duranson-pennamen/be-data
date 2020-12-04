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
            text: 'Available Planes'
        },
        legend: {
            display: false,
        }
    }
const availableBackgroundColors = [
    'rgba(255, 99, 132,0.4)',
    'rgba(54, 162, 235, 0.4)',
    'rgba(255, 206, 86, 0.4)',
    'rgba(75, 192, 192, 0.4)',
    'rgba(153, 102, 255, 0.4)',
    'rgba(255, 159, 64, 0.4)'
    ]
const availableBorderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
    ]
export default {
    extends: Bar,
    async mounted () {
        const planes = await axios.get(`${process.env.VUE_APP_API_URL}/plane`);
        var counts = planes.data.reduce((p, c) => {
            var name = c.type;
            if (name == null) {
                return p
            }
            if (!(name in p)) {
                p[name] = 0;
            }
            p[name]++;
            return p;
        }, {});
        
        var dataValues = []
        var labels = []
        for (const key in counts){
            labels.push(key)
            dataValues.push(counts[key])
        }
        const nValues = dataValues.length

        data = {
            labels: labels,
            datasets: [{
                data: dataValues,
                backgroundColor: availableBackgroundColors.slice(0,nValues),
                borderColor: availableBorderColors.slice(0,nValues),
                borderWidth: 1
            }]
        }
        this.renderChart(data, options)
    }
};
</script>

<style>
</style>