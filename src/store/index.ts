import Vue from 'vue'
import Vuex from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { IState } from '@/interfaces'

Vue.use(Vuex)
const state: IState = {
  requests: 0
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations

})
