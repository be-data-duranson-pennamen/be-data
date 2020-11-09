<template>
  <div class="navbar">
    <a class="link">
      <router-link to="/">Accueil</router-link>
    </a>
    <a class="link">
      <router-link to="/flights">Liste des vols</router-link>
    </a>
  </div>
</template>

<script>
export default {
  data() { 
    return {
      toggleClicked : false
    }
  }
};
</script>

<style>
</style>