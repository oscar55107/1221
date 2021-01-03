<template>
  <div>
    <div class="table-responsive-lg">
      <table class="table mt-7 table-sm" v-if="orders.length">
      <thead>
        <tr>
          <th width="10%">時間</th>
          <th width="20%">姓名</th>
          <th width="50%">名稱</th>
          <th width="100">價錢</th>
          <th width="100">是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sortOrder" :key="item.id" :class="{ 'text-secondary': !item.is_paid }">
          <td>{{ new Date( item.create_at * 1000 ).toISOString().split('T')[0] }}</td>
          <td>
              <span v-text="item.user.name" v-if="item.user"></span>
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
    </div>
    <Pagination @postPage="getOrders" :page-data="pagination"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Order',
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
        console.log(response)
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
