<template>
  <section class="main-content">
    <button class='design-button blue-button' @click='$router.push("/flight-creator")'>Créer un vol</button>
    <button class='design-button blue-button' @click='$router.push("/")'>Voir les vols</button>
    <button class='design-button blue-button' @click='$router.push("/generate")'>Générer des données d'étude</button>
    <button class='design-button blue-button' @click='$router.push("/statistics")'>Statistiques</button>
  </section>
</template>
<script>

export default {

};
</script>