<template>
  <section class="main-content">
    <flight-creator />
  </section>
</template>
<script>
import axios from "axios";
import FlightCreator from "@/components/flight-creator";
export default {
  components : {FlightCreator},
  data() {
    return {
      flights: [],
    };
  },
  async mounted() {
    const { data } = await axios.get(`${process.env.VUE_APP_API_URL}/flight`);
    this.flights = data;
    console.log(data);
  },
};
</script>