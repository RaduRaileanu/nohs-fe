import { createRouter, createWebHistory } from 'vue-router'
import pinia from '@/stores/store.js'
import {useUserStore} from '@/stores/userStore'
import { useNavStore } from '@/stores/navStore'

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
const navStore = useNavStore(pinia);

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
  
  // check if the user is authenticated
  const isAuth = checkAuth();
  
  // if the user wants to visit an unrestricted route, alow them access regardless of authentication status
  if(UNRESTRICTED_ROUTES.includes(to.name)){
    next();
  }
  // if the user wants to visit a restricted path
  else {
    // check authentication status
    if(!isAuth){
      // if the user is not authenticated, save the route name in the navStore for automatic redirect after login and send user to login route
      if(RESTRICTED_ROUTES.includes(to.name)){
        navStore.landingDest = to.name;
      }
      next({ path: '/login'});
    }
    // if the user is authenticated, allow them access
    else {
      next();
    }
  }
  
  
});

/**
 * Check if the user is authenticated 
 * @returns {Boolean}
 */
function checkAuth(){

  // return true if the there is a token in userStore
  return userStore.token ? true : false;
}

const UNRESTRICTED_ROUTES = ['not found', 'login', 'signup', 'home', 'about', 'docs'];

const RESTRICTED_ROUTES = ['organisationInfo', 'userInfo', 'billingInfo', 'subscriptionInfo', 'test'];

const ALL_ROUTES = ['not found', 'login', 'signup', 'home', 'about', 'docs', 'organisationInfo', 'userInfo', 'billingInfo', 'subscriptionInfo', 'test'];

export default router
