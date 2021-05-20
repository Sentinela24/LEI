import { createNamespacedHelpers } from 'vuex';
import { router } from '../_helpers';
import { userService } from '../_services';

export const users = {
    namespaced: true,
    state: {
        all: {},
        user: null
    },
    actions: {
        getAll({ commit }) {
            commit('getAllRequest');

            userService.getAll()
                .then(
                    users => commit('getAllSuccess', users),
                    error => commit('getAllFailure', error)
                );
        },
        getUser({ commit }, { id }) {
            return new Promise(resolve => {
            commit('getUserRequest', { id });

            userService.getById(id)
                .then(
                    user => {
                        commit('getUserSuccess', user),
                        resolve();
                    },
                    error => commit('getUserFailure', error)
                );
            })   
        },
        putEportfolio({ dispatch, commit }, { eportfolio, user }) {
            commit('putEportfolioRequest');

            userService.create_eport(eportfolio)
                .then(
                    eport => {
                        userService.updateUser( user, eport)
                            .then(
                                u => {
                                    commit('getUserSuccess', u),

                                    router.push('/eportfolio');
                                    setTimeout(() => {
                                        // display success message after route change completes
                                        dispatch('alert/success', 'Eportfolio adicionado', { root: true });
                                    })
                                },
                                error => {
                                    commit('getUserFailure', error);
                                    dispatch('alert/error', error, { root: true });
                                }
                            )
                    },
                    error => {
                        commit('getUserFailure', error);
                        dispatch('alert/error', error, { root: true });
                    }
                );
        },

        deleteEport({ dispatch, commit }, { user }) {
            return new Promise(resolve => {
            commit('putEportfolioRequest');

            var eport = user.eportfolios[0]

            userService.deleteEportUser(user)
                .then(
                    u => {
                        //commit('getUserSuccess', u);
                        userService.removeEport( eport )
                            .then(
                                e => {
                                    console.log("Novo user: " + u)
                                    commit('putEportfolioSuccess', u)
                                
                                    setTimeout(() => {
                                      // display success message after route change completes
                                      dispatch('alert/success', 'Eportfolio removido', { root: true });
                                    })
                                    resolve()
                                },
                                error => {
                                    commit('putEportfolioFailure', error);
                                    dispatch('alert/error', error, { root: true });
                                }
                            )
                    },
                    error => {
                        commit('getUserFailure', error);
                        dispatch('alert/error', error, { root: true });
                    }
                );
            })
        }
    },
    mutations: {
        getAllRequest(state) {
            state.all = { loading: true };
        },
        getAllSuccess(state, users) {
            state.all = { params: users };
        },
        getAllFailure(state, error) {
            state.all = { error };
        },
        getUserRequest(state, id) {
        },
        getUserSuccess(state, user) {
            state.user = { params: user };
        },
        getUserFailure(state, error) {
            state.user = { error };
        },
        putEportfolioRequest(state) {
            state.user = { loading: true };
        },
        putEportfolioSuccess(state, user) {
            state.user = { params: user };
        },
        putEportfolioFailure(state, error) {
            state.user = { error };
        }
    }
}
