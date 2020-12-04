<template>
  <section class="main-content flight-content">
    <div v-if="flights.length == 0">Aucun vol à afficher</div>
    <div v-if="flights" class="flights">
      <div class="flight" v-for="flight in flights" :key="flight.id">
        <strong class="item">
          Vol {{ showAirportFullName(flight.departureAirport) }} ->
          {{ showAirportFullName(flight.arrivalAirport) }}
        </strong>
        <div class="item">
          <strong> Départ : </strong>{{ showDate(flight.departureDate) }}
          <strong> Arrivée :</strong>
          {{ showDate(flight.arrivalDate) }}
        </div>
        <div class="item">
          {{
            flight.emptyPlaces > 0
              ? flight.emptyPlaces + " places encore disponibles"
              : "Vol complet !"
          }}
        </div>
        <div class="item price">{{ flight.price / 100 }}€</div>
        <div class="admin-buttons">
          <a
            v-if="$store.state.admin"
            class="delete-button"
            @click="deleteFlight(flight.id)"
            ><i class="mdi mdi-trash-can-outline"></i
          ></a>
          <a
            v-if="$store.state.admin"
            class="details-button"
            @click="detailsFlight(flight.id)"
            ><i class="mdi mdi-information-outline"></i
          ></a>
        </div>
      </div>
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
    this.getFlights();
  },
  methods: {
    async getFlights() {
      const { data } = await axios.get(`${process.env.VUE_APP_API_URL}/flight`);
      this.flights = data.sort(
        (firstFlight, secondFlight) =>
          new Date(firstFlight.departureDate).getTime() -
          new Date(secondFlight.departureDate).getTime()
      );
    },
    showAirportFullName(airport) {
      if (airport == "CDG") return "Paris (Charles de gaulle)";
      if (airport == "FRA") return "Francfort";
      if (airport == "BCN") return "Barcelone";
      if (airport == "MAD") return "Madrid";
      if (airport == "IST") return "Istanbul";
      if (airport == "AMS") return "Amsterdam";
      if (airport == "MUC") return "Munich";
      if (airport == "LHR") return "Londres (Heathrow)";
      if (airport == "LGW") return "Londres (Gatwick)";
    },
    showDate(date) {
      const monthNames = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ];
      const time = new Date(date);
      const day = time.getDate();
      const year = time.getFullYear();
      const month = monthNames[time.getMonth()];
      const hour = time.getHours();
      const minutes = time.getMinutes();
      return `${day} ${month} ${year} ${this.round(hour)}:${this.round(
        minutes
      )}`;
    },
    round(number) {
      if (Number(number) < 10) return `0${number}`;
      else return number;
    },
    async deleteFlight(id) {
      console.log(id);
      await axios.post(`${process.env.VUE_APP_API_URL}/delete/flight`, { id });
      this.getFlights();
    },
    detailsFlight(id) {
      console.log(id);
    },
  },
};
</script>