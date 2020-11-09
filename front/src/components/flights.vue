<template>
  <section class="main-content"></section>
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