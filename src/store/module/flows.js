import http from '../http'

const state = {
  items: [],
  editor: '',
  selected: {obj: {}, yml: ''},
  created: undefined, // created flow object with pending status
  sshRsa: {publicKey: '', privateKey: ''}, // created ssh-rsa
  isExist: undefined, // result from action 'exist'
  gitTestMessage: undefined,  // git test message update
  gitBranches: [],
  itemsByCredential: [],
  users: [], // flow users
  steps: [] // flow steps from yml
}

const mutations = {
  updateExist (state, isExist) {
    state.isExist = isExist
  },

  updateCreated (state, flow) {
    state.created = flow
  },

  updateSshRsa (state, rsaKeyPair) {
    state.sshRsa = rsaKeyPair
  },

  updateGitTest (state, gitTestMessage) {
    state.gitTestMessage = gitTestMessage
  },

  updateGitBranches (state, branchList) {
    state.gitBranches = branchList
  },

  select (state, flow) {
    state.selected.obj = flow
  },

  setYml (state, yml) {
    state.selected.yml = yml
  },

  list (state, items) {
    state.items = items
  },

  listByCredential (state, items) {
    state.itemsByCredential = items
  },

  add (state, newFlow) {
    state.items.push(newFlow)
  },

  delete (state, name) {
    state.items = state.items.filter((val, _index, _array) => {
      return val.name !== name
    })
  },

  editor (state, res) {
    state.editor = res
  },

  listUsers (state, users) {
    state.users = users
  },

  addUsers (state, users) {
    for (let user of users) {
      let exist = state.users.find((x) => x.id === user.id)
      if (!exist) {
        state.users.push(user)
      }
    }
  },

  removeUsers (state, users) {
    state.users = state.users.filter((x) => !users.some((y) => x.id === y.id))
  },

  addVar (state, {flow, name, value}) {
    // update flow in items
    for (let item of state.items) {
      if (item.id !== flow.id) {
        continue
      }

      if (!item.locally) {
        item.locally = {}
      }

      item.locally[ name ] = value
      break
    }

    // update flow if selected
    const selected = state.selected.flow
    if (!selected || !selected.id) {
      return
    }

    if (selected.id === flow.id) {
      if (!selected.locally) {
        selected.locally = {}
      }

      selected.locally[ name ] = value
    }
  },

  removeVar (state, {flow, name}) {
    // update flow in items
    for (let item of state.items) {
      if (item.id !== flow.id) {
        continue
      }

      if (!item.locally) {
        break
      }

      delete item.locally[ name ]
    }

    // update flow if selected
    const selected = state.selected.flow
    if (!selected || !selected.id) {
      return
    }

    if (selected.id === flow.id) {
      if (!selected.locally) {
        return
      }

      delete selected.locally[ name ]
    }
  },

  setSteps (state, steps) {
    state.steps = steps
  }
}

const actions = {
  async create ({commit}, name) {
    await http.post(`flows/${name}`, (flow) => {
      commit('updateCreated', flow)
    })
  },

  async createSshRsa ({commit, state}, email) {
    await http.post('credentials/rsa/gen', (rsaKeyPair) => {
      commit('updateSshRsa', rsaKeyPair)
    }, {email: email})
  },

  async gitTestStart ({commit}, wrapper) {
    const url = `flows/${wrapper.name}/git/test`
    await http.post(url,
      () => {
      },
      {
        gitUrl: wrapper.gitUrl,
        credential: wrapper.credential,
        ssh: wrapper.ssh,
        auth: wrapper.auth
      })
  },

  async confirm ({commit}, wrapper) {
    let gitSettings = {
      gitUrl: wrapper.gitUrl,
      credential: wrapper.credential
    }

    const confirmFunc = () => {
      http.post(
        `flows/${wrapper.name}/confirm`,
        (flow) => {
          console.log('[DONE]: confirmed')
          commit('add', flow)
        },
        gitSettings
      )
    }

    if (wrapper.hasSSH) {
      await http.post(
        `flows/${wrapper.name}/credentials/rsa`,
        (credential) => {
          console.log('[DONE]: setup credential: ' + credential)
          gitSettings.credential = credential
        },
        wrapper.ssh
      ).then(() => {
        console.log(gitSettings)
        confirmFunc()
      })
      return
    }

    await confirmFunc()
  },

  async delete ({commit, state}, name) {
    await http.delete(`flows/${name}`, () => {
      commit('delete', name)
      commit('select', {obj: {}, yml: ''})
    })
  },

  gitBranches ({commit}, name) {
    const url = `flows/${name}/git/branches`
    return http.get(url, (branches) => {
      commit('updateGitBranches', branches)
    })
  },

  exist ({commit}, name) {
    return http.get(`flows/${name}/exist`, (boolVal) => {
      commit('updateExist', boolVal)
    })
  },

  reset ({commit}) {
    commit('updateExist', undefined)
  },

  async select ({commit, state}, name) {
    await http.get(`flows/${name}`, (flow) => {
      commit('select', flow)
    })

    await http.get(`flows/${name}/yml/steps`, (steps) => {
      commit('setSteps', steps)
    })
  },

  list ({commit}) {
    return http.get('flows', (list) => {
      commit('list', list)
    })
  },

  listByCredential ({commit}, credentialName) {
    return http.get(`flows/credentials/${credentialName}`, (list) => {
      commit('listByCredential', list)
    })
  },

  gitTestUpdate ({commit}, gitTestMessage) {
    commit('updateGitTest', gitTestMessage)
  },

  loadYml ({commit, state}, name) {
    if (!name) {
      return
    }

    return http.get(`flows/${name}/yml`, (base64Yml) => {
      commit('setYml', atob(base64Yml))
    })
  },

  async saveYml ({commit, state}, {name, yml}) {
    if (!name || !yml) {
      return
    }

    await http.post(`flows/${name}/yml`,
      () => {
        commit('setYml', yml)
      },
      {
        data: btoa(yml)
      })
  },

  editor ({commit}, args) {
    commit('editor', args)
  },

  listUsers ({commit}, name) {
    const onSuccess = (list) => {
      commit('listUsers', list)
    }
    return http.get(`flows/${name}/users`, onSuccess)
  },

  async addUser ({commit}, {name, userId}) {
    const onSuccess = (list) => {
      commit('addUsers', list)
    }
    await http.post(`flows/${name}/users`, onSuccess, [ userId ])
  },

  async removeUser ({commit}, {name, userId}) {
    const onSuccess = (list) => {
      commit('removeUsers', list)
    }
    await http.delete(`flows/${name}/users`, onSuccess, [ userId ])
  },

  async addVar ({commit}, {flow, name, value, type}) {
    const payload = {
      [ name ]: {
        data: value,
        type: type
      }
    }

    const onSuccess = () => {
      commit('addVar', {flow, name, value})
    }

    await http.post(`flows/${flow.name}/variables`, onSuccess, payload)
  },

  async removeVar ({commit}, {flow, name}) {
    const payload = [ name ]

    const onSuccess = () => {
      commit('removeVar', {flow, name})
    }

    await http.delete(`flows/${flow.name}/variables`, onSuccess, payload)
  }
}

/**
 * Export Vuex store object
 */
export const Store = {
  namespaced: true,
  state,
  mutations,
  actions
}
