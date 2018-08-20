import axios from 'axios';

const state = {
  operators: [],
  result: 0
};

const mutations = {
  storeOperators(state, response) {
    state.operators = response 
  },
  storeResult(state, response) {
    state.result = response.result
  }
};

const actions = {
  getOperators({commit}) {
    axios.get('http://calctest.iesim.biz/operations')
      .then((response) => {
        commit('storeOperators', response.data)
      })
      .catch((error) => {
        console.log(error)
      });
  },
  getResult ({commit}, query) {
    axios.get('http://calctest.iesim.biz/' + query, { crossdomain: true })
      .then((response) => {
        commit('storeResult', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

};

const getters = {
  operatorsList: state => state.operators,
  result: state => state.result
};

const operations = {
  state,
  mutations,
  actions,
  getters
};

export default operations;