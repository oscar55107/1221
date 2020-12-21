<template>
  <div>
    <div class="login">
      <form class="form-signin" @submit.prevent="signin" data-aos="fade-up">
        <h1 class="h3 mb-3 font-weight-normal text-w">登入</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" class="form-control" v-model="user.username"
        placeholder="Email address" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" v-model="user.password"
        placeholder="Password" required>
        <button class="btn btn-lg  btn-block sigin text-white" type="submit">登入</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
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
        }
      })
    }
  },
  mounted () {
    document.querySelector('.login').style.height = window.innerHeight + 'px'
  }
}
</script>

<style scoped>
html,body {
    height: 100%;
}
body {
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
}
.form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
    background:rgba(201, 201, 201, 0.5);
    border-radius:20px;
}
.form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
}
.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
.login{
    background-image: url(../../assets/images/login.jpg);
    background-size: cover;
    background-position: center center;
    display:flex;
    flex-direction:row;
    align-items:center;
}
.sigin{
    background:rgba(34, 34, 34, 0.5)
}
.sigin:hover{
    background:rgba(0, 0, 0, 0.5)
}
</style>
