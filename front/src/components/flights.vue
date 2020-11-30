<template>
  <section class="main-content">
    <div class='flight' v-for='flight in flights' :key='flight.id'>
      {{flight}}
    </div>
  </section>
</template>
<script>
import axios from "axios";

export default {

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