<template>
  <div>
    <Navbar :len="cart.carts.length"></Navbar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('cartModule', ['getCart'])
  },
  components: {
    Navbar,
    Footer
  },
  computed: {
    ...mapGetters('cartModule', ['cart'])
  },
  created () {
    this.getCart()
  }
}
</script>
