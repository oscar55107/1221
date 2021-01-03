<template>
  <div>
    <Navbar></Navbar>
    <Alert></Alert>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Alert from '@/components/AlertMessage'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Index',
  methods: {
    ...mapActions('cartModule', ['getCart'])
  },
  components: {
    Navbar,
    Footer,
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
