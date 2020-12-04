<template>
  <section v-if="loaded" class="chart-content">
    <div v-if="loaded" class="panel-row">
      <availablePlanes :planes='planes' class="panel" />
      <revenuesByLines :tickets='tickets' :flights="flights" :planes="planes" class="panel" />
    </div>
    <div v-if="loaded" class="panel-row">
      <airportBusiness :flights="flights" class="panel" />
      <planeFilling :flights="flights" :planes="planes" class="panel" />
    </div>
  </section>
</template>

<script>
//import Testchart from './charts/testchart.vue';
import AvailablePlanes from "./charts/available-planes.vue";
import RevenuesByLines from "./charts/revenues-by-lines.vue";
import AirportBusiness from "./charts/airport-business.vue";
import PlaneFilling from "./charts/plane-filling.vue";
import axios from "axios";
export default {
  components: {
    AvailablePlanes,
    RevenuesByLines,
    AirportBusiness,
    PlaneFilling,
  },
  data() {
    return {
      tickets: undefined,
      planes: undefined,
      flights: undefined,
      loaded: false,
    };
  },
  async mounted() {
    this.tickets = await axios.get(`${process.env.VUE_APP_API_URL}/ticket`);
    this.planes = await axios.get(`${process.env.VUE_APP_API_URL}/plane`);
    this.flights = await axios.get(`${process.env.VUE_APP_API_URL}/flight`);
    this.loaded = true;
  },
};
</script>
