<template>
  <div>
    <div class="container mt-8">
      <div class="row d-flex justify-content-center">
        <div class="col-md-10 col">
            <div class="card mb-5">
              <div class="card-header bg-third">
                <h4 class="h5 text-center text-primary text-bold">付款成功</h4>
              </div>
              <div class="card-body d-flex flex-column align-items-center">
                <i class="fas fa-truck fa-5x text-secondary mt-6 mb-4 car"></i>
                <h3 class="text-primary mb-4">恭喜您，已成功付款囉!</h3>
                <h6 class="mb-6">感謝您對 <span>Fireman</span> 的信任，商品將會在 3~5天到府，請耐心等候。</h6>
                <div class="btn btn-outline-primary btn-md w-50 mb-4" @click="toFireman">回首頁</div>
                <div class="btn btn-primary btn-md w-50" @click="toProduct">繼續購物</div>
              </div>
              <div class="card-footer d-flex flex-column align-items-center">
                <h6 class="mb-4">退換貨說明</h6>
                <p class="">
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
  name: 'Checkout',
  data () {
    return {
    }
  },
  methods: {
    toFireman () {
      this.$router.push('/fireman')
    },
    toProduct () {
      this.$router.push('/customer_product')
    }
  }
}
</script>

<style scoped>
.car{
  animation-name: drive;
  animation-duration: 4s;
}
@keyframes drive {
  from {transform: translate(-400px);}
  to {transform: translate(0px);}
}
span{
  font-family: 'Carter One',cursive;
  font-size: 20px;
}
</style>
