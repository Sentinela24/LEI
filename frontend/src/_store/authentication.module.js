import { userService } from '../_services';
import { router } from '../_helpers';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

export const authentication = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ dispatch, commit }, { identifier, password }) {
            commit('loginRequest', { identifier });

            userService.login(identifier, password)
                .then(
                    user => {
                        commit('loginSuccess', user);
                        if(user.user.eportfolios.length)
                            router.push('/eportfolio')
                                  .catch((erro) => {console.log(erro)});
                        else
                            router.push('/criar')
                                  .catch((erro) => {console.log(erro)});
                        
                    },
                    error => {
                        commit('loginFailure', error);
                        dispatch('alert/error', error, { root: true });
                    }
                );
        },
        
        logout({ commit }) {
            userService.logout();
            commit('logout');
        },

        register({ dispatch, commit }, user) {
            commit('registerRequest', user);
        
            userService.register(user)
                .then(
                    user => {
                        commit('registerSuccess', user);
                        router.push('/login');
                        setTimeout(() => {
                            // display success message after route change completes
                            dispatch('alert/success', 'Registration successful', { root: true });
                        })
                    },
                    error => {
                        commit('registerFailure', error);
                        dispatch('alert/error', error, { root: true });
                    }
                );
        },
        getUser({ commit }, { id }) {
            commit('getUserRequest', { id });

            userService.getById(id)
                .then(
                    user => {
                        commit('getUserSuccess', user)
                    },
                    error => commit('getUserFailure', error)
                );
        }
    },
    mutations: {
        loginRequest(state, user) {
            state.status = { loggingIn: true };
            state.user = user;
        },
        loginSuccess(state, user) {
            state.status = { loggedIn: true };
            state.user = user;
        },
        loginFailure(state) {
            state.status = {};
            state.user = null;
        },
        logout(state) {
            state.status = {};
            state.user = null;
        },
        registerRequest(state, user) {
            state.status = { registering: true };
        },
        registerSuccess(state, user) {
            state.status = {};
        },
        registerFailure(state, error) {
            state.status = {};
        },
        getUserRequest(state, id) {
            state.user = { loading: true };
        },
        getUserSuccess(state, user) {
            state.user = { params: user };
        },
        getUserFailure(state, error) {
            state.user = { error };
        }
    }
}
