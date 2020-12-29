<template>
  <div>
    <div class="login">
      <form class="form-signin" @submit.prevent="signin">
        <h1 class="h3 mb-3 font-weight-normal text-w">登入</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" class="form-control" v-model="user.username"
        placeholder="Email address" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" v-model="user.password"
        placeholder="Password" required>
        <button class="btn btn-md  btn-block sigin text-white" type="submit">登入</button>
      </form>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.post(api, vm.user).then(response => {
        vm.$store.dispatch('updateLoading', false)
        if (response.data.success) {
          const token = response.data.token
          const expired = response.data.expired
          document.cookie = `campToken= ${token}; expires= ${new Date(expired)};`
          vm.$router.push('/admin/products')
        } else {
          $('.form-signin').addClass('animate__animated animate__shakeX')
          $('.form-signin').on('animationend', function () {
            $(this).removeClass('animate__animated animate__shakeX')
          })
        }
      })
    }
  },
  mounted () {
    document.querySelector('.login').style.height = window.innerHeight + 'px'
  }
}
</script>
