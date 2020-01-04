export function flowNameRules (vue) {
  return [
    v => !!v || vue.$t('flow.hint.name_required'),
    v => (/^[A-Za-z0-9_-]+$/g.test(v)) || vue.$t('flow.hint.name_rule'),
    v => (v.length >= 1 && v.length <= 20) || vue.$t('flow.hint.name_size'),
  ]
}

export function gitUrlRules (vue) {
  return [
    v => !!v || vue.$t('flow.hint.git_url_required'),
    v => (/(^(http|https|ssh):\/\/)|(^git@)/g.test(v))
      || vue.$t('flow.hint.git_url_format')
  ]
}

export function credentialNameRules (vue) {
  return [
    v => !!v || vue.$t('credential.hint.name_required'),
    v => (/^[A-Za-z0-9_-]+$/g.test(v)) || vue.$t('credential.hint.name_rule'),
    v => (v.length >= 2 && v.length <= 20) || vue.$t('credential.hint.name_size'),
  ]
}

export function sshEmailRules (vue) {
  return [
    v => !!v || vue.$t('flow.hint.ssh_email_required')
  ]
}

export function sshPublicKeyRules (vue) {
  return [
    v => !!v || vue.$t('flow.hint.ssh_key_required'),
    v => (/(^ssh-rsa)/g.test(v)) || vue.$t('flow.hint.ssh_public_format')
  ]
}

export function sshPrivateKeyRules (vue) {
  return [
    v => !!v || vue.$t('flow.hint.ssh_key_required'),
    v => (/(^-----BEGIN RSA PRIVATE KEY-----)/g.test(v))
      || vue.$t('flow.hint.ssh_private_format')
  ]
}

export function agentNameRules (vue) {
  return [
    v => !!v || vue.$t('agent.hint.name_required'),
    v => (/^[A-Za-z0-9_-]+$/g.test(v)) || vue.$t('agent.hint.name_rule'),
    v => (v.length >= 2 && v.length <= 20) || vue.$t('agent.hint.name_size'),
  ]
}

export function agentTagRules (vue) {
  return [
    v => !!v || vue.$t('agent.hint.tag_required'),
    v => (/^[A-Za-z0-9]+$/g.test(v)) || vue.$t('agent.hint.tag_rule'),
    v => (v.length >= 2 && v.length <= 5) || vue.$t('agent.hint.tag_size'),
  ]
}

export function authFormRules (vue) {
  return [
    v => !!v || vue.$t('credential.hint.auth_required'),
    v => (v.length >= 1 && v.length <= 100) || vue.$t('credential.hint.auth_length'),
  ]
}
