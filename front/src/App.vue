<template>
  <div id="app">
    <img class='background'/>
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/navbar'
export default {
  components: {Navbar}
};
</script>

<style lang="css">
@import "style/style.css";
</style>
