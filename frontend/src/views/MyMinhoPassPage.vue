<template>
    <div>
        <NavBar/>
        <v-container fluid >
            <v-card
            :loading="loading"
            class="mx-auto my-10"
            max-width="874">
                <template slot="progress">
                    <v-progress-linear
                        color="deep-purple"
                        height="10"
                        indeterminate>
                    </v-progress-linear>
                </template>
                <v-card-title class="my-3 blue--text display-3">{{user.user.username}}</v-card-title>
                <v-divider class="mx-0 my-n2"></v-divider>
                <v-card-title class="ml-0 my-n1">O meu ePortefolio</v-card-title>
                <v-divider class="mx-0 my-n2"></v-divider>
                <v-card-actions>
                    <v-btn
                        to="/criar-eportfolio"
                        color="deep-purple lighten-2"
                        text
                        @click="criar">
                        Criar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
        <v-container fluid >
            <v-row align="center" justify="center">
                <v-col cols=3>
                   
        <h1>Eportfolio</h1>
        <div class="eportfolio">
            <ul v-if="user.user.eportfolios.length">
                <li v-for="eport in user.user.eportfolios" :key="eport.id">
                    <span>Nome: {{eport.nome}}</span>
                     <br/>
                    <span>Género: {{eport.genero}}</span>
                     <br/>
                    <span>Nacionalidade: {{eport.nacionalidade}}</span>
                     <br/>
                    <span>Email: {{eport.email}}</span>
                     <br/>
                    <span>Telemóvel: {{eport.telemovel}}</span>
                     <br/>
                    <span>Profissão: {{eport.profissao}}</span>
                     <br/>
                    <span>Data de Nascimento: {{eport.data_nasc}}</span>
                </li>
            </ul>
            <ul v-else>
                <span>Ainda não tem um Eportfolio criado.</span>
            </ul>
            <router-link to="/criar-eportfolio" class="btn btn-link">Carregar aqui para criar um Eportfolio</router-link>
        </div>
                    
                 <!--   <h3>Lista de utilizadores:</h3>
                    <em v-if="users.loading">A carregar utilizadores...</em>
                    <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
                    <ul v-if="users.params">
                        <li v-for="user in users.params" :key="user.id">
                            <router-link :to="$router.resolve({ name: 'users', params: { userId: user.id }}).href">{{user.username + ' ' + user.email}}</router-link>
                        </li>
                    </ul>
                    <p>
                        <router-link to="/home">Logout</router-link>
                    </p> -->
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { VContainer, VRow, VCol, VLayout, VImg, VCard, VCardText, VCardTitle, VCardSubtitle, VDivider, VCardActions, VProgressLinear } from 'vuetify/lib'
import NavBar from '../components/NavBar'

export default {
    data: () => ({
      loading: false,
      selection: 1,
    }),

    components: {
        VContainer,
        VRow,
        VCol,
        VLayout,
        NavBar,
        VImg,
        VCard,
        VCardText,
        VCardTitle,
        VCardSubtitle,
        VDivider,
        VCardActions,
        VProgressLinear
    },

    computed: {
        user () {
            return this.$store.state.authentication.user;
        },
        users () {
            return this.$store.state.users.all;
        }
    },
    methods: {
      criar () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },

    created () {
        this.$store.dispatch('users/getAll');
    }
    
};
</script>