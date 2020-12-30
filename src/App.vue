<template>
  <div id="app">
    <div id='fb-root'></div>
    <loading :active.sync="isLoading">
    </loading>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isLoading'])
  }
}
</script>

<style lang="scss">
  @import "./assets/scss/all";
</style>
