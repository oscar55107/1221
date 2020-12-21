<template>
<div>
  <Alert></Alert>
  <div class="container mt-8 mb-4">
    <div class="card">
      <div class="card-header bg-third">
        <h4 class="h5 text-primary text-center text-bold">購物車</h4>
      </div>
      <div class="card-body">
        <table class="table table-lg table-responsive" v-if ="cart.carts.length">
          <thead>
            <th width="80"></th>
            <th width="30%">產品圖片</th>
            <th >產品名稱</th>
            <th width="120">數量</th>
            <th width="120">價錢</th>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id" >
              <td class="align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm"
                @click="removeCartItem(item.id)"
                >
                <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">
                <img :src="item.product.imageUrl" class="img-fluid" alt="">
              </td>
              <td class="align-middle text-bold">
              {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">
                已套用優惠卷
                </div>
              </td>
              <td class="align-middle">
                <select class="form-control" v-model="item.qty" @change="modifyQty(item.product_id, item.qty, item.id)">
                    <option :value="qty" v-for="qty in 10" :key="qty">{{ qty }}</option>
                </select>
              </td>
              <td class="align-middle text-right" v-if="item.final_total !== item.product.origin_price">{{ item.final_total | currency}}</td>
              <td class="align-middle text-right" v-else>{{ item.product.origin_price | currency}}</td>
            </tr>
          </tbody>
          <tfoot>
              <tr>
                  <td colspan="4" v-if="cart.final_total == cart.total" class="text-right text-bold">總計</td>
                  <td class="text-right text-bold" v-if="cart.final_total == cart.total">{{ cart.total | currency}}</td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                  <td colspan="4" class="text-right text-success">折扣價</td>
                  <td class="text-right text-success">{{ cart.final_total }}</td>
              </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3 input-group-md" v-if ="cart.carts.length">
          <input type="text" class="form-control" v-model="coupon_code" placeholder="輸入優惠碼">
          <button type="button" class="btn btn-outline-primary btn-sm mr-6" @click="addCouponCode">
              套用優惠卷
          </button>
          <button type="button" class="btn btn-primary btn-md w-15" @click="toOrder">下一步</button>
        </div>
        <div class="none d-flex flex-column align-items-center" v-if="cart.carts.length === 0">
          <i class="fa fa-cart-arrow-down fa-3x text-muted mb-2" aria-hidden="true"></i>
          購物車尚未有商品唷!!
        </div>
      </div>
      <div class="card-footer bg-third py-5">
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Alert from '@/components/AlertMessage.vue'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      coupon_code: ''
    }
  },
  methods: {
    addCouponCode () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      vm.$store.dispatch('updateLoading', true)
      vm.$http.post(api, { data: coupon }).then(response => {
        if (response.data.success) {
          vm.getCart()
          vm.$store.dispatch('updateLoading', false)
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger')
          vm.$store.dispatch('updateLoading', false)
        }
      })
    },
    toOrder () {
      this.$router.push('/customer_order')
    },
    modifyQty (productid, qty, id) {
      this.$store.dispatch('cartModule/modifyQty', { productid, qty, id })
    },
    ...mapActions('cartModule', ['removeCartItem'])
  },
  components: {
    Alert
  },
  computed: {
    cart () {
      return JSON.parse(JSON.stringify(this.$store.state.cartModule.cart))
    }
  },
  created () {
    this.$store.dispatch('cartModule/getCart')
  }
}
</script>
