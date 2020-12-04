<template>
  <section class="chart-content">
    <div class="panel-row">
        <availablePlanes class="panel" />

        <revenuesByLines class="panel" />
    </div>
    <div class="panel-row">

        <airportBusiness class="panel" />
        <planeFilling class="panel"/>

    </div>
  </section>
</template>

<script>
//import Testchart from './charts/testchart.vue';
import AvailablePlanes from "./charts/available-planes.vue";
import RevenuesByLines from "./charts/revenues-by-lines.vue";
import AirportBusiness from "./charts/airport-business.vue";
import PlaneFilling from "./charts/plane-filling.vue";

export default {
  components: {
    AvailablePlanes,
    RevenuesByLines,
    AirportBusiness,
    PlaneFilling,
  },
};
</script>
