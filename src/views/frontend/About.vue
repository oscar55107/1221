<template>
  <div>
    <section>
      <div class="brand__banner">
        <div class="brand__intro ml-3" data-aos="fade-right">
          <p class="pl-4">大自然很美<br>
          只是你尚未踏上它的旅程
          </p>
        </div>
      </div>
    </section>
    <div class="section__bg">
      <div class="container">
        <section class="section__bg py-5">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-5 col-md-6 mb-3 d-flex flex-column justify-content-center">
                <div class="p-5 brand__content d-flex flex-column justify-content-center align-items-center" data-aos="fade-right">
                  <h3 class="brand__title">品牌故事</h3>
                  <p>
                    <span>Fireman</span> 是由 2 位熱愛露營的台灣人所創立<br>
                    除了提供美學兼機能性的各種露營用品<br>
                    更提供 相關露營知識 & 露營車租賃<br>
                    讓野營與車露能夠享受與安全
                  </p>
                </div>
              </div>
              <div class="col-lg-7 col-md-6">
                <div class="brand__about"></div>
              </div>
            </div>
          </div>
        </section>
        <section class="section__bg pb-7">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-7">
                <div class="brand__fire"></div>
              </div>
              <div class="col-md-5 d-flex flex-column justify-content-center">
                <div class="p-5 brand__content d-flex flex-column justify-content-center align-items-center" data-aos="fade-up">
                  <h3 class="brand__title">經營理念</h3>
                  <p>
                    <span>Fireman</span> 秉持著專業、品質的理念<br>
                    來服務每位即將踏上露營之旅的旅客<br>
                    猶如 Fireman 的 Fire ， 永不熄滅
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <section>
        <div class="brand__car d-flex justify-content-center align-items-center">
          <div class="brand__reservation p-5 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="50">
            <h3>露營車租賃</h3>
            <ul>
              <li class="my-4">承租人須年滿二十歲，取車時須備有效駕照且持有駕照，並以信用卡方式付費取車</li>
              <li class="mb-4">承租人名下有罰單未繳者，恕本公司無法承租。</li>
              <li class="mb-4">本公司提供ATM轉帳、現場現金付款、刷卡</li>
            </ul>
          </div>
        </div>
    </section>
    <section class="section__bg py-7">
      <div class="container">
        <div class="row">
          <div class="col">
            <div>
              <iframe class="brand__map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d68346.46443609375!2d120.34817018918132!3d23.072430646859484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e64c4f73e4a0d%3A0xe1c7e4623bb89843!2z6Ie65Y2X5bGx5LiK6Iqx5ZyS5rC06YGT5Y2a54mp6aSoLea3qOawtOaxoOWNgA!5e0!3m2!1szh-TW!2stw!4v1607675256336!5m2!1szh-TW!2stw" width="100%" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
              <div class="brand__time d-flex flex-column align-items-center p-5" >
                <h4>Fireman</h4>
                <h6>
                  <span>連絡電話 : <a href="tel:+886-2-1234567">1234567</a></span>
                </h6>
                <h6>
                  <span>營業時間 : 9:00 - 20:00</span>
                </h6>
                <h6>
                  <span>地址 : 台南市大內區石林里131號</span>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  name: 'About',
  components: {
    Footer
  }
}
</script>
