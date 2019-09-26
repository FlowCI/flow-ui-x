export default {
  back: 'Back',
  save: 'Save',
  reset: 'Reset',
  close: 'Close',
  next: 'Next',
  cancel: 'Cancel',
  skip: 'Skip',
  create: 'Create',
  test: 'Test',
  delete: 'Delete',
  login: 'Login',
  password: 'Password',

  menu: {
    signedInAs: 'Signed in as ',
    settings: 'Settings',
    logout: 'Logout'
  },

  flow: {
    create: 'Create Flow',
    search: 'Search by key words',
    settings: 'Settings',
    config_yml: 'YML Config',

    create_title_name: 'Enter Flow Name',
    create_title_git_url: 'Config Git URL',
    create_title_git_access: 'Config Git Access',
    create_title_git_test: 'Test Git Connection',
    create_title_yml: 'Config YML',

    create_btn_finish: 'Finish',

    delete_btn: 'Delete This Flow',
    delete_desc: 'Once you delete a repository, there is no going back. Please be certain.',

    var_type: 'Data Type',
    var_name: 'Name',
    var_value: 'Value',

    hint: {
      name_required: 'Flow name is required',
      name_size: 'Flow name must be less than 20 character',
      name_rule: 'Flow name only accept characters of a-z, A-Z, 0-9, _, -',
      name_duplicate: 'Flow name already exists',

      git_skip: 'Setup Git access later',
      git_url_required: 'Git URL is required',
      git_url_format: 'Git URL must be start with https or git@',

      credential_name_required: 'SSH key name is required',

      ssh_create: 'click to create new ssh key',
      ssh_email_title: 'Enter the email to create ssh-rsa',
      ssh_email_required: 'Email is required for create ssh-rsa',
      ssh_key_required: 'SSH key is required',
      ssh_public_format: 'Start with ssh-rsa',
      ssh_private_format: 'Start with -----BEGIN RSA PRIVATE KEY-----',

      delete_title: 'Please type in the name of the flow to confirm',
      delete_confirm_name_not_same: 'The typed in name not the same of the flow'
    }
  },

  job: {
    run: 'Run',
    tab: {
      info: 'Info',
      yml: 'Yml',
      logs: 'Logs'
    },
    triggerBy: 'Triggered By'
  },

  agent: {
    status: {
      busy: 'busy',
      idle: 'idle',
      offline: 'offline'
    },

    hint: {
      name_required: 'Agent name is required',
      name_size: 'Agent name length should be 2 - 20 characters',
      name_rule: 'Agent name only accept characters of a-z, A-Z, 0-9, _, -',
      tag_required: 'Agent tag is required',
      tag_size: 'Agent tag length between 2 - 5 characters',
      tag_rule: 'Agent tag name only accept characters of a-z, A-Z, 0-9',
    }
  },

  settings: {
    li: {
      profile: 'Profile',
      users: 'Users',
      security: 'Security',
      agent: 'Agents',
      credential: 'Credentials'
    },

    profile: {
      password_not_empty: 'Password is required',
      password_not_same: 'Incorrect confirm password'
    }
  },

  credential: {
    hint: {
      name_required: 'Credential name is required',
      name_size: 'Credential name length should be 2 - 20 characters',
      name_rule: 'Credential name only accept characters of a-z, A-Z, 0-9, _, -',
    }
  }
}
