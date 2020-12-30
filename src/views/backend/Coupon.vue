<template>
  <div>
    <div class="text-right mt-4">
      <button type="button" class="btn btn-primary" @click="openModal(true)">建立優惠卷</button>
    </div>
    <table class="table mt-4 table-responsive-sm">
      <thead>
        <tr>
        <th width="120">優惠卷名稱</th>
        <th width="120">折扣百分比</th>
        <th width="140">到期日</th>
        <th width="140">是否啟用</th>
        <th width="80">編輯</th>
        <th width="120">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
        <td>{{ item.title }}</td>
        <td>{{ item.percent }}%</td>
        <td>{{ new Date( item.due_date * 1000 ).toISOString().split('T')[0] }}</td>
        <td>
          <span v-if="item.is_enabled" class="text-success">啟用</span>
          <span v-else class="text-danger">未啟用</span>
        </td>
        <td>
          <button type="button" class="btn btn-sm btn-outline-primary" @click="openModal(false,item)">編輯</button>
        </td>
        <td>
          <button type="button" class="btn btn-sm btn-outline-danger" @click="openDelModal(item)">刪除</button>
        </td>
        </tr>
      </tbody>
    </table>
    <Pagination @postPage="getCoupons" :page-data="pagination"></Pagination>
    <!-- Modal -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="exampleModalLabel">
            <span >新增優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">優惠券名稱</label>
              <input type="text" class="form-control" id="title" v-model="tempCoupon.title" placeholder="請輸入優惠券名稱">
            </div>
            <div class="form-group">
              <label for="couponCode">優惠碼</label>
              <input type="text" class="form-control" id="couponCode" v-model="tempCoupon.code" placeholder="請輸入優惠碼">
            </div>
            <div class="form-group">
              <label for="dueDate">到期日</label>
              <input type="date" class="form-control" id="dueDate" v-model="due_date">
            </div>
            <div class="form-group">
              <label for="percent">折扣百分比</label>
              <input type="number" class="form-control" id="percent" v-model="tempCoupon.percent" placeholder="請輸入折扣百分比">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" :true-value="1" :false-value="0" v-model="tempCoupon.is_enabled" id="is_enabled">
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- DelModal -->
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
              <h5 class="modal-title" id="exampleModalLabel">
              <span>Delete Coupon</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
              Want To Delete
              <strong class="text-danger">{{ tempCoupon.title }}</strong> Coupon？
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancle</button>
              <button type="button" class="btn btn-danger" @click="deleteCoupon">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Coupon',
  data () {
    return {
      coupons: [],
      tempCoupon: {},
      due_date: new Date(),
      isNew: false,
      pagination: {}
    }
  },
  watch: {
    due_date () {
      const vm = this
      const timestamp = Math.floor(new Date(vm.due_date) / 1000)
      vm.tempCoupon.due_date = timestamp
    }
  },
  methods: {
    getCoupons (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(api).then(response => {
        vm.$store.dispatch('updateLoading', false)
        vm.coupons = response.data.coupons
        vm.pagination = response.data.pagination
      })
    },
    openModal (isNew, item) {
      const vm = this
      if (isNew) {
        vm.due_date = new Date()
        vm.tempCoupon = {}
        vm.tempCoupon.is_enabled = 0
        vm.isNew = true
      } else {
        vm.tempCoupon = { ...item }
        vm.isNew = false
        vm.due_date = new Date(item.due_date * 1000).toISOString().split('T')[0]
      }
      $('#couponModal').modal('show')
    },
    updateCoupon () {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      const vm = this
      let httpMethod = 'post'
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
        httpMethod = 'put'
      }
      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then(response => {
        if (response.data.success) {
          $('#couponModal').modal('hide')
          vm.getCoupons()
        } else {
          $('#couponModal').modal('hide')
          vm.getCoupons()
        }
      })
    },
    openDelModal (item) {
      this.tempCoupon = { ...item }
      $('#delCouponModal').modal('show')
    },
    deleteCoupon () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
      vm.$http.delete(api).then(response => {
        if (response.data.success) {
          $('#delCouponModal').modal('hide')
          vm.getCoupons()
        } else {
          $('#delCouponModal').modal('hide')
          vm.getCoupons()
        }
      })
    }
  },
  components: {
    Pagination
  },
  created () {
    this.getCoupons()
  }
}
</script>
