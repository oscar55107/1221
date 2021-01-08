<template>
  <div>
    <Navbar></Navbar>
    <Alert></Alert>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Alert from '@/components/AlertMessage'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Index',
  methods: {
    ...mapActions('cartModule', ['getCart'])
  },
  components: {
    Navbar,
    Alert
  },
  computed: {
    ...mapGetters('cartModule', ['cart'])
  },
  created () {
    this.getCart()
  }
}
</script>
