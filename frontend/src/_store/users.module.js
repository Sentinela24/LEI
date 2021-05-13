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
            commit('getUserRequest', { id });

            userService.getById(id)
                .then(
                    user => {
                        commit('getUserSuccess', user)
                    },
                    error => commit('getUserFailure', error)
                );
        },
        putEportfolio({ dispatch, commit }, { eportfolio, user }) {
            commit('putEportfolioRequest');

            var u
            userService.getById(user.id)
                .then(
                    s => u = s,
                    error => {
                        commit('getUserFailure', error);
                        dispatch('alert/error', error, { root: true });
                    }
                )

            userService.create_eport(eportfolio)
                .then(
                    eport => {
                        userService.updateUser( u, eport)
                            .then(
                                user => {
                                    commit('getUserSuccess', user),

                                    router.go(-1);
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
            commit('putEportfolioRequest');

            var eport = user.eportfolios[0]

            userService.deleteEportUser(user)
                .then(
                    u => {
                        //commit('getUserSuccess', u);

                        userService.removeEport( eport )
                            .then(
                                e => {
                                    commit('putEportfolioSuccess', e),

                                    setTimeout(() => {
                                        // display success message after route change completes
                                        dispatch('alert/success', 'Eportfolio removido', { root: true });
                                    })
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
            state.user = { loading: true };
        },
        getUserSuccess(state, user) {
            state.user = { params: user };
        },
        getUserFailure(state, error) {
            state.user = { error };
        },
        putEportfolioRequest(state) {
            state.eportfolio = { registering: true };
        },
        putEportfolioSuccess(state, eportfolio) {
            state.eportfolio = { params: eportfolio };
        },
        putEportfolioFailure(state, error) {
            state.status = { error };
        }
    }
}
