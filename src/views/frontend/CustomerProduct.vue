<template>
<div>
  <div id="carouselExampleCaptions" class="carousel slide mt-8" data-ride="carousel" data-interval="3000">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
      <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="@/assets/images/product-tent.jpg" class="d-block w-100" alt="帳篷">
        <div class="carousel-caption d-md-block">
          <h3>帳篷</h3>
        </div>
      </div>
      <div class="carousel-item">
        <img src="@/assets/images/product-kitchen.jpg" class="d-block w-100" alt="廚具">
        <div class="carousel-caption d-md-block">
          <h3>廚具</h3>
        </div>
      </div>
      <div class="carousel-item">
        <img src="@/assets/images/product-bag.jpg" class="d-block w-100" alt="機能背包">
        <div class="carousel-caption d-md-block">
          <h3>機能背包</h3>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
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
            <a href="" class="list-group-item list-group-item-action" data-toggle="list" @click.prevent="changeTab('all')" :class="{ 'active' : visibility == 'all' }">
              <i class="fas fa-box mr-3"></i>所有產品
            </a>
            <a href="" class="list-group-item list-group-item-action" data-toggle="list" @click.prevent="changeTab('帳篷')" :class="{ 'active' : visibility == '帳篷'}">
              <i class="fas fa-home mr-3"></i>帳篷
            </a>
            <a href="" class="list-group-item list-group-item-action" data-toggle="list" @click.prevent="changeTab('睡袋')" :class="{ 'active' : visibility == '睡袋' }">
              <i class="fas fa-bed mr-3"></i>睡袋
            </a>
            <a href="" class="list-group-item list-group-item-action" data-toggle="list" @click.prevent="changeTab('營火')" :class="{'active' : visibility == '營火'}">
              <i class="fas fa-fire mr-3"></i>柴火
            </a>
            <a href="#" class="list-group-item list-group-item-action" data-toggle="list" @click.prevent="changeTab('廚具')" :class="{'active' : visibility == '廚具'}">
              <i class="fas fa-utensils mr-3"></i>廚具
            </a>
          </div>
        </div>
      </div>
      <div class="col-lg-9">
        <div class="row d-flex justify-content-center">
          <div class="col-10">
            <div class="input-group mb-4">
              <input type="text" class="form-control border" placeholder="找尋什麼商品呢??" v-model.trim="searchFilter" @input="searchProduct">
              <div class="input-group-append">
                <button class="btn border" type="button" @click.prevent="searchProduct">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 col-sm-6 mb-4" v-for="item in filterPager" :key="item.id">
            <div class="card h-100 product__card">
              <div class="box" @click="getProduct(item.id)">
                <img :src="item.imageUrl" class="card-img-top img-fluid" alt="各項產品照片">
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
                  <del class="h6 text-muted" v-if="item.price">{{ item.origin_price | currency }}</del>
                  <div class="h5 text-danger" v-if="item.price">{{ item.price | currency }}</div>
                </div>
              </div>
              <div class="card-footer d-flex">
                <button type="button" id="addBtn" v-preventReClick class="btn btn-block btn-primary mt-3" @click='addToCart(item)'>
                  <i class="fas fa-spinner fa-spin" v-if="loadingItem === item.id"></i>
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="(searchFilter || searchResult.length) && searchResult.length == 0" class="d-flex flex-column align-items-center mt-6">
          <i class="far fa-frown fa-3x text-muted mb-3"></i>
          <p>查無與「{{ searchFilter }}」相關的結果</p>
        </div>
        <Pagination @postPage="getPage" :page-data="pagination" v-if="pagination.total_pages"></Pagination>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'CustomerProduct',
  data () {
    return {
      products: [],
      pagination: {
        page_Size: 6,
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false
      },
      product: {},
      visibility: 'all',
      searchFilter: '',
      searchResult: [],
      cartData: []
    }
  },
  methods: {
    getProducts () {
      const vm = this
      vm.visibility = 'all'
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(api).then(response => {
        const temp = response.data.products
        vm.products = temp.filter(item => {
          return item.is_enabled === 1
        })
        vm.$store.dispatch('updateLoading', false)
      })
    },
    getProduct (id) {
      const vm = this
      vm.$router.push(`/product_detail/${id}`)
    },
    getCart () {
      this.cartData = JSON.parse(localStorage.getItem('cartData')) || []
    },
    addToCart (data, qty = 1) {
      const vm = this
      vm.getCart()
      const cacheCartId = []
      vm.cartData.forEach(item => cacheCartId.push(item.product_id))
      if (cacheCartId.indexOf(data.id) === -1) {
        const cartContent = {
          product_id: data.id,
          qty: 1,
          title: data.title,
          price: data.price
        }
        vm.cartData.push(cartContent)
        localStorage.setItem('cartData', JSON.stringify(vm.cartData))
        vm.getCart()
        vm.$bus.$emit('cart:get')
      } else {
        vm.cartData.forEach((item, key) => {
          if (item.product_id === data.id) {
            let { qty } = item
            const cache = {
              product_id: data.id,
              qty: qty += 1,
              title: data.title,
              price: data.price
            }
            vm.cartData.splice(key, 1)
            vm.cartData.push(cache)
            localStorage.setItem('cartData', JSON.stringify(vm.cartData))
            vm.getCart()
            vm.$bus.$emit('cart:get')
          }
        })
      }
    },
    getPage (page = 1) {
      const vm = this
      vm.pagination.current_page = page
    },
    searchProduct () {
      const vm = this
      vm.pagination.current_page = 1
      vm.visibility = ''
      if (vm.searchFilter) {
        vm.searchResult = vm.products.filter((item) => { return item.title.match(vm.searchFilter) })
      } else {
        vm.searchResult = []
      }
    },
    changeTab (prodCategory) {
      const vm = this
      vm.visibility = prodCategory
      vm.pagination.current_page = 1
      vm.searchFilter = ''
      vm.searchResult = []
    }
  },
  components: {
    Pagination
  },
  computed: {
    filterData () {
      const vm = this
      if (vm.searchFilter || vm.searchResult.length) {
        return vm.searchResult
      } else if (vm.visibility === 'all') {
        return vm.products
      } else {
        return vm.products.filter((item) => {
          return item.category === vm.visibility
        })
      }
    },
    filterPager () {
      const vm = this
      const dataSize = vm.filterData.length
      const pageSize = vm.pagination.page_Size
      vm.pagination.total_pages = Math.ceil(dataSize / pageSize)
      const nowPage = vm.pagination.current_page
      if (nowPage > 1) {
        vm.pagination.has_pre = true
      } else {
        vm.pagination.has_pre = false
      }
      if (nowPage < vm.pagination.total_pages) {
        vm.pagination.has_next = true
      }
      if (nowPage + 1 > vm.pagination.total_pages) {
        vm.pagination.has_next = false
      }
      return vm.filterData.filter((item, index) => {
        return index < (nowPage * pageSize) && index >= (nowPage - 1) * pageSize
      })
    },
    ...mapGetters('cartModule', ['loadingItem'])
  },
  directives: {
    preventReClick: {
      inserted (el, binding) {
        el.addEventListener('click', () => {
          if (!el.disabled) {
            el.disabled = true
            setTimeout(() => {
              el.disabled = false
            }, 500)
          }
        })
      }
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
