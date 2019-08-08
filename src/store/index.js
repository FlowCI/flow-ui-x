import Vue from 'vue'
import Vuex from 'vuex'

import { Store as AuthStore } from './module/auth'
import { Store as FlowStore } from './module/flows'
import { Store as JobStore } from './module/jobs'
import { Store as StepStore } from './module/steps'
import { Store as LogStore } from './module/logs'
import { Store as AgentStore } from './module/agents'
import { Store as CredentialStore } from './module/credentials'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    'auth': AuthStore,
    'flows': FlowStore,
    'jobs': JobStore,
    'steps': StepStore,
    'logs': LogStore,
    'agents': AgentStore,
    'credentials': CredentialStore
  }
})

export default store
