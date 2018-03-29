const orders = {
  state: {
    filters: {},
    page: 1,
    pageSize: 10,
    sort: '-createdAt'
  },
  mutations: {
    SET_ORDERS: (state, orders) => {
      state = orders
    }
  },
  actions: {
    setOrders({ commit }, orders) {
      commit('SET_ORDERS', orders)
    }
  }
}

export default orders
