
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PageWizards.vue') },
      { path: '/conference-room/:otherWizardId', component: () => import('pages/PageInvocation.vue') },
      { path: '/spell-auth', component: () => import('pages/PageSpell.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
