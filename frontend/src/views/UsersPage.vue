<template>
    <div>
        <v-container fluid >
        <v-row align="center" justify="center">
        <v-col cols=3>
        <h1>Olá {{user.user.username}}!</h1>
        <h3>Lista de utilizadores:</h3>
        <em v-if="users.loading">A carregar utilizadores...</em>
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
        <ul v-if="users.params">
            <li v-for="user in users.params" :key="user.id">
            <!-- <a :href =  "$router.resolve({ name: 'users', params: { userId: user.id }}).href" class="nav-link">{{user.username + ' ' + user.email}}</a> -->

            <router-link :to="$router.resolve({ name: 'users', params: { userId: user.id }}).href">{{user.username + ' ' + user.email}}</router-link>
            <!-- <router-link :to="{ name: 'users', params: { userId: user.id }}">{{user.username + ' ' + user.email}}</router-link> -->
            </li>
        </ul>
        <p>
            <router-link to="/home">Logout</router-link>
        </p>
        </v-col>
        </v-row>
        </v-container>
    </div>
</template>

<script>
import { VContainer, VRow, VCol, VLayout } from 'vuetify/lib'

export default {
    components: {
        VContainer,
        VRow,
        VCol,
        VLayout,
    },

    computed: {
        user () {
            return this.$store.state.authentication.user;
        },
        users () {
            return this.$store.state.users.all;
        }
    },


    /*
    methods: {
        setData(err, user, users){
            if (err) {
                this.error = err.toString()
            } else {
                this.user = user
                this.users = users
            }
        }
    },
    */
    created () {
        this.$store.dispatch('users/getAll');
    }
    
};
</script>