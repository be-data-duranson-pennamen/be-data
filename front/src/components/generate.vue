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
    <div class="item">
      <button class="blue-button" @click="generateTickets">
        Créer des billets (nombre aléatoire)
      </button>
    </div>
    <div class="item">
      <button class="red-button" @click="deleteAllData">
        Supprimer toutes les données
      </button>
    </div>
  </section>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      employeeNumber: 10,
      passengerNumber: 1000,
      planeNumber: 5
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
      alert(`${this.passengerNumber} clients ont été créés`);
    },
    async generateTickets() {
      await axios.get(
        `${process.env.VUE_APP_API_URL}/generate/ticket`
      );
      alert(`Des billets ont été créés`);
    },
    async deleteAllData() {
      const wantToDelete = confirm("Voulez-vous vraiment supprimer tout le contenu de la base de données ?");
      if (wantToDelete) {
        await axios.get(
          `${process.env.VUE_APP_API_URL}/delete/all`
        );
        alert('Les données ont bien été supprimées')
      }
    },
  },
};
</script>