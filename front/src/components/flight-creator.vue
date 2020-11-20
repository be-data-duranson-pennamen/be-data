<template>
  <section class="flight-creator">
    <strong>Création de vol</strong>
    <hr />
    <div class="place-choice">
      <strong>Départ</strong>
      <div class="dropdown">
        <button class="dropbtn">{{ departureAirport }}</button>
        <div
          v-for="airport in airports"
          :key="airport.id"
          class="dropdown-content"
        >
          <a @click="departureAirport = airport"></a>
        </div>
      </div>
    </div>
    <div class="place-choice">
      <strong>Arrivée</strong>
      <div class="dropdown">{{ arrivalAirport }}</div>
    </div>
    <hr />
    <h1>Date</h1>
    <div class="place-choice">
      <strong>Heure de départ</strong>
      <div class="dropdown">{{ departureDate }}</div>
    </div>
    <div class="place-choice">
      <strong>Heure d'arrivée</strong>
      <div class="dropdown">{{ arrivalDate }}</div>
    </div>
    <hr />
    <h1>Avion</h1>
    <div class="plane-choice">
      <strong>Avion choisi</strong>
      <div class="dropdown" :value="chosenPlane"></div>
    </div>
    <hr />
    <h1>Personnel</h1>
    <div></div>
  </section>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      airports: undefined,
      departureAirport: undefined,
      arrivalAirport: undefined,
      departureDate: undefined,
      arrivalDate: undefined,
      chosenPlane: undefined,
    };
  },
  methods : {
      async mounted() {
          const output = await axios.get(`${process.env.VUE_APP_API_URL}/flight/airports`);
          console.log(output.data)
          this.airports = output.data
      }
  }
};
</script>