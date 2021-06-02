<template>
    <div>
        <NavBar/>
        <v-container fluid>
            <v-card :loading="loading" class="indigo lighten-5 mx-auto my-10" max-width="874">
                <template slot="progress">
                    <v-progress-linear color="white" height="10" indeterminate></v-progress-linear>
                </template>
                <v-toolbar class="my-3 indigo white--text text-h1 display-3" dark>
                  <v-toolbar-title>
                      <h2>{{user.params.username}}</h2>
                  </v-toolbar-title>

                  <v-spacer></v-spacer>

                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="indigo" dark text v-bind="attrs" v-on="on">
                        <v-icon color="white"> mdi-dots-vertical </v-icon> 
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item  v-for="(item, index) in items" :key="index" @click="selectSection(index)">
                        <v-list-item-title :to= "item.path" >{{ item.title }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-toolbar>
                
                <v-container fluid id="document"> 
                  <v-card-title class="indigo lighten-5 ml-0 py-3 indigo--text"><h4>O meu ePortefolio</h4></v-card-title>
                  
                  <v-divider class="my-0" ></v-divider>
                  
                  <v-list class="indigo lighten-5" >
                    <v-list-item class="mb-n4">
                      <v-list-item-action>
                        <v-icon color="indigo">mdi-account</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title ><h5>{{user.params.eportfolios[0].nome.substr(0, 30)}}</h5></v-list-item-title>
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
                        <v-icon color="indigo">mdi-phone</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title><h5>{{user.params.eportfolios[0].telemovel}}</h5></v-list-item-title>
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
                    <v-divider inset></v-divider>
                    <v-list-item class="mb-n4">
                      <v-list-item-action>
                        <v-icon color="indigo">mdi-briefcase</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title><h5>{{user.params.eportfolios[0].profissao}}</h5></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-container>
                
                <v-divider></v-divider>
                
                <v-card-actions >
                  <v-btn color="primary" dark rounded  @click="exportToPDF"><v-icon left>mdi-download</v-icon>Converter para PDF</v-btn>
                </v-card-actions> 

              </v-card>
        </v-container>
    </div>
</template>

<script>
import { VContainer, VRow, VCol, VLayout, VImg, VCard, VCardText, VCardTitle, VCardSubtitle, VDivider, VCardActions, VProgressLinear, VList, VListItem, VListItemTitle,  VListItemAction, VListItemContent, VAppBarNavIcon, VToolbarTitle, VMenu } from 'vuetify/lib'
import NavBar from '../components/NavBar'
import html2pdf from 'html2pdf.js'

export default {
    data: () => ({
      loading: false,
      selection: 1,
      model: null,
      items: [
        { title: 'Editar Conta', path: '/editar-perfil', click() { this.$router.push('/editar-perfil')} },
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


      exportToPDF () {
        var element = document.getElementById('document');
        var opt = {
          margin: 1,
          filename:'eportefolio.pdf',
          image: { type: 'jpeg', quality: 0.95 },
          html2canvas:  { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        // New Promise-based usage:
        //html2pdf().set(opt).from(element).save();
        // Old monolithic-style usage:
        html2pdf(element, opt);
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