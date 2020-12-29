<template>
  <div id="app">
    <div id='fb-root'></div>
    <loading :active.sync="isLoading">
    </loading>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style lang="scss">
  @import "./assets/scss/all";
</style>
