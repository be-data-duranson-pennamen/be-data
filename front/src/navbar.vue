<template>
  <div class="navbar">
    <a v-if="!$store.state.admin" class="link" @click="login">Admin</a>
    <a v-if="$store.state.admin && $route.path != '/admin'" class="link"
      ><router-link to="/admin">Menu</router-link></a
    >
    <a
      v-if="$store.state.admin"
      class="link"
      @click="
        $store.commit('logout');
        $router.push('/');
      "
      >Déconnexion</a
    >
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      const password = prompt("Mot de passe");
      if (password == "admin") {
        this.$store.commit("login");
        this.$router.push("/admin");
      } else {
        alert("Mot de passe incorrect");
      }
    },
  },
};
</script>

<style>
</style>