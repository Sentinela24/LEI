import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../views/HomePage'
import UsersPage from '../views/UsersPage'
import LoginPage from '../views/LoginPage'
import RegisterPage from '../views/RegisterPage'
import PerfilPage from '../views/PerfilPage'
import EportfolioPage from '../views/EportfolioPage'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/home', component: HomePage },
    { path: '/users', component: UsersPage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/users/:userId', name: 'users', component: PerfilPage },
    { path: '/eportfolio', component: EportfolioPage },

    // otherwise redirect to home
    { path: '*', redirect: '/users' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register', '/users/:userId', '/eportfolio', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/home');
  }

  next();
})