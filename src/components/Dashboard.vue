<template>
<div>
  <DNavbar></DNavbar>
  <Alert></Alert>
  <div class="container-fluid">
    <div class="row">
      <DSidebar></DSidebar>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</div>
</template>

<script>
import DNavbar from './DNavbar.vue'
import DSidebar from './DSidebar.vue'
import Alert from './AlertMessage.vue'
export default {
  components: {
    DNavbar,
    DSidebar,
    Alert
  },
  created () {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)campToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = myCookie
  }
}
</script>
