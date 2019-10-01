import http from '../http'
import vars from '../../util/vars'

const emptyFunc = () => {}

const state = {
  name: '', // flow name
  items: [],
  pagination: {
    page: 0,
    size: 10,
    total: 0
  },
  JobsStatus: {},
  selected: {},
  updated: {},
  yml: ''
}

const mutations = {
  add (state, job) {
    if (state.items.length >= state.pagination.size) {
      state.items.pop()
    }

    state.items.unshift(job)
  },

  setName (state, flow) {
    state.name = flow
  },

  list (state, page) {
    state.items = page.content

    state.pagination.page = page.number
    state.pagination.size = page.size
    state.pagination.total = page.totalElements
  },

  update (state, updatedJob) {
    state.updated = updatedJob
  },

  updateStatus (state, updatedJob) {
    let itemIndex = 0

    // update job in list
    state.items.forEach((job, index) => {
      if (job.id !== updatedJob.id) {
        return
      }

      // assign new status
      job.status = updatedJob.status

      // merge context
      Object.assign(job.context, updatedJob.context)

      itemIndex = index
    })

    // update job selected
    if (state.selected.id === updatedJob.id) {
      state.selected = state.items[ itemIndex ]
    }
  },

  selected (state, job) {
    state.selected = job
  },

  JobsStatus (state, res) {
    state.JobsStatus = res
  },

  updateYml (state, yml) {
    state.yml = yml
  }
}

const actions = {

  get ({commit}, {flow, buildNumberOrLatest}) {
    const url = `jobs/${flow}/${buildNumberOrLatest}`
    return http.get(url, (job) => {
      commit('update', job)
    })
  },

  getYml ({commit}, {flow, buildNumber}) {
    const url = `jobs/${flow}/${buildNumber}/yml`
    return http.get(url, (base64Yml) => {
      commit('updateYml', atob(base64Yml))
    })
  },

  /**
   * Start a new job
   */
  async start ({commit, state}, {flow, branch}) {
    let inputs = {}

    if (branch) {
      inputs[ vars.flow.gitBranch ] = branch
    }

    await http.post('jobs/run', emptyFunc, {flow, inputs})
  },

  /**
   * Add a job instance to current job list
   */
  create ({commit, state}, job) {
    if (state.page > 1) {
      return
    }

    commit('add', job)
  },

  /**
   * Load job list by flow name
   */
  list ({commit, state}, {flow, page, size}) {
    commit('setName', flow)

    return http.get('jobs/' + flow,
      (page) => {
        commit('list', page)
      },
      {
        page: page - 1,
        size
      }
    )
  },

  /**
   * Update job status
   */
  statusUpdate ({commit, state}, jobWithNewStatus) {
    commit('updateStatus', jobWithNewStatus)
    commit('update', jobWithNewStatus)
  },

  /**
   * Select job by flow name and build number
   */
  select ({commit}, {flow, buildNumber}) {
    return http.get('jobs/' + flow + '/' + buildNumber,
      (job) => {
        commit('selected', job)
      }
    )
  },

  JobsStatus ({commit}, args) {
    commit('JobsStatus', args)
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
