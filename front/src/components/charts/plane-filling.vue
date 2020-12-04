<script>
import { Radar } from 'vue-chartjs'
//import axios from "axios";

var data = {}

const options = {
        title: {
            display: true,
            text: 'Airplane filling by types'
        }
    }

export default {
    extends: Radar,
    async mounted () {

        //var planes = await axios.get(`${process.env.VUE_APP_API_URL}/plane`);
        const planes = {
            data:[
                {
                    id : 1,
                    type : "Boeing",
                    capacity : 100
                },
                {
                    id : 2,
                    type : "Boeing",
                    capacity : 100
                },
                {
                    id : 3,
                    type : "Boeing n2",
                    capacity : 200
                },
                {
                    id : 4,
                    type : "Boeing 747",
                    capacity : 500
                }
            ]
        }

        const planeReduced = {}
        for(var element of planes.data){
            planeReduced[element.id] = 
            {
                type : element.type,
                capacity : element.capacity
            }
        }

        //var flights = await axios.get(`${process.env.VUE_APP_API_URL}/flight`);
        const flights = {
            data:[
                {
                    planeId: 1,
                    emptyPlaces: 50,
                    departureDate : "2020/12/7 08:00"
                },
                {
                    planeId: 2,
                    emptyPlaces: 30,
                    departureDate : "2020/12/7 08:00"
                },
                {
                    planeId: 3,
                    emptyPlaces: 80,
                    departureDate : "2020/12/7 08:00"
                },
                {
                    planeId: 3,
                    emptyPlaces: 20,
                    departureDate : "2020/12/7 08:00"
                },
                {
                    planeId: 4,
                    emptyPlaces: 30,
                    departureDate : "2020/12/7 08:00"
                },
                {
                    planeId: 4,
                    emptyPlaces: 30,
                    departureDate : "2021/12/7 08:00"
                },
            ]
        }

        var ratios = {}
        for(var flight of flights.data){
            var departureDate = new Date(flight.departureDate)
            if (departureDate.getTime() < Date.now() + 7*24*3600*1000){ 
                var planeId = flight.planeId;
                var empty = flight.emptyPlaces;
                var capacity = planeReduced[planeId].capacity;
                var type = planeReduced[planeId].type;
                if (!(type in ratios)) {
                    ratios[type] = [];
                }
                ratios[type].push((capacity - empty) / capacity)
            }
        }

        for (var key in ratios){
            var n = ratios[key].length
            ratios[key] = ratios[key].reduce((p,c) => {return c + p}) / n
        }

        var dataValues = []
        var labels = []
        for (const type in ratios){
            labels.push(type)
            dataValues.push(ratios[type])
        }

        const nValues = dataValues.length
        var idealValues = new Array(nValues)
        for (var i = 0; i < nValues; i++){
            idealValues[i] = 0.9 // 90% c'est bien pour le remplissage d'un avion, 100% c'est trop
        }
        data = {
            labels: labels,
            datasets: [{
                label: 'Airplane filling',
                data: dataValues,
                backgroundColor: 'rgba(187, 101, 133,0.4)',
                borderColor: 'rgba(0, 0, 0,1)',
                borderWidth: 1
            },{
                label: 'Ideal fitting',
                data: idealValues,
                backgroundColor: 'rgba(133, 187, 101,0)',
                borderColor: 'rgba(133, 187, 101,1)',
                borderWidth: 1
            }
            ]
        }
        this.renderChart(data, options)
    }
};
</script>

<style>
</style>