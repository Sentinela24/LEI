import { router } from '../_helpers';
import { userService } from '../_services';

export const users = {
    namespaced: true,
    state: {
        all: {},
        user: null,
        eportfolio: null
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
            console.log( id);
            commit('getUserRequest', { id });

            userService.getById(id)
                .then(
                    user => commit('getUserSuccess', user),
                    error => commit('getUserFailure', error)
                );
        },
        putEportfolio({ dispatch, commit }, eportfolio) {
            commit('putEportfolioRequest', eportfolio);

            userService.create_eport(eportfolio)
                .then(
                    eportfolio => {
                        commit('putEportfolioSuccess', eportfolio);
                        router.go(-1);
                        setTimeout(() => {
                            // display success message after route change completes
                            dispatch('alert/success', 'Eportfolio adicionado', { root: true });
                        })
                    },
                    error => {
                        commit('putEportfolioFailure', error);
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
        putEportfolioRequest(state, eportfolio) {
            state.status = { registering: true };
        },
        putEportfolioSuccess(state, eportfolio) {
            state.status = { };
        },
        putEportfolioFailure(state, error) {
            state.status = { };
        }
    }
}
