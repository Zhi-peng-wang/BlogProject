/*
vuex最核心的管理对象store
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'

Vue.use(Vuex);

export default new Vuex.Store({
  state,
})
