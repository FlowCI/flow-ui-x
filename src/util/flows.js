import { mapping } from './jobs'
import vars from './vars'

export const GIT_TEST_FETCHING = 'FETCHING'
export const GIT_TEST_DONE = 'DONE'
export const GIT_TEST_ERROR = 'ERROR'

export const gitTestStatus = {
  default: {
    class: [ 'amber--text' ],
    icon: 'flow-icon-loading1',
    message: 'Testing'
  },

  [ GIT_TEST_FETCHING ]: {
    class: [ 'amber--text', 'rotate' ],
    icon: 'flow-icon-loading1',
    message: 'Testing'
  },

  [ GIT_TEST_DONE ]: {
    icon: 'flow-icon-circle-check',
    class: [ 'green--text' ],
    message: 'Done'
  },

  [ GIT_TEST_ERROR ]: {
    icon: 'flow-icon-cross',
    class: [ 'red--text' ],
    message: 'Error'
  }
}

export class FlowWrapper {
  constructor (flow) {
    this.flow = flow
    this.statusIcon = 'home'
    this.statusClass = ''
    this.latestJob = undefined
    this.sshObj = {
      privateKey: '',
      publicKey: ''
    }
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

  get icon () {
    return this.statusIcon
  }

  get iconClass () {
    return this.statusClass
  }

  get webhook () {
    if (!this.flow.variables) {
      return ''
    }
    return this.flow.variables[ vars.flow.webhook ] || ''
  }

  get gitUrl () {
    if (!this.flow.variables) {
      return ''
    }
    return this.flow.variables[ vars.flow.gitUrl ] || ''
  }

  get credential () {
    if (!this.flow.variables) {
      return ''
    }

    return this.flow.variables[ vars.credential.ssh ] || ''
  }

  get ssh () {
    return this.sshObj
  }

  get variables () {
    return this.flow.variables
  }

  get hasGitUrl () {
    return this.gitUrl !== ''
  }

  get hasSSH () {
    return this.ssh.privateKey !== '' || this.ssh.publicKey !== ''
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

  set credential (credentialName) {
    if (!this.flow.variables) {
      this.flow.variables = {}
    }

    return this.flow.variables[ vars.credential.ssh ] = credentialName
  }

  // latest job
  set job (latestJob) {
    this.latestJob = latestJob
    this.icon = mapping.status[ latestJob.status ].icon
    this.iconClass = mapping.status[ latestJob.status ].class
  }

  set icon (icon) {
    this.statusIcon = icon
  }

  set iconClass (iconClass) {
    this.statusClass = iconClass
  }
}
