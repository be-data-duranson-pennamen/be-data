<template>
  <section class="main-content flight-content">
    <div class="flight" v-for="flight in flights" :key="flight.id">
      <strong class="item">
        Vol {{ flight.departureAirport }} -> {{ flight.arrivalAirport }}
      </strong>
      <div class="item">
        Départ : {{new Date(flight.departureDate)}} Arrivée : {{new Date(flight.arrivalDate)}}
      </div>
      <div style='color:green'>{{flight.price/100}}€</div>
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