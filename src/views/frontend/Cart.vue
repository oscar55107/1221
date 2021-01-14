<template>
  <div>
    <Alert></Alert>
    <div class="container mt-8 mb-4 cart">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-md-10">
          <div class="card">
            <div class="card-header bg-third">
              <h4 class="h5 text-primary text-center text-bold">購物車</h4>
            </div>
            <div class="card-body">
              <div class="table-responsive-lg">
                <table class="table table-sm" v-if ="cart.carts.length">
                  <thead>
                    <th></th>
                    <th class="d-none d-md-table-cell table__img">產品圖片</th>
                    <th width="30%">產品名稱</th>
                    <th width="40%">數量</th>
                    <th>價錢</th>
                  </thead>
                  <tbody>
                    <tr v-for="item in cart.carts" :key="item.id">
                      <td class="align-middle">
                        <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                          <i class="far fa-trash-alt"></i>
                        </button>
                      </td>
                      <td class="align-middle d-none d-md-table-cell">
                        <img :src="item.product.imageUrl" class="img-fluid" alt="購物車購買項目">
                      </td>
                      <td class="align-middle text-bold">
                        {{ item.product.title }}
                        <div class="text-success" v-if="item.coupon">
                        已套用優惠卷
                        </div>
                      </td>
                      <td class="align-middle">
                        <select class="form-control form-control-sm" v-model="item.qty" @change="modifyQty(item.product_id, item.qty, item.id)">
                          <option :value="qty" v-for="qty in 10" :key="qty">{{ qty }}</option>
                        </select>
                      </td>
                      <td class="align-middle text-right" v-if="item.final_total !== item.product.origin_price">{{ item.final_total | currency }}</td>
                      <td class="align-middle text-right" v-else>{{ item.product.origin_price | currency }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="4" v-if="cart.final_total == cart.total" class="text-right text-bold">總計</td>
                      <td class="text-right text-bold" v-if="cart.final_total == cart.total">{{ cart.total | currency }}</td>
                    </tr>
                    <tr v-if="cart.final_total !== cart.total">
                      <td colspan="4" class="text-right text-success">折扣價</td>
                      <td class="text-right text-success">{{ cart.final_total }}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div class="none d-flex flex-column align-items-center mt-6" v-if="cart.carts.length === 0">
                <i class="fa fa-cart-arrow-down fa-4x text-muted mb-2 animate__animated animate__bounce animate__infinite" aria-hidden="true"></i>
                購物車尚未有商品唷!!
                <button type="button" class="btn btn-outline-primary btn-md mt-3" @click='toProduct'>前往購買</button>
              </div>
              <div class="row d-flex justify-content-center mt-7">
                <div class="col-md-10 col-12">
                  <div class="input-group mb-3 input-group-md" v-if ="cart.carts.length">
                    <input type="text" class="form-control" v-model="coupon_code" placeholder="輸入優惠碼">
                    <div class="input-group-append">
                      <button type="button" class="btn btn-outline-primary btn-sm" @click="addCouponCode">
                        套用優惠卷
                      </button>
                    </div>
                  </div>
                  <button type="button" class="btn btn-primary btn-block px-3" v-if="cart.carts.length" @click="toOrder">結帳</button>
                </div>
              </div>
            </div>
            <div class="card-footer bg-third pt-5">
              <p class="text-center">開幕期間，輸入 fireman 優惠碼，立即享 20% off 折扣 !!!!</p>
            </div>
          </div>
          <h2 class="text-center text-primary my-6 hotItem" v-if ="cart.carts.length === 0">本月熱銷商品</h2>
          <div class="row" v-if ="cart.carts.length === 0">
            <div class="col">
              <swiper class="swiper" :options="swiperOption">
                <swiper-slide v-for="(item) in products" :key="item.id">
                  <div class="card h-100" @click="toProduct">
                    <img :src="item.imageUrl" class="card-img-top" alt="本月熱銷商品">
                    <div class="card-body">
                      <h5 class="card-title hotItem__text text-center">{{ item.title }}</h5>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Alert from '@/components/AlertMessage.vue'
import Footer from '@/components/Footer.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Cart',
  data () {
    return {
      coupon_code: '',
      products: [],
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
    getProducts () {
      const vm = this
      vm.visibility = 'all'
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(api).then(response => {
        vm.$store.dispatch('updateLoading', false)
        const temp = response.data.products
        vm.products = temp.filter(item => {
          return item.is_enabled === 1
        })
      })
    },
    addCouponCode () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      vm.$store.dispatch('updateLoading', true)
      vm.$http.post(api, { data: coupon }).then(response => {
        if (response.data.success) {
          vm.$store.dispatch('cartModule/getCart')
          vm.$store.dispatch('updateLoading', false)
        } else {
          vm.$store.dispatch('alertModules/updateMessage', '輸入錯誤')
          vm.$store.dispatch('updateLoading', false)
        }
      })
    },
    toOrder () {
      this.$router.push('customer_order')
    },
    toProduct () {
      this.$router.push('/customer_product')
    },
    modifyQty (productid, qty, id) {
      this.$store.dispatch('cartModule/modifyQty', { productid, qty, id })
    },
    ...mapActions('cartModule', ['removeCartItem'])
  },
  components: {
    Alert,
    Footer
  },
  computed: {
    cart () {
      return JSON.parse(JSON.stringify(this.$store.state.cartModule.cart))
    }
  },
  created () {
    this.$store.dispatch('cartModule/getCart')
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
  .h5{
    margin: 0 !important;
  }
  td,th{
    white-space:nowrap;
  }
  .form-control{
    min-width: 50px;
  }
</style>
