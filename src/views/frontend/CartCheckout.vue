<template>
  <div>
    <div class="container mt-8 mb-4 cart">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-md-10">
          <div class="card">
            <div class="card-header bg-third d-flex align-items-center justify-content-center">
              <h4 class="h5 text-primary text-center text-bold">購買清單確認</h4>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-lg" v-if="cartData.length">
                  <thead>
                    <th width="40%">名稱</th>
                    <th width="20%">數量</th>
                    <th width="30">價格</th>
                    <th width="30">刪除</th>
                  </thead>
                  <tbody>
                    <tr v-for="item in cartData" :key="item.id">
                      <td>{{ item.title }}</td>
                      <td>{{ item.qty }}</td>
                      <td>{{ item.price * item.qty }}</td>
                      <td>
                        <button type="button" class="btn btn-outline-danger btn-sm" @click.prevent="remove(item)">
                          <i class="far fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="d-flex justify-content-end" v-if="cartData.length">
                <button class="btn btn-outline-primary btn-sm" @click.prevent="postCart">確認購買</button>
              </div>
              <div class="none d-flex flex-column align-items-center my-6" v-if="cartData.length === 0">
                <i class="fa fa-cart-arrow-down fa-4x text-muted mb-2 animate__animated animate__bounce animate__infinite" aria-hidden="true"></i>
                購物車尚未有商品唷!!
                <button type="button" class="btn btn-outline-primary btn-md mt-3" @click='toProduct'>前往購買</button>
              </div>
            </div>
            <div class="card-footer py-5 d-flex flex-column justify-content-center align-items-center">
              <h4 class="noticeTitle py-2">訂購須知</h4>
              <p class="noticeContent">
                ※ 請確認所填寫的資料是否正確，下單後未提供修改付款方式服務。<br>
                ※ 因拍攝略有色差，圖片僅供參考，顏色請以實際收到商品為準。<br>
                ※ 本店商品目前只供應台灣地區，只提供宅配到府。<br>
                ※ 目前支援貨到付款、超商付款。<br>
                ※ 本店商品為統一會於付款後7個工作日內出貨(不含假日)。
              </p>
              <h4 class="noticeTitle py-3">退換貨說明</h4>
              <p class="noticeContent">
                ※請直接撥打04-12345678，或到粉絲團詢問相關事宜，會有專人直接為您服務。<br>
                ※須於訂單商品送達後14日內申請<br>
                ※退回之商品內容必須保維持所有商品、贈品、附件、包裝、附隨文件或資料的完整性
              </p>
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
  name: 'CartCheckout',
  data () {
    return {
      cartData: [],
      cacheData: []
    }
  },
  methods: {
    getLocalCart () {
      this.cartData = JSON.parse(localStorage.getItem('cartData')) || []
    },
    remove (item) {
      const index = this.cartData.indexOf(item)
      this.cartData.splice(index, 1)
      localStorage.setItem('cartData', JSON.stringify(this.cartData))
      this.getLocalCart()
      this.$bus.$emit('cart:get')
    },
    postCart () {
      const vm = this
      vm.axios.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`)
        .then((res) => {
          vm.cacheData = res.data.data.carts
        }).then(() => {
          vm.cacheData.forEach((item) => {
            this.axios.delete(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`).then(() => {
            })
          })
        }).then(() => {
          vm.cartData.forEach((item) => {
            const cache = {
              product_id: item.product_id,
              qty: item.qty
            }
            vm.axios.post(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`, { data: cache })
              .then(() => {
                this.cartData = []
                localStorage.removeItem('cartData')
                this.getLocalCart()
                this.$bus.$emit('cart:get')
                this.$store.dispatch('cartModule/getCart')
                this.$router.push('cart').catch(() => {})
              })
          })
        })
    },
    toProduct () {
      this.$router.push('customer_product')
    }
  },
  components: {
    Footer
  },
  created () {
    this.getLocalCart()
  }
}
</script>

<style lang="scss" scoped>
  .h5{
    margin: 0 !important;
  }
  h4 , p{
    margin: 0 !important;
  }
  td{
    white-space:nowrap;
  }
</style>
