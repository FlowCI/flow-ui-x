import { mapping } from './jobs'
import vars from './vars'

export const GIT_TEST_FETCHING = 'FETCHING'
export const GIT_TEST_DONE = 'DONE'
export const GIT_TEST_ERROR = 'ERROR'

export const gitTestStatus = {
  default: {
    class: [],
    icon: 'mdi-help-circle-outline',
    message: ''
  },

  // fetching status data was defined in the GitTestBtn component
  [ GIT_TEST_FETCHING ]: {
    class: [],
    icon: '',
    message: ''
  },

  [ GIT_TEST_DONE ]: {
    icon: 'flow-icon-circle-check',
    class: [ 'green--text' ],
    message: ''
  },

  [ GIT_TEST_ERROR ]: {
    icon: 'flow-icon-cross',
    class: [ 'red--text' ],
    message: 'Error'
  }
}

export function toWrapperList (flows) {
  let list = []
  for (let flow of flows) {
    list.push(new FlowWrapper(flow))
  }
  return list
}

export class FlowWrapper {
  constructor (flow) {
    this.flow = flow
    this.statusIcon = 'mdi-cloud-question'
    this.statusClass = ''
    this.latestJob = undefined
    this.sshObj = {
      privateKey: '',
      publicKey: ''
    }
    this.authObj = {
      username: '',
      password: ''
    }
  }

  fetchVars(name) {
    let locally = this.flow.locally

    if (locally && locally[ name ] ) {
      return locally[ name ].data
    }

    let variables = this.flow.variables
    if (variables && variables[ name ]) {
      return variables[ name ]
    }

    return ''
  }

  get rawInstance () {
    return this.flow
  }

  get id () {
    return this.flow.id
  }

  get name () {
    return this.flow.name
  }

  get webhook () {
    return this.flow.webhook || ''
  }

  get webhookStatus () {
    const webhookStatus = this.flow.webhookStatus
    if (webhookStatus) {
      return Object.assign(webhookStatus, {
        icon: 'flow-icon-circle-check',
        color: 'green--text'
      })
    }

    return {
      icon: 'flow-icon-warning',
      color: 'yellow--text'
    }
  }

  get gitUrl () {
    return this.fetchVars(vars.flow.gitUrl)
  }

  get credential () {
    return this.fetchVars(vars.credential.name)
  }

  get ssh () {
    return this.sshObj
  }

  get auth () {
    return this.authObj
  }

  get variables () {
    return this.flow.variables
  }

  get hasGitUrl () {
    return this.gitUrl !== ''
  }

  get hasSSH () {
    return this.ssh.privateKey !== '' && this.ssh.publicKey !== ''
  }

  get hasAuth () {
    return this.authObj.username !== '' && this.authObj.password !== ''
  }

  set name (name) {
    this.flow.name = name
  }

  set gitUrl (url) {
    if (!this.flow.variables) {
      this.flow.variables = {}
    }

    this.flow.variables[ vars.flow.gitUrl ] = url
  }

  set ssh (sshObj) {
    this.sshObj = sshObj
  }

  set auth (authObj) {
    this.authObj = authObj
  }

  set credential (credentialName) {
    if (!this.flow.variables) {
      this.flow.variables = {}
    }

    return this.flow.variables[ vars.credential.name ] = credentialName
  }
}
