<template>
  <section>
    <div class="main-content flight-content">
      <div v-if="flightsShown.length == 0 && loaded">Aucun vol à afficher</div>
      <div v-if="flightsShown" class="flights">
        <div class="flight" v-for="flight in flightsShown" :key="flight.id">
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
          <div class="admin-buttons" v-if="$store.state.admin">
            <a class="delete-button" @click="deleteFlight(flight.id)"
              ><i class="mdi mdi-trash-can-outline"></i
            ></a>
            <a class="details-button" @click="detailsFlight(flight.id)"
              ><i class="mdi mdi-information-outline"></i
            ></a>
          </div>
          <div
            class="admin-buttons"
            v-if="!$store.state.admin && flight.emptyPlaces > 0"
          >
            <a class="book-button" @click="bookFlight(flight.id)"
              >Réservez ce vol</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="search-bar">
      Recherche de vol : de
      <div class="dropdown">
        <button class="dropbtn">
          {{ departureAirportWanted ? departureAirportWanted : "Départ..." }}
        </button>
        <div class="dropdown-content">
          <a v-for="airport in departureAirports" :key="airport.id">
            <a @click="departureAirportWanted = airport">{{ airport }}</a>
          </a>
        </div>
      </div>
      vers
      <div class="dropdown">
        <button class="dropbtn">
          {{ arrivalAirportWanted ? arrivalAirportWanted : "Arrivée..." }}
        </button>
        <div class="dropdown-content">
          <a v-for="airport in arrivalAirports" :key="airport.id">
            <a @click="arrivalAirportWanted = airport">{{ airport }}</a>
          </a>
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
      flightsShown: [],
      departureAirports: ["Tout aéroport"],
      arrivalAirports: ["Tout aéroport"],
      departureAirportWanted: undefined,
      arrivalAirportWanted: undefined,
      loaded: false,
    };
  },
  async mounted() {
    this.getFlights();
    this.loaded = true;
  },
  methods: {
    async getFlights() {
      const { data } = await axios.get(`${process.env.VUE_APP_API_URL}/flight`);
      this.flights = data.sort(
        (firstFlight, secondFlight) =>
          new Date(firstFlight.departureDate).getTime() -
          new Date(secondFlight.departureDate).getTime()
      );
      this.flights.forEach((flight) => {
        if (!this.departureAirports.includes(flight.departureAirport))
          this.departureAirports.push(flight.departureAirport);
        if (!this.arrivalAirports.includes(flight.arrivalAirport))
          this.arrivalAirports.push(flight.arrivalAirport);
      });
      this.flightsShown = [...this.flights];
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
      await axios.post(`${process.env.VUE_APP_API_URL}/delete/flight`, { id });
      this.getFlights();
    },
    detailsFlight(id) {
      this.$router.push(`/flight/${id}`);
    },
    filterFlight() {
      this.flightsShown = [...this.flights];
      if (
        this.departureAirportWanted &&
        this.departureAirportWanted != "Tout aéroport"
      ) {
        this.flightsShown = this.flightsShown.filter(
          (flight) => flight.departureAirport == this.departureAirportWanted
        );
      }
      if (
        this.arrivalAirportWanted &&
        this.arrivalAirportWanted != "Tout aéroport"
      ) {
        this.flightsShown = this.flightsShown.filter(
          (flight) => flight.arrivalAirport == this.arrivalAirportWanted
        );
      }
    },
    bookFlight(id) {
      this.$router.push(`/book/${id}`);
    },
  },
  watch: {
    departureAirportWanted: {
      handler: "filterFlight",
      deep: true,
    },
    arrivalAirportWanted: {
      handler: "filterFlight",
      deep: true,
    },
  },
};
</script>