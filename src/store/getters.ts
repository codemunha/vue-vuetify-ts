import { GetterTree } from 'vuex'
import { IState } from '@/interfaces'

export const getters: GetterTree<IState, IState> = {
  requests (state: IState): Number {
    return state.requests
  }
}
