<template>
    <div>
        <h1>Olá {{user.user.username}}!</h1>
        <h3>Lista de utilizadores:</h3>
        <em v-if="users.loading">A carregar utilizadores...</em>
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
        <ul v-if="users.params">
            <li v-for="user in users.params" :key="user.id">
                <!--  <a :href =  "'http://localhost:8080/users/' + user.id"> {{user.username + ' ' + user.email}}</a> -->
                <router-link :to="{ name: 'users', params: { userId: user.id }}">{{user.username + ' ' + user.email}}</router-link>
            </li>
        </ul>
        <p>
            <router-link to="/login">Logout</router-link>
        </p>
    </div>
</template>

<script>
export default {
    computed: {
        user () {
            return this.$store.state.authentication.user;
        },
        users () {
            return this.$store.state.users.all;
        }
    },
    created () {
        this.$store.dispatch('users/getAll');
    }
};
</script>