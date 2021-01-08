<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light py-3 fixed-top">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <div class="d-flex align-items-start">
            <div>
              <i class="fas fa-tree"></i>
            </div>
            <h1 class="h3 ml-3">Fireman</h1>
          </div>
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item mr-4">
              <router-link class="nav-link text-bold" to="/about">品牌介紹</router-link>
            </li>
            <li class="nav-item mr-4">
              <router-link class="nav-link text-bold" to="/customer_product">露營用品</router-link>
            </li>
            <li class="nav-item mr-4">
              <router-link class="nav-link text-bold" to="/login">登入</router-link>
            </li>
            <li class="nav-item">
              <div class="dropdown">
                <button class="btn" to="/cart" data-toggle="modal" data-target="#cartModal">
                  <i class="trash fas fa-shopping-cart">
                    <div class="trash__text" v-if="cartData.length">{{ cartData.length }}</div>
                  </i>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">購物清單</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <table class="table table-md" v-if="cartData.length">
            <thead>
              <th width="30%">名稱</th>
              <th width="30%">數量</th>
              <th width="20%">價格</th>
              <th width="20%">刪除</th>
            </thead>
            <tbody>
              <tr v-for="item in cartData" :key="item.id">
                <td width="50%">{{ item.title }}</td>
                <td width="20%">{{ item.qty }}</td>
                <td width="10%">{{ item.price * item.qty | currency}}</td>
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm" @click.prevent="remove(item)">
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="cartData.length === 0">
            <div class="d-flex flex-column align-items-center">
              <i class="trash fas fa-shopping-cart fa-3x text-primary my-4"></i>
              <p>購物車尚未有商品</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click.prevent="toProduct">繼續購買</button>
          <button type="button" class="btn btn-primary" v-if="cartData.length" @click.prevent="toCart">結帳去</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Navbar',
  props: ['len'],
  data () {
    return {
      cartData: []
    }
  },
  methods: {
    getCart () {
      const vm = this
      vm.cartData = JSON.parse(localStorage.getItem('cartData')) || []
    },
    remove (item) {
      const index = this.cartData.indexOf(item)
      this.cartData.splice(index, 1)
      localStorage.setItem('cartData', JSON.stringify(this.cartData))
      this.getCart()
    },
    toProduct () {
      this.$router.push('customer_product').catch(() => {})
    },
    toCart () {
      this.$router.push('/cartcheckout')
      $('#cartModal').modal('hide')
    }
  },
  created () {
    this.$bus.$on('cart:get', () => this.getCart())
  },
  mounted () {
    $(function () {
      if ($(window).width() < 800) {
        $('.navbar .nav-item').on('click', () => {
          $('.navbar-toggler').click()
        })
      }
    })
  }
}
</script>

<style scoped lang="scss">
h1{
  font-family: 'Carter One',cursive;
}
.nav-item{
font-weight: bold;
border-bottom:2px solid transparent;
position: relative;
&:hover{
  cursor: pointer;
  &:after{
    left: 0%;
    width: 100%;
  }
}
&:after{
  content: "";
  width: 0;
  height: 2px;
  background: rgb(0, 0, 0);
  position: absolute;
  top: 100%;
  left: 50%;
  transition: all 0.8s;
}
.trash{
  position: relative;
  &__text{
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: red;
    top: -8px;
    right: -8px;
    border-radius: 50%;
    z-index: 55;
    color: #fff;
    font-size: 8px;
  }
}
}
</style>
