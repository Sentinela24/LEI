import Vue from 'vue';
import Router from 'vue-router';
import { authentication } from '../_store';

import HomePage from '../views/HomePage'
import MyMinhoPassPage from '../views/MyMinhoPassPage'
import LoginPage from '../views/LoginPage'
import RegisterPage from '../views/RegisterPage'
import PerfilPage from '../views/PerfilPage'
import EportfolioPage from '../views/EportfolioPage'
import CreatePage from '../views/CreatePage'
import EditPerfilPage from '../views/EditPerfilPage'
import EditEportPage from '../views/EditEportPage'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/home', component: HomePage },
    { path: '/eportfolio', component: MyMinhoPassPage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/users/:userId', name: 'users', component: PerfilPage },
    { path: '/criar-eportfolio', component: EportfolioPage },
    { path: '/criar', component: CreatePage },
    { path: '/editar-perfil', component: EditPerfilPage },
    { path: '/editar-eportefolio', component: EditEportPage },

    // otherwise redirect to home
    { path: '*', redirect: '/home' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  console.log(authRequired);
  const loggedIn = localStorage.getItem('user');

  if (!authRequired && loggedIn) {
    return next('/eportfolio');
  }
  
  console.log(to.fullPath + " " + from.fullPath)
  if((!authRequired || to.fullPath == '/eportfolio') && from.fullPath == '/criar' && authentication.user != null)
    return next('/criar')

  if (authRequired && !loggedIn) {
    return next('/home');
  }

  next();
})