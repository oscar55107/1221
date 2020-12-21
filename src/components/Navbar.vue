<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light py-3 fixed-top">
    <div class="container">
      <router-link class="navbar-brand d-flex" to="/">
        <i class="fas fa-tree"></i>
        <h1 class="h5 ml-3">Fireman</h1>
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto ">
          <li class="nav-item mr-4">
            <router-link class="nav-link text-bold" to="/about">品牌介紹</router-link>
          </li>
          <li class="nav-item mr-4">
            <router-link class="nav-link text-bold" to="/customer_product">露營用品</router-link>
          </li>
          <li class="nav-item mr-4">
            <router-link class="nav-link text-bold" to="/login">登入</router-link>
          </li>
          <li class="nav-item">
            <div class="dropdown">
              <router-link class="btn"  to="/cart">
                <i class="trash fas fa-shopping-cart">
                    <div class="trash__text" v-if="len">{{len}}</div>
                </i>
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>
</template>

<script>
export default {
  props: ['len']
}
</script>

<style scoped lang="scss">
.nav-item{
font-weight: bold;
border-bottom:2px solid transparent;
position: relative;
&:hover{
  cursor: pointer;
  &:after{
    left: 0%;
    width: 100%;
  }
}
&:after{
  content: "";
  width: 0;
  height: 2px;
  background: rgb(0, 0, 0);
  position: absolute;
  top: 100%;
  left: 50%;
  transition: all 0.8s;
}
.trash{
  position: relative;
  &__text{
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: red;
    top: -8px;
    right: -8px;
    border-radius: 50%;
    z-index: 55;
    color: #fff;
    font-size: 8px;
  }
}
}
</style>
