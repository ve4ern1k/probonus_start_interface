import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userToken: ""
    },
    mutations: {
        setToken(state, newToken) {
            state.userToken = newToken
        }
    },
    actions: {
        updateToken({ commit }, newString) {
            commit('setToken', newString);
        }
    },
    getters: {
        token(state) {
            return state.userToken;
        }
    }
})