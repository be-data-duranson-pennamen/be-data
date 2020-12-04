<template>
  <section class="main-content" v-if="flight">
    <strong class="item">
      Vol de {{ showAirportFullName(flight.departureAirport) }} vers
      {{ showAirportFullName(flight.arrivalAirport) }}
    </strong>
    <div v-if="pilotsShown" class="item">
      <strong>Pilotes</strong>
      <div class="dropdown">
        <button class="dropbtn">
          {{
            pilot1 ? pilot1.firstName + " " + pilot1.lastName : "Pilote n°1..."
          }}
        </button>
        <div class="dropdown-content">
          <a v-for="pilot in pilotsShown" :key="pilot.secuNum">
            <a @click="pilot1 = pilot">{{
              pilot.firstName + " " + pilot.lastName
            }}</a>
          </a>
        </div>
      </div>
      <div class="dropdown">
        <button class="dropbtn">
          {{
            pilot2 ? pilot2.firstName + " " + pilot2.lastName : "Pilote n°2..."
          }}
        </button>
        <div class="dropdown-content">
          <a v-for="pilot in pilotsShown" :key="pilot.secuNum">
            <a @click="pilot2 = pilot">{{
              pilot.firstName + " " + pilot.lastName
            }}</a>
          </a>
        </div>
      </div>
    </div>
    <div v-if="stewartsShown" class="item">
      <strong>Stewarts</strong>
      <div class="dropdown">
        <button class="dropbtn">
          {{
            stewart1
              ? stewart1.firstName + " " + stewart1.lastName
              : "Stewart n°1..."
          }}
        </button>
        <div class="dropdown-content">
          <a v-for="stewart in stewartsShown" :key="stewart.secuNum">
            <a @click="stewart1 = stewart">{{
              stewart.firstName + " " + stewart.lastName
            }}</a>
          </a>
        </div>
      </div>
      <div class="dropdown">
        <button class="dropbtn">
          {{
            stewart2
              ? stewart2.firstName + " " + stewart2.lastName
              : "Stewart n°2..."
          }}
        </button>
        <div class="dropdown-content">
          <a v-for="stewart in stewartsShown" :key="stewart.secuNum">
            <a @click="stewart2 = stewart">{{
              stewart.firstName + " " + stewart.lastName
            }}</a>
          </a>
        </div>
      </div>
    </div>
    <div class="item">
      <strong>Prix du billet</strong>
      <input
        type="number"
        min="0"
        v-model="price"
        placeholder="Prix en centimes"
      />
    </div>
    <div class="item">
      <strong>Passagers ({{ passengers.length }})</strong>
      <div class="passengers-view">
        <div v-for="passenger in passengers" :key="passenger.id">
          {{ passenger.firstName }} {{ passenger.lastName }}
        </div>
      </div>
    </div>
    <button class="design-button green-button" @click="validate">
      Valider
    </button>
    <button class="design-button blue-button" @click="$router.push('/')">
      Retour
    </button>
  </section>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      flight: undefined,
      pilots: undefined,
      stewarts: undefined,
      pilotsShown: undefined,
      stewartsShown: undefined,
      pilot1: undefined,
      pilot2: undefined,
      stewart1: undefined,
      stewart2: undefined,
      price: undefined,
      passengers: undefined,
    };
  },
  async mounted() {
    const { data } = await axios.post(`${process.env.VUE_APP_API_URL}/flight`, {
      id: this.$route.params.flightId,
      withPassengers: true,
    });
    if (data == null) this.$router.push("/");
    this.flight = data;

    const employeesOutput = await axios.get(
      `${process.env.VUE_APP_API_URL}/employee`
    );
    this.employees = employeesOutput.data;
    this.pilots = this.employees.filter((employee) => employee.job == "pilot");
    this.stewarts = this.employees.filter(
      (employee) => employee.job == "stewart"
    );
    this.pilotsShown = { ...this.pilots };
    this.stewartsShown = { ...this.stewarts };
    this.pilot1 = this.pilots.find(
      (pilot) => pilot.secuNum == this.flight.pilot1
    );
    this.pilot2 = this.pilots.find(
      (pilot) => pilot.secuNum == this.flight.pilot2
    );
    this.stewart1 = this.stewarts.find(
      (stewart) => stewart.secuNum == this.flight.stewart1
    );
    this.stewart2 = this.stewarts.find(
      (stewart) => stewart.secuNum == this.flight.stewart2
    );

    this.price = this.flight.price;
    this.passengers = this.flight.passengers;
  },
  methods: {
    filterEmployee() {
      if (this.pilot1 || this.pilot2) {
        this.pilotsShown = this.pilots.filter(
          (pilot) =>
            (!this.pilot1 ||
              (this.pilot1 && pilot.secuNum != this.pilot1.secuNum)) &&
            (!this.pilot2 ||
              (this.pilot2 && pilot.secuNum != this.pilot2.secuNum))
        );
      }
      if (this.stewart1 || this.stewart2) {
        this.stewartsShown = this.stewarts.filter(
          (stewart) =>
            (!this.stewart1 ||
              (this.stewart1 && stewart.secuNum != this.stewart1.secuNum)) &&
            (!this.stewart2 ||
              (this.stewart2 && stewart.secuNum != this.stewart2.secuNum))
        );
      }
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
    async validate() {
      await axios.post(`${process.env.VUE_APP_API_URL}/flight/update`, {
        id: this.flight.id,
        pilot1: this.pilot1.secuNum,
        pilot2: this.pilot2.secuNum,
        stewart1: this.stewart1.secuNum,
        stewart2: this.stewart2.secuNum,
        price: this.price,
      });
      alert("Vol modifié");
    },
  },
  watch: {
    pilot1: {
      handler: "filterEmployee",
      deep: true,
    },
    pilot2: {
      handler: "filterEmployee",
      deep: true,
    },
    stewart1: {
      handler: "filterEmployee",
      deep: true,
    },
    stewart2: {
      handler: "filterEmployee",
      deep: true,
    },
  },
};
</script>