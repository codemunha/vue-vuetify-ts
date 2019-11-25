import { MutationTree } from 'vuex'
import { IState } from '@/interfaces'

export const mutations: MutationTree<IState> = {
  HTTP_REQ(state: IState) {
    console.log('HTTP_REQ : ', state)

    state.requests++
  },

  HTTP_REQ_DONE(state: IState) {
    console.log('HTTP_REQ_DONE : ', state)

    state.requests--
    if (state.requests < 0) {
      state.requests = 0
    }
  }
}
