<template>
    <div>
        <NavBar/>
        <v-container fluid>
            <v-card
            :loading="loading"
            class="indigo lighten-5 mx-auto my-10"
            max-width="874">
                <template slot="progress">
                    <v-progress-linear
                        color="white"
                        height="10"
                        indeterminate>
                    </v-progress-linear>
                </template>
                <v-toolbar class="my-3 indigo white--text text-h1 display-3" dark>
                  <v-toolbar-title>
                      <h2>{{user.params.username}}</h2>
                  </v-toolbar-title>

                  <v-spacer></v-spacer>

                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="indigo"
                        dark
                        text
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon color="white"> mdi-dots-vertical </v-icon> 
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item 
                        v-for="(item, index) in items"
                        :key="index"
                        @click="selectSection(index)"
                      >
                        <v-list-item-title :to= "item.path" >{{ item.title }}</v-list-item-title>

                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-toolbar>
                
                <v-card-title class="indigo lighten-5 ml-0 my-n1 indigo--text"><h4>O meu ePortefolio</h4></v-card-title>
                
                <v-divider class="my-0" ></v-divider>
                
                <v-list class="indigo lighten-5">
                  <v-list-item class="mb-n4">
                    <v-list-item-action>
                      <v-icon color="indigo">mdi-phone</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title><h5>{{user.params.eportfolios[0].telemovel}}</h5></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider inset></v-divider>

                  <v-list-item class="mb-n4">
                    <v-list-item-action>
                      <v-icon color="indigo">mdi-account</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title ><h5>{{user.params.eportfolios[0].nome.substr(0, 10)}}</h5></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider inset></v-divider>

                  <v-list-item class="mb-n4">
                    <v-list-item-action>
                      <v-icon color="indigo">mdi-email</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title><h5>{{user.params.eportfolios[0].email}}</h5></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider inset></v-divider>

                  <v-list-item class="mb-n4">
                    <v-list-item-action>
                      <v-icon color="indigo">mdi-map-marker</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title><h5>{{user.params.eportfolios[0].nacionalidade}}</h5></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider inset></v-divider>

                  <v-list-item class="mb-n4">
                    <v-list-item-action>
                      <v-icon color="indigo">mdi-account-group</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title><h5>{{user.params.eportfolios[0].genero}}</h5></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider inset></v-divider>

                  <v-list-item class="mb-n4">
                    <v-list-item-action>
                      <v-icon color="indigo">mdi-calendar</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title><h5>{{user.params.eportfolios[0].data_nasc}}</h5></v-list-item-title>
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
      
    </v-col>
  </v-row>
        
                    
                 <!--   <h3>Lista de utilizadores:</h3>
                    <em v-if="users.loading">A carregar utilizadores...</em>
                    <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
                    <ul v-if="users.params">
                        <li v-for="user in users.params" :key="user.id">
                            <router-link :to="$router.resolve({ name: 'users', params: { userId: user.id }}).href">{{user.paramsname + ' ' + user.email}}</router-link>
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
import { VContainer, VRow, VCol, VLayout, VImg, VCard, VCardText, VCardTitle, VCardSubtitle, VDivider, VCardActions, VProgressLinear, VList, VListItem, VListItemTitle,  VListItemAction, VListItemContent, VAppBarNavIcon, VToolbarTitle, VMenu } from 'vuetify/lib'
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
      items: [
        { title: 'Editar Perfil', path: '/editar-perfil', click() { this.$router.push('/editar-perfil')} },
        { title: 'Editar ePortefolio', path: '/editar-eportefolio', click() { this.$router.push('/editar-eportefolio')} },
        { title: 'Apagar ePortefolio', click() {} },
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
        VAppBarNavIcon,
        VMenu
    },

    computed: {
        user () {
          console.log("User: "+ JSON.stringify(this.$store.state.users.user));
          return this.$store.state.users.user;
        },
        date() {
            //console.log(this.user.toISOString().substr(0, 10));
            //return this.user.toISOString().substr(0, 10);
        },
        users () {
            return this.$store.state.users.all;
        },
    },
    
    methods: {
      criar () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },

      async selectSection(index) {
        if (this.items[index].path)
          this.items[index].click.call(this)
        else{
          await this.$store.dispatch('users/deleteEport', {user : this.user.params});
          if(this.user.params.eportfolios.length == 0)
            this.$router.push("/criar");
        }
          }
    },

    created () {
        this.$store.dispatch('users/getAll');
    }
    
};
</script>