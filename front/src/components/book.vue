<template>
  <section class="main-content" v-if="flight">
    <strong class="item"> Veuillez remplir ce formulaire pour le vol </strong>
    <strong class="item">
      {{ showAirportFullName(flight.departureAirport) }} ->
      {{ showAirportFullName(flight.arrivalAirport) }}
    </strong>
    <div class="item">Nom <input type="text" v-model="lastName" /></div>
    <div class="item">Prénom <input type="text" v-model="firstName" /></div>
    <div class="item">Adresse <input type="text" v-model="address" /></div>
    <a class="design-button green-button" @click="book">Valider</a>
    <a class="design-button blue-button" @click="$router.push('/')">Retour</a>
  </section>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      firstName: undefined,
      lastName: undefined,
      address: undefined,
      flight: undefined,
    };
  },
  async mounted() {
    const { data } = await axios.post(`${process.env.VUE_APP_API_URL}/flight`, {
      id: this.$route.params.flightId,
    });
    if (data == null) this.$router.push("/");
    this.flight = data;
  },
  methods: {
    async book() {
      let errorMessage = "";
      if (!this.firstName) {
        errorMessage = errorMessage + "\n - Votre prénom";
      }
      if (!this.lastName) {
        errorMessage = errorMessage + "\n - Votre nom";
      }
      if (!this.address) {
        errorMessage = errorMessage + "\n - Votre adresse";
      }

      if (errorMessage != "") {
        errorMessage = "Il manque les informations suivantes :" + errorMessage;
        alert(errorMessage);
      } else {
        const newPassenger = await axios.post(
          `${process.env.VUE_APP_API_URL}/passenger/create`,
          {
            firstName: this.firstName,
            lastName: this.lastName,
            address: this.address,
          }
        );
        console.log(newPassenger)
        if(!newPassenger.data.alreadyExists) {
          await axios.post(`${process.env.VUE_APP_API_URL}/ticket/create`, {
            passengerId: newPassenger.data.id,
            flightId: this.flight.id,
          });
  
          alert("Vol réservé");
          this.$router.push("/");
        } else {
          alert('Ce client a déjà réservé ce vol')
        }
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
  },
};
</script>