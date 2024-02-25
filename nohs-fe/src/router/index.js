import { createRouter, createWebHistory } from 'vue-router'
import pinia from '@/stores/store.js'
import {useUserStore} from '@/stores/userStore'

// general purpose views
import NotFound from '../views/404View.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'

// always accessible views
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import DocsView from '../views/DocsView.vue'

// restricted access views
import UserInfoView from '../views/UserInfoView.vue'
import OrganisationInfoView from '../views/OrganisationInfoView.vue'
import BillingInfoView from '../views/BillingInfoView.vue'
import SubscriptionInfoView from '../views/SubscriptionInfoView.vue'
import TestServiceView from '../views/TestServiceView.vue'

const userStore = useUserStore(pinia);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/documentation',
      name: 'docs',
      component: DocsView
    },
    {
      path: '/user-information',
      name: 'userInfo',
      component: UserInfoView
    },
    {
      path: '/organisation-information',
      name: 'organisationInfo',
      component: OrganisationInfoView
    },
    {
      path: '/billing-information',
      name: 'billingInfo',
      component: BillingInfoView
    },
    {
      path: '/subscription-information',
      name: 'subscriptionInfo',
      component: SubscriptionInfoView
    },
    {
      path: '/test-service',
      name: 'test',
      component: TestServiceView
    },
    {
      path: '/:notFound(.*)',
      name: 'not found',
      component: NotFound,
      alias: '/404:notFound(.*)',
      beforeEnter: () => {console.log('.yes!')}
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuth = checkAuth();
  
  if(UNRESTRICTED_ROUTES.includes(to.name)){
    next();
  }
  else {
    if(!isAuth){
      next({ path: '/login', query: { redirect: to.fullPath } });
    } 
  }
  
  
});

function checkAuth(){
  return userStore.token ? true : false;
}

const UNRESTRICTED_ROUTES = ['not found', 'login', 'signup', 'home', 'about', 'docs'];

const ALL_ROUTES = ['not found', 'login', 'signup', 'home', 'about', 'docs', 'organisationInfo', 'userInfo', 'billingInfo', 'subscriptionInfo', 'test', 'not found'];

export default router
