<template>
  <section class="chart-content">
    <div class="panel">
      <availablePlanes />
    </div>
    <div class="panel">
      <revenuesByLines />
    </div>
    <div class="panel">
      <airportBusiness />
    </div>
    <div/>
    <div class="panel" />
      <planeFilling />
    <div/>
  </section>
</template>

<script>
//import Testchart from './charts/testchart.vue';
import AvailablePlanes from './charts/available-planes.vue';
import RevenuesByLines from './charts/revenues-by-lines.vue';
import AirportBusiness from './charts/airport-business.vue';
import PlaneFilling from './charts/plane-filling.vue';

export default {
  components: {
    AvailablePlanes,
    RevenuesByLines,
    AirportBusiness,
    PlaneFilling
    },
};
</script>

<style>
@import "../style/statistics.css";
</style>