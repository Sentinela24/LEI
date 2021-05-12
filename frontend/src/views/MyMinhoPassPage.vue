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
                        color="white"
                        height="10"
                        indeterminate>
                    </v-progress-linear>
                </template>
                <v-toolbar
                class="my-3 indigo white--text text-h1 display-3"
          dark
        >
          <v-toolbar-title>
              <h2>{{user.user.username}}</h2>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>
                
                <v-card-title class="ml-0 my-n1"><h4>O meu ePortefolio</h4></v-card-title>
                <v-divider class=" my-0" ></v-divider>
                <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{user.user.eportfolios[0].telemovel}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{user.user.eportfolios[0].nome.substr(0, 10)}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{user.user.eportfolios[0].email}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-map-marker</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{user.user.eportfolios[0].nacionalidade}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{user.user.eportfolios[0].genero}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{date}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
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
        <v-row justify="center">
    <v-col
      cols="12"
      sm="8"
    >
      <v-card>
        <v-card-title class="cyan darken-1">
          <span class="headline white--text">Sarah Mcbeal</span>

          <v-spacer></v-spacer>

          <v-btn
            dark
            icon
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-card-title>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>(650) 555-1234</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-message-text</v-icon>
            </v-list-item-action>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>(323) 555-6789</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon>mdi-message-text</v-icon>
            </v-list-item-action>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>mcbeal@example.com</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-map-marker</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Orlando, FL 79938</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-img
          src="https://picsum.photos/700?image=996"
          height="200px"
        ></v-img>
      </v-card>
    </v-col>
  </v-row>
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
import { VContainer, VRow, VCol, VLayout, VImg, VCard, VCardText, VCardTitle, VCardSubtitle, VDivider, VCardActions, VProgressLinear, VList, VListItem, VListItemTitle,  VListItemAction, VListItemContent, VAppBarNavIcon, VToolbarTitle } from 'vuetify/lib'
import NavBar from '../components/NavBar'

export default {
    data: () => ({
      loading: false,
      selection: 1,
      model: null,
      classes: [
        ['h1', 'Heading 1', '6rem', '300', '-.015625em', -1],
        ['h2', 'Heading 2', '3.75rem', '300', '-.0083333333em', 0],
        ['h3', 'Heading 3', '3rem', '400', 'normal', 1],
        ['h4', 'Heading 4', '2.125rem', '400', '.0073529412em', 2],
        ['h5', 'Heading 5', '1.5rem', '400', 'normal', 2],
        ['h6', 'Heading 6', '1.25rem', '500', '.0125em', 3],
        ['subtitle-1', 'Subtitle 1', '1rem', '400', '.009375em', 4],
        ['subtitle-2', 'Subtitle 2', '0.875rem', '500', '.0071428571em', 4],
        ['body-1', 'Body 1', '1rem', '400', '.03125em', 4],
        ['body-2', 'Body 2', '0.875rem', '400', '.0178571429em', 4],
        ['button', 'Button', '0.875rem', '500', '.0892857143em', 4],
        ['caption', 'Caption', '0.75rem', '400', '.0333333333em', 4],
        ['overline', 'Overline', '0.75rem', '500', '.1666666667em', 4],
      ],
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
        VProgressLinear,
        VList,
        VListItem,
        VListItemTitle,
        VListItemAction,
        VListItemContent,
        VToolbarTitle,
        VAppBarNavIcon
    },

    computed: {
        user () {
            return this.$store.state.authentication.user;
        },
        date() {
            console.log(this.user.toISOString().substr(0, 10));
            return this.user.toISOString().substr(0, 10);
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