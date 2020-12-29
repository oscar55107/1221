<template>
<div>
  <div class="container mt-8 mb-6">
    <div class="row mb-7">
      <div class="col-md-6">
        <img :src="product.imageUrl"  class="img-fluid" alt="詳細產品照片">
      </div>
      <div class="col-md-6 d-flex flex-column justify-content-between">
        <h3 class="product__title mt-2">{{ product.title }}</h3>
        <h6 class="product__type">型號 : {{ product.content }}</h6>
        <h6 class="product__description">產品說明 :</h6>
        <p class="product__text"> {{ product.description }}</p>
        <div class="d-flex justify-content-start align-items-end">
          <div class="h6" v-if="!product.price">NT {{ product.origin_price | currency }}</div>
            <del class="h6 mr-4 text-muted" v-if="product.price">NT {{ product.origin_price | currency }}</del>
          <div class="h5 text-danger" v-if="product.price">NT {{ product.price | currency }}</div>
        </div>
        <select name="" class="product__form form-control " v-model="product.num">
          <option :value="num" v-for="num in 5" :key="num">
            購買 {{ num }}{{ product.unit }}
          </option>
        </select>
        <div class="d-flex justify-content-end align-items-end">
          <h5 class="mr-4 product__total">  小計 : NT{{ (product.num * product.price) | currency }}</h5>
          <div class="btn btn-primary mt-2" @click="addToCart(product.id,product.num)">
            <i class="fas fa-spinner fa-spin" v-if="loadingItem === product.id"></i>
            加到購物車
          </div>
        </div>
      </div>
    </div>
    <h4>你可能也會喜歡</h4>
    <div class="row mt-5">
      <div class="col">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="item in filterData" :key="item.id">
            <div class="card product__card h-100 mt-3" @click="toProduct">
              <div class="card__img">
                <img :src="item.imageUrl" class="card-img-top detail__img" alt="可能也會喜歡的產品">
              </div>
              <div class="card-body">
                <h5 class="card-title text-center detail__text">{{ item.title }}</h5>
                <div class="text-truncate pb-2">
                  {{ item.description }}
                </div>
                <div class="d-flex justify-content-end detail__price">
                  <div  v-if="!item.price">NT {{ item.origin_price | currency }}</div>
                  <del class="text-muted mr-3" v-if="item.price">NT {{ item.origin_price | currency }}</del>
                  <div class="text-danger" v-if="item.price">NT {{ item.price | currency }}</div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductDetail',
  data () {
    return {
      products: [],
      product: {},
      productId: '',
      swiperOption: {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 30,
        grabCursor: true,
        autoplay: {
          delay: 1500,
          disableOnInteraction: false
        },
        breakpoints: {
          480: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          800: {
            slidesPerView: 3,
            spaceBetween: 20
          }
        }
      }
    }
  },
  methods: {
    getProduct () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.productId}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(api).then(response => {
        vm.product = response.data.product
        vm.product.num = 1
        vm.$store.dispatch('updateLoading', false)
      })
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
    getProducts () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.$http.get(api).then(response => {
        vm.products = response.data.products
      })
    },
    toProduct () {
      this.$router.push('/customer_product')
    },
    ...mapActions('cartModule', ['getCart'])
  },
  computed: {
    filterData () {
      const vm = this
      const newData = []
      vm.products.filter(item => {
        if (item.category === vm.product.category) {
          newData.push(item)
        }
      })
      return newData
    },
    ...mapGetters('cartModule', ['cart', 'loadingItem'])
  },
  created () {
    this.productId = this.$route.params.productId
    this.getProduct()
    this.getCart()
    this.getProducts()
  }
}
</script>
