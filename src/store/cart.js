import axios from 'axios'

export default ({
  strict: true,
  namespaced: true,
  state: {
    cart: {
      carts: {}
    },
    loadingItem: '',
    product: {}
  },
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    getCart (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      axios.get(api).then(response => {
        console.log(response)
        context.commit('PRODUCTS', response.data.data)
      })
    },
    removeCartItem (context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      context.commit('LOADING', true, { root: true })
      axios.delete(api).then(response => {
        if (response.data.success) {
          context.dispatch('getCart')
          context.commit('LOADING', false, { root: true })
        }
      })
    },
    addToCart (context, { id, qty }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADING', true, { root: true })
      const cart = {
        product_id: id,
        qty
      }
      axios.post(api, { data: cart }).then(response => {
        if (response.data.success) {
          context.dispatch('getCart', id)
          context.commit('LOADING', false, { root: true })
        }
      })
    },
    updateProductQty (context, { originCartId, originProductId, newQty }) {
      context.commit('LOADING', true, { root: true })
      const addAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const newCart = {
        product_id: originProductId,
        qty: newQty
      }
      axios
        .all([
          context.dispatch('removeCartItem', originCartId),
          axios.post(addAPI, { data: newCart })
        ])
        .then(axios.spread(() => {
          context.dispatch('getCart')
          context.commit('LOADING', false, { root: true })
        }))
    },
    modifyQty (context, { productid, qty, id }) {
      context.commit('LOADING', true, { root: true })
      const newCartApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const newData = {
        product_id: productid,
        qty
      }
      axios
        .all([
          context.dispatch('removeCartItem', id),
          axios.post(newCartApi, { data: newData })
        ])
        .then(
          axios.spread(() => {
            context.dispatch('getCart')
            context.commit('LOADING', false, { root: true })
          })
        )
    }
  },
  mutations: {
    PRODUCTS (state, payload) {
      state.cart = payload
    },
    LOADINGITEM (state, payload) {
      state.loadingItem = payload
    }
  },
  getters: {
    cart: state => state.cart,
    loadingItem: state => state.loadingItem
  }
})
