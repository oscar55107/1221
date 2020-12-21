<template>
<div>
  <nav class="navbar navbar-dark sticky-top bg-primary flex-md-nowrap p-0 shadow">
    <router-link class="navbar--brand col-md-3 col-lg-2 mr-0 px-3 text-white" to="/">Fireman</router-link>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link text-white" href="#" @click.prevent="signout">登出</a>
      </li>
    </ul>
  </nav>
</div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    signout () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/logout`
      vm.$http.post(url).then(response => {
        if (response.data.success) {
          vm.$router.push('/sigin')
        }
      })
    }
  }
}
</script>
