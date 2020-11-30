<template>
  <section class="main-content">
    <h1>Générer des données d'étude</h1>
    <div class="item">
      <input type="number" min="0" v-model="employeeNumber" />
      <button class="blue-button" @click="generateEmployees">
        Créer des employées
      </button>
    </div>
    <div class="item">
      <input type="number" min="0" v-model="planeNumber" />
      <button class="blue-button" @click="generatePlanes">
        Créer des avions
      </button>
    </div>
    <div class="item">
      <input type="number" min="0" v-model="passengerNumber" />
      <button class="blue-button" @click="generatePassengers">
        Créer des clients
      </button>
    </div>
    <!-- <div class="item">
        <input type="number" min="0" v-model="ticketNumber">
      <button class="blue-button" @click="generateTickets">
        Créer des billets achétés
      </button>
    </div> -->
  </section>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      employeeNumber: 10,
      passengerNumber: 100,
      planeNumber: 5,
      ticketNumber: 100,
    };
  },
  methods: {
    async generateEmployees() {
      await axios.get(
        `${process.env.VUE_APP_API_URL}/generate/employee?num=${this.employeeNumber}`
      );
      alert(`${this.employeeNumber} employés ont été créés`);
    },
    async generatePlanes() {
      await axios.get(
        `${process.env.VUE_APP_API_URL}/generate/plane?num=${this.planeNumber}`
      );
      alert(`${this.planeNumber} avions ont été créés`);
    },
    async generatePassengers() {
      await axios.get(
        `${process.env.VUE_APP_API_URL}/generate/passenger?num=${this.passengerNumber}`
      );
      alert(`${this.planeNumber} clients ont été créés`);
    },
    // async generateTickets() {
    //     await axios.post(`${process.env.VUE_APP_API_URL}/generate/ticket?num=${this.ticketNumber}`)
    //     alert(`${this.ticketNumber} billets ont été créés`)
    // }
  },
};
</script>