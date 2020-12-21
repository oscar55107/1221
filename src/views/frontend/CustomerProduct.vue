<template>
<div>
  <div class="container pt-8">
    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel" data-interval="3000">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
      <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="@/assets/images/product-tent.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h3>帳篷</h3>
        </div>
      </div>
      <div class="carousel-item">
        <img src="@/assets/images/product-kitchen.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h3>廚具</h3>
        </div>
      </div>
      <div class="carousel-item">
        <img src="@/assets/images/product-bag.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h3>機能背包</h3>
        </div>
      </div>
    </div>
    </div>
    <div class="row noGutter__row">
      <div class="sale noGutter__co col-12 text-center py-3 mt-6" data-aos="fade-up">
        開幕期間，輸入 fireman 優惠碼，立即享 <span>20% off</span> 折扣 !!!!
      </div>
    </div>
    <div class="row mt-7">
      <div class="col-lg-3">
        <div class="list sticky-top mb-4">
          <h5 class="h3 text-primary pb-2 list__title mb-5">分類</h5>
          <div class="list-group mb-5">
          <a href="" class="list-group-item list-group-item-action" data-toggle="list"  @click.prevent="getProducts()" :class="{ 'active' : visibility == 'all' }">
              <i class="fas fa-box mr-3"></i>所有產品
            </a>
            <a href="" class="list-group-item list-group-item-action" data-toggle="list" @click.prevent="getListProduct('帳篷')" :class="{ 'active' : visibility == '帳篷'}">
              <i class="fas fa-home mr-3"></i>帳篷
            </a>
            <a href="" class="list-group-item list-group-item-action" data-toggle="list" @click.prevent="getListProduct('睡袋')" :class="{ 'active' : visibility == '睡袋' }">
              <i class="fas fa-bed mr-3"></i>睡袋
            </a>
            <a href="" class="list-group-item list-group-item-action" data-toggle="list" @click.prevent="getListProduct('營火')" :class="{'active' : visibility == '營火'}">
              <i class="fas fa-fire mr-3"></i>柴火
            </a>
            <a href="#" class="list-group-item list-group-item-action" @click.prevent="getListProduct('廚具')" :class="{'active' : visibility == '廚具'}">
              <i class="fas fa-utensils mr-3"></i>廚具
            </a>
          </div>
        </div>
      </div>
      <div class="col-lg-9">
        <div class="row d-flex justify-content-center">
          <div class="col-8">
            <div class="input-group mb-4">
              <input type="text" class="form-control border" placeholder="找尋什麼商品呢??" v-model.trim="searchFilter" @keyup.enter="searchProduct">
              <div class="input-group-append">
                <button class="btn border" type="button" @click.prevent="searchProduct">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-sm-12  mb-4"  v-for="item in products" :key="item.id" >
            <div class="card h-100 product__card" >
              <div class="box" @click="getProduct(item.id)">
                <img :src="item.imageUrl" class="card-img-top img-fluid" alt="...">
                <div class="title">
                  <button type="button" class="btn more text-white">
                    <i class="fas fa-spinner fa-spin" v-if="loadingItem === item.id"></i>
                    More
                  </button>
                </div>
              </div>
              <div class="card-body" @click="getProduct(item.id)">
                <h5 class="card-title">{{ item.title }}</h5>
                <div class="text-truncate">
                  {{ item.description }}
                </div>
                <div class="d-flex justify-content-between align-items-baseline mt-3">
                  <div class="h5" v-if="!item.price">{{ item.origin_price | currency }}</div>
                  <del class="h6 text-muted" v-if="item.price">{{ item.origin_price | currency}}</del>
                  <div class="h5 text-danger" v-if="item.price">{{ item.price | currency}}</div>
                </div>
              </div>
              <div class="card-footer d-flex">
                <button type="button" class="btn btn-block btn-primary mt-3" @click='addToCart(item.id)'>
                  <i class="fas fa-spinner fa-spin" v-if="loadingItem === item.id"></i>
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="(searchFilter || products.length) && products.length == 0" class="d-flex flex-column align-items-center mt-6">
          <i class="far fa-frown fa-3x text-muted mb-3"></i>
          <p>查無與「{{ searchFilter }}」相關的結果</p>
        </div>
        <Pagination @postPage="getProducts" :pages="pagination"></Pagination>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination.vue'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      products: [],
      pagination: {},
      product: {},
      visibility: 'all',
      searchFilter: ''
    }
  },
  methods: {
    getProducts (page = 1) {
      const vm = this
      vm.visibility = 'all'
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      vm.$store.dispatch('updateLoading', true)
      $('.pagination').show()
      vm.$http.get(api).then(response => {
        vm.$store.dispatch('updateLoading', false)
        const temp = response.data.products
        vm.products = temp.filter(item => {
          return item.is_enabled === 1
        })
        vm.pagination = response.data.pagination
      })
    },
    getListProduct (category) {
      const vm = this
      vm.visibility = category
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.$store.dispatch('updateLoading', true)
      $('.pagination').hide()
      vm.$http.get(api).then(response => {
        vm.$store.dispatch('updateLoading', false)
        const temp = response.data.products
        vm.products = temp.filter(item => {
          return item.category === category
        })
      })
    },
    getProduct (id) {
      const vm = this
      vm.$router.push(`/product_detail/${id}`)
    },
    addToCart (id, qty = 1) {
      const target = this.$store.state.cartModule.cart.carts.filter(item => item.product_id === id)
      if (target.length > 0) {
        const sameItem = target[0]
        const originQty = sameItem.qty
        const originCartId = sameItem.id
        const originProductId = sameItem.product_id
        const newQty = originQty + qty
        this.$store.dispatch('cartModule/updateProductQty', { originCartId, originProductId, newQty })
      } else {
        this.$store.dispatch('cartModule/addToCart', { id, qty })
      }
    },
    searchProduct (searchFilter) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.$store.dispatch('updateLoading', true)
      $('.pagination').hide()
      vm.visibility = ''
      vm.$http.get(api).then(response => {
        const temp = response.data.products
        vm.products = temp.filter(item => {
          return item.title.match(vm.searchFilter)
        })
        vm.$store.dispatch('updateLoading', false)
      })
    }
  },
  components: {
    Pagination
  },
  computed: {
    ...mapGetters('cartModule', ['loadingItem'])
  },
  created () {
    this.getProducts()
  }
}
</script>
