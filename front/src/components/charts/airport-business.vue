<script>
import { Pie } from "vue-chartjs";

var data = {};

const options = {
  title: {
    display: true,
    text: "Business of airports this week",
  },
};

const availableBackgroundColors = [
  "rgba(255, 99, 132,0.4)",
  "rgba(54, 162, 235, 0.4)",
  "rgba(255, 206, 86, 0.4)",
  "rgba(75, 192, 192, 0.4)",
  "rgba(153, 102, 255, 0.4)",
  "rgba(255, 159, 64, 0.4)",
];
const availableBorderColors = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
];

export default {
  extends: Pie,
  props: ["flights"],
  async mounted() {
    var counts = this.flights.data.reduce((p, c) => {
      var departure = c.departureAirport;
      var arrival = c.arrivalAirport;
      if (departure == null || arrival == null) {
        return p;
      }
      if (!(departure in p)) {
        p[departure] = 0;
      }
      if (!(arrival in p)) {
        p[arrival] = 0;
      }
      var departureDate = new Date(c.departureDate);
      if (departureDate.getTime() < Date.now() + 7 * 24 * 3600 * 1000) {
        // On veut les vols de la semaine
        p[departure]++;
        p[arrival]++;
      }
      return p;
    }, {});

    var dataValues = [];
    var labels = [];
    for (const key in counts) {
      labels.push(key);
      dataValues.push(counts[key]);
    }
    const nValues = dataValues.length;

    data = {
      labels: labels,
      datasets: [
        {
          label: { display: false },
          data: dataValues,
          backgroundColor: availableBackgroundColors.slice(0, nValues),
          borderColor: availableBorderColors.slice(0, nValues),
        },
      ],
    };
    this.renderChart(data, options);
  },
};
</script>

<style>
</style>