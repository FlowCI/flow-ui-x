import http from '../http'

const state = {
  metaType: {},
  metaTypeList: [],
  statsList: []
}

const mutations = {
  updateMetaType (state, metaType) {
    state.metaType = metaType
  },

  updateMetaTypeList (state, list) {
    state.metaTypeList = list
  },

  updateStatsData (state, list) {
    state.statsList = list
  }
}

const actions = {

  async metaType ({commit}, name) {
    await http.get(`stats/type/${name}`, (metaType) => {
      commit('updateMetaType', metaType)
    })
  },

  async metaTypeList({commit}, name) {
    await http.get(`flows/${name}/stats/types`, (list) => {
      commit('updateMetaTypeList', list)
    })
  },

  async list({commit}, {name, metaType, from, to}) {
    const params = {
      t: metaType,
      from,
      to
    }

    await http.get(`flows/${name}/stats`, (statsList) => {
      commit('updateStatsData', statsList)
    }, params)
  }
}

export const Store = {
  namespaced: true,
  state,
  mutations,
  actions
}
