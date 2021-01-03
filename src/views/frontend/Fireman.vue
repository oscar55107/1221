<template>
  <div>
    <header>
      <div class="header__bg d-flex justify-content-center align-items-center">
        <div class="header__intro d-flex justify-content-center align-items-center" data-aos="fade-up">
          <div class="text-center p-5">
            <h2 class="header__text header__title">Fireman</h2>
            <h3 class="header__text">享受露營 X 愛上露營</h3>
          </div>
        </div>
        <div class="header__btn" @click="godown">
          <a><span></span></a>
        </div>
      </div>
    </header>
    <section class="py-7 section__slogon">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-5 noGutter__col d-flex flex-column justify-content-center text-center">
              <div data-aos="fade-right" class="px-7">
                <h3 class="mb-3 intro__title">露營 X 美學 X 機能</h3>
                <p class="intro__text">生活於城市的繁忙喧囂中</p>
                <p class="intro__text">露營能讓你放慢步調</p>
                <p class="intro__text">沉浸在森林裡的芬多精</p>
              </div>
            </div>
            <div class="col-md-7 noGutter__col">
              <div data-aos="fade-up" class="section__intro">
              </div>
            </div>
          </div>
        </div>
    </section>
    <section class="py-7 section__bg">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6 col-12">
            <div class="section__tent"></div>
          </div>
          <div class="col-md-6 d-flex flex-column justify-content-center text-center px-7">
            <div>
              <h2 class="mb-3 section__title pt-2">帳篷</h2>
              <div class="section__text">
                <p>還在煩惱找不到人露營嗎</p><br>
                <p>還是你尚未踏入露營之旅</p><br>
                <p>Fireman 提供單人 與 多人帳篷</p><br>
                <p>無論海拔高低，能帶給你溫暖的另一個家</p><br>
              </div>
              <div class="d-flex justify-content-center">
                  <button type="button" class="btn btn-primary w-50 btn-md-md btn-sm" @click="toCproduct">立即選購</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="pb-7 mb-4 section__bg section__position">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6 d-flex flex-column section__chair__description justify-content-center text-center px-7">
            <div>
              <h2 class="mb-3 section__title">戶外椅</h2>
              <div class="section__text">
                <p>每天坐在辦公椅上</p><br>
                <p>露營的時候還不讓自己方鬆嗎</p><br>
                <p>Fireman 提供各種機能戶外椅</p><br>
                <p>符合人體工學 ， 完美包覆你的脊椎</p><br>
              </div>
              <div class="d-flex justify-content-center">
                  <button type="button" class="btn btn-primary w-50 btn-md-md btn-sm mb-2" @click="toCproduct">立即選購</button>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-12">
            <div class="section__chair"></div>
          </div>
        </div>
      </div>
    </section>
    <section class="hot pb-5" data-aos="fade-up">
      <div class="container">
        <h2 class="text-center text-primary py-4 hot__title">商品專區</h2>
        <div class="row">
          <div class="col-sm-6">
            <div class="hot__grill hot__item">
              <div class="hot__text">
                <button type="button" class="btn more">
                  <router-link class="text-white" to="/customer_product">烤具</router-link>
                </button>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="hot__tool hot__item">
              <div class="hot__text">
                <button type="button" class="btn more">
                  <router-link class="text-white" to="/customer_product">工具</router-link>
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-12">
            <div class="hot__bag hot__item">
              <div class="hot__text">
                <button type="button" class="btn more">
                  <router-link class="text-white" to="/customer_product">機能背包</router-link>
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="hot__pot hot__item">
              <div class="hot__text">
                <button type="button" class="btn more">
                  <router-link class="text-white" to="/customer_product">廚具</router-link>
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="hot__light hot__item">
              <div class="hot__text">
                <button type="button" class="btn more">
                  <router-link class="text-white" to="/customer_product">手電筒</router-link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'Fireman',
  methods: {
    toCproduct () {
      this.$router.push('/customer_product')
    },
    godown () {
      const bodyHeight = $('body').height()
      $('html,body').animate({
        scrollTop: bodyHeight
      }, 6000)
    }
  }
}
</script>
