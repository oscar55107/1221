<template>
  <div>
    <div class="container mt-7">
      <div class="row d-flex justify-content-center">
        <div class="col-md-10 col">
          <div class="my-5">
            <h3 class="text-center text-primary mb-5">確認訂購資料</h3>
            <div class="card mb-5">
              <div class="card-header bg-third">
                <h4 class="h5 text-center text-primary text-bold">訂單資訊</h4>
              </div>
              <div class="card-body">
                <div class="table-responsive-lg">
                  <table class="table table-sm">
                    <thead>
                      <tr>
                        <th class="d-none d-md-table-cell table__img"></th>
                        <th scope="col">產品名稱</th>
                        <th scope="col">數量</th>
                        <th scope="col">單價</th>
                        <th scope="col">價格</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in order.products" :key="item.id">
                        <td class="d-none d-md-table-cell">
                          <img :src="item.product.imageUrl" class="img-fluid" alt="訂單產品">
                        </td>
                        <td scope="row">{{ item.product.title }}</td>
                        <td>{{ item.qty }}</td>
                        <td class="text-right">{{ item.final_total | currency }}</td>
                        <td class="text-right">
                          <strong>{{ ( item.final_total * item.qty ) | currency  }} </strong>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="4" class="text-right">總計</td>
                        <td class="text-right">
                          <strong>{{ order.total }}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="my-5" @click="payOrder">
            <div class="card text-center">
              <div class="card-header text-primary text-bold">
                <h4 class="h5 text-center text-primary text-bold">聯絡資料</h4>
              </div>
              <div class="card-body">
                <table class="table">
                  <tr>
                    <th>
                      <strong>電子郵件</strong>
                    </th>
                    <td>{{ order.user.email }}</td>
                  </tr>
                  <tr>
                    <th>
                      <strong>姓名</strong>
                    </th>
                    <td>{{ order.user.name }}</td>
                  </tr>
                  <tr>
                    <th>
                      <strong>電話</strong>
                    </th>
                    <td>{{ order.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>
                      <strong>地址</strong>
                    </th>
                    <td>{{ order.user.address }}</td>
                  </tr>
                  <tr>
                    <th>
                      <strong>付款狀態</strong>
                    </th>
                    <td>
                      <span v-if="!order.is_paid">尚未付款</span>
                      <span v-else class="text-success">付款完成</span>
                    </td>
                  </tr>
                </table>
                <div class="text-right" v-if="order.is_paid === false">
                  <button type="button" class="btn btn-primary btn-block" @click="toCheckout">確認付款</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  name: 'CustomerCheckout',
  data () {
    return {
      order: {
        user: {}
      },
      orderId: ''
    }
  },
  methods: {
    getOrder () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(url).then(response => {
        vm.order = response.data.order
        vm.$store.dispatch('updateLoading', false)
      })
    },
    payOrder () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.post(url).then(response => {
        if (response.data.success) {
          vm.getOrder()
        }
        vm.$store.dispatch('updateLoading', false)
      })
    },
    toCheckout () {
      this.$router.push('/checkout')
    }
  },
  components: {
    Footer
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>
