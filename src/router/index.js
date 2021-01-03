import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/fireman',
    component: () => import('@/components/Index.vue'),
    children: [
      {
        path: 'fireman',
        name: 'Fireman',
        component: () => import('@/views/frontend/Fireman.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/frontend/About.vue')
      },
      {
        path: 'customer_product',
        name: 'CustomerProduct',
        component: () => import('@/views/frontend/CustomerProduct.vue')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/frontend/Login.vue')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/frontend/Cart.vue')
      },
      {
        path: 'cartcheckout',
        name: 'CartCheckout',
        component: () => import('@/views/frontend/CartCheckout.vue')
      },
      {
        path: 'customer_order',
        name: 'CustomerOrder',
        component: () => import('@/views/frontend/CustomerOrder.vue')
      },
      {
        path: 'customer_checkout/:orderId',
        name: 'CustomerCheckout',
        component: () => import('@/views/frontend/CustomerCheckout.vue')
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: () => import('@/views/frontend/Checkout.vue')
      },
      {
        path: 'product_detail/:productId',
        name: 'ProductDetail',
        component: () => import('@/views/frontend/ProductDetail.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('@/components/backend/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/backend/Products.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: () => import('@/views/backend/Coupon.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/backend/Order.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '*',
    redirect: '/login'
  }
]

const router = new VueRouter({
  routes
})

export default router
