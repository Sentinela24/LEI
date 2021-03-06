import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

import { alert } from './alert.module';
import { authentication } from './authentication.module';
import { users } from './users.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        authentication,
        users
    },
    plugins: [createPersistedState()]
});
