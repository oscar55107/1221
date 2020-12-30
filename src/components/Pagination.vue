<template>
  <div>
    <div class="pagination d-flex justify-content-center mt-5">
      <nav aria-label="Page navigation example just">
        <ul class="pagination">
          <li class="page-item" :class="{ 'disabled' : !pageData.has_pre }">
            <a class="page-link" href="#" aria-label="Previous"
              @click.prevent="getPage(pageData.current_page - 1)">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" v-for="page in pageData.total_pages" :key="page"
            :class="{'active' : pageData.current_page === page }">
            <a class="page-link" href="#" @click.prevent="getPage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ 'disabled' : !pageData.has_next }">
            <a class="page-link" href="#" aria-label="Next"
              @click.prevent="getPage(pageData.current_page + 1)">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pageData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    getPage (page) {
      this.$emit('postPage', page)
    }
  }
}
</script>
