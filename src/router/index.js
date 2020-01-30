import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/view/Home/Login'

import FlowHome from '@/view/Flow/Index'
import FlowOverview from '@/view/Flow/Overview'
import FlowSettings from '@/view/Flow/Settings'
import FlowStatistic from '@/view/Flow/Statistic'

import JobList from '@/view/Job/List'
import JobDetail from '@/view/Job/Detail'

import SettingsHome from '@/view/Settings/Home'
import SettingsProfileHome from '@/view/Settings/Profile/Index'

import SettingsUsersHome from '@/view/Settings/Users/Index'
import SettingsUsersNew from '@/view/Settings/Users/New'
import SettingsUsersEdit from '@/view/Settings/Users/Edit'

import SettingsAgentHome from '@/view/Settings/Agent/Index'
import SettingsAgentNew from '@/view/Settings/Agent/NewAgent'
import SettingsAgentEdit from '@/view/Settings/Agent/EditAgent'
import SettingsHostNew from '@/view/Settings/Agent/NewHost'

import SettingsCredentialHome from '@/view/Settings/Credential/Index'
import SettingsCredentialNew from '@/view/Settings/Credential/New'
import SettingsCredentialEdit from '@/view/Settings/Credential/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/flows',
      name: 'FlowHome',
      component: FlowHome,
      children: [
        {
          path: '',
          name: 'Overview',
          component: FlowOverview
        },
        {
          path: ':id/settings',
          name: 'Settings',
          component: FlowSettings
        },
        {
          path: ':id/statistic',
          name: 'Statistic',
          component: FlowStatistic
        },
        {
          path: ':id/jobs',
          name: 'Jobs',
          component: JobList
        },
        {
          path: ':id/jobs/:num',
          name: 'JobDetail',
          component: JobDetail
        }
      ]
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsHome,
      children: [
        {
          path: 'profile',
          name: 'SettingsProfileHome',
          component: SettingsProfileHome
        },

        {
          path: 'users',
          name: 'SettingsUsersHome',
          component: SettingsUsersHome
        },
        {
          path: 'users/new',
          name: 'SettingsUsersNew',
          component: SettingsUsersNew
        },
        {
          path: 'users/edit',
          name: 'SettingsUsersEdit',
          component: SettingsUsersEdit,
          props: true
        },

        {
          path: 'agents',
          name: 'SettingsAgentHome',
          component: SettingsAgentHome
        },
        {
          path: 'agents/new',
          name: 'SettingsAgentNew',
          component: SettingsAgentNew
        },
        {
          path: 'agents/edit/:name',
          name: 'SettingsAgentEdit',
          component: SettingsAgentEdit
        },
        {
          path: 'agents/host/new',
          name: 'SettingsHostNew',
          component: SettingsHostNew
        },

        {
          path: 'credentials',
          name: 'SettingsCredentialHome',
          component: SettingsCredentialHome
        },
        {
          path: 'credentials/new',
          name: 'SettingsCredentialNew',
          component: SettingsCredentialNew,
          props: true
        },
        {
          path: 'credentials/edit',
          name: 'SettingsCredentialEdit',
          component: SettingsCredentialEdit,
          props: true
        }
      ]
    }
  ]
})
