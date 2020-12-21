<template>
  <div>
    <table class="table mt-4 table-responsive-sm" v-if="orders.length">
      <thead>
        <tr>
          <th>Time</th>
          <th>Email</th>
          <th>Item</th>
          <th width="140">Amount Payable</th>
          <th width="120">Is Pay</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sortOrder" :key="item.id" :class="{ 'text-secondary': !item.is_paid }">
          <td>{{ new Date(item.create_at*1000).toISOString().split('T')[0]  }}</td>
          <td>
              <span v-text="item.user.email" v-if="item.user"></span>
          </td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} ， {{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td>
            <span v-if="item.is_paid" class="text-success">Yes</span>
            <span v-else class="text-danger">No</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination @postPage="getOrders" :pages="pagination"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
export default {
  data () {
    return {
      orders: [],
      pagination: {}
    }
  },
  methods: {
    getOrders (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(api).then(response => {
        vm.$store.dispatch('updateLoading', false)
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
      })
    }
  },
  computed: {
    sortOrder () {
      const vm = this
      let newOrder = []
      if (vm.orders.length) {
        newOrder = vm.orders.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0
          const bIsPaid = b.is_paid ? 1 : 0
          return bIsPaid - aIsPaid
        })
      }
      return newOrder
    }
  },
  components: {
    Pagination
  },
  created () {
    this.getOrders()
  }
}
</script>
