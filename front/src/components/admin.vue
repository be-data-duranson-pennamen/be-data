<template>
  <section class="main-content">
    <button class='design-button blue-button' @click='$router.push("/flight-creator")'>Créer un vol</button>
    <button class='design-button blue-button' @click='$router.push("/")'>Voir les vols</button>
    <button class='design-button blue-button' @click='$router.push("/generate")'>Générer des données d'étude</button>
  </section>
</template>
<script>

export default {

};
</script>