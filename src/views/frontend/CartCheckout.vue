<template>
<div>
  <div class="container mt-8 mb-4 cart">
    <div class="row d-flex justify-content-center">
      <div class="col-12 col-md-10">
        <div class="card">
          <div class="card-header bg-third">
            <h4 class="h5 text-primary text-center text-bold">購買清單確認</h4>
          </div>
          <div class="card-body">
            <table class="table table-lg" v-if="cartData.length">
              <thead>
                <th width="40%">名稱</th>
                <th width="20%">數量</th>
                <th>價格</th>
                <th>刪除</th>
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
            <div class="d-flex justify-content-end" v-if="cartData.length">
              <button class="btn btn-outline-primary btn-sm" @click.prevent="postCart">確認購買</button>
            </div>
            <div class="none d-flex flex-column align-items-center my-6" v-if="cartData.length === 0">
              <i class="fa fa-cart-arrow-down fa-4x text-muted mb-2 animate__animated animate__bounce animate__infinite" aria-hidden="true"></i>
              購物車尚未有商品唷!!
              <button type="button" class="btn btn-outline-primary btn-md mt-3" @click='toProduct'>前往購買</button>
            </div>
          </div>
          <div class="card-footer d-flex flex-column align-items-center">
            <h4 class="mb-4">訂購須知</h4>
            <p>
              ※ 請確認所填寫的資料是否正確，下單後未提供修改付款方式服務。<br>
              ※ 因拍攝略有色差，圖片僅供參考，顏色請以實際收到商品為準。<br>
              ※ 本店商品目前只供應台灣地區，只提供宅配到府。<br>
              ※ 目前支援貨到付款、超商付款。<br>
              ※ 本店商品為統一會於付款後7個工作日內出貨(不含假日)。
            </p>
            <h4 class="mb-4">退換貨說明</h4>
            <p>
              ※請直接撥打04-12345678，或到粉絲團詢問相關事宜，會有專人直接為您服務。<br>
              ※須於訂單商品送達後14日內申請<br>
              ※退回之商品內容必須保維持所有商品、贈品、附件、包裝、附隨文件或資料的完整性
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'Cart',
  data () {
    return {
      cartData: []
    }
  },
  methods: {
    getCart () {
      this.cartData = JSON.parse(localStorage.getItem('cartData')) || []
    },
    remove (item) {
      const index = this.cartData.indexOf(item)
      this.cartData.splice(index, 1)
      localStorage.setItem('cartData', JSON.stringify(this.cartData))
      this.getCart()
      this.$bus.$emit('cart:get')
    },
    postCart () {
      const cacheID = []
      // Promise.all([
      //   this.$http.get('request_url_1'),
      //   this.$http.get('request_url_1')
      // ]).then(function (data) {
      // })
      this.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`)
        .then((res) => {
          console.log('取的遠端cart')
          const cacheData = res.data.data.carts
          console.log(cacheData)
          cacheData.forEach((item) => {
            cacheID.push(item.id)
          })
        }).then(() => {
          cacheID.forEach((item) => {
            this.$http.delete(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item}`).then(() => {
              console.log('購物車已經清空')
            })
          })
        }).then(() => {
          this.cartData.forEach((item) => {
            console.log('打入api')
            const cache = {
              product_id: item.product_id,
              qty: item.qty
            }
            this.$http.post(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`, { data: cache })
              .then(() => {
                this.cartData = []
                localStorage.removeItem('cartData')
                this.$bus.$emit('cart:get')
                this.$router.push('cart').catch(() => {})
              })
          })
        })
    },
    toProduct () {
      this.$router.push('customer_product')
    }
  },
  created () {
    this.getCart()
  }
}
</script>
