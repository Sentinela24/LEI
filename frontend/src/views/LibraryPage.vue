<template>
    <div>
        <NavBar/>
        <v-container fluid >
            <v-card  :loading="loading" class="indigo lighten-5 mx-auto my-10" max-width="874">
                <template slot="progress">
                  <v-progress-linear color="white" height="10" indeterminate></v-progress-linear>
                </template>
                <v-toolbar class="my-3 indigo white--text text-h1 display-3" dark>
                  <v-toolbar-title>
                      <h2>Biblioteca</h2>
                  </v-toolbar-title>
                </v-toolbar>
                
                <v-card-title class="indigo lighten-5 mt-n4 mb-n7 indigo--text">
                  <h4>CVs</h4>
                  <v-spacer></v-spacer>
                  <v-btn large color="indigo" dark text class="ma-2 mx-1" @click="adicionar_popup = true">
                    <v-icon color="indigo"> mdi-plus-circle </v-icon> 
                    <span>Adicionar</span>
                  </v-btn>
                  <v-divider  color="white" class="my-1" vertical></v-divider>
                  <v-btn large color="indigo" dark text class="ma-2 mx-1" @click="criar_popup = true">
                    <v-icon color="indigo"> mdi-plus-circle </v-icon> 
                    <span>Criar CV</span>
                  </v-btn>
                </v-card-title>
                
                <v-divider></v-divider>

                <v-row> 
                  <v-col v-for="cv in user.params.cvs" :key="cv.id" class="d-flex child-flex" cols="3"> 
                    <v-card class="mx-5" elevation="3">
                      <v-hover>
                        <template v-slot:default="{ hover }">
                         <v-card width="100%" elevation="0" class="mb-n4">
                           <pdf :ref="'page' + cv.id" :src="cv.url.split('/uploads/').join(`${strapi_url}/uploads/`)"></pdf>
                            <v-fade-transition>
                              <v-overlay v-if="hover" class="rounded-0" absolute color="indigo lighten-2">
                                <v-btn  color="primary"  @click.prevent="downloadFile(cv)">DOWNLOAD</v-btn> 
                              </v-overlay>
                            </v-fade-transition>
                          </v-card>
                        </template>
                      </v-hover>
                      <v-divider></v-divider>
                      <v-card-text class="mb-n3 mt-n5 mx-2">
                        <span class="ml-n3 d-inline-block text-truncate" style="width: 90px;">{{cv.name}}</span>
                        <v-btn x-small icon dark class="mt-n3" color="indigo"><v-icon>mdi-dots-vertical</v-icon></v-btn>
                        <v-btn x-small icon dark class="mt-n3" color="indigo" @click.prevent="$refs['page' + cv.id][0].print()"><v-icon>mdi-arrow-expand</v-icon></v-btn>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>

              <v-dialog v-model="adicionar_popup" max-width="500px">
                <v-card>
                  <v-card-title>
                    <h2>Carregar CV</h2>
                  </v-card-title>
                  <v-card-text class="my-n4">
                    <v-file-input prepend-icon="mdi-file text--indigo" :rules="fileRules" accept="application/pdf" label="Adicionar" type="file" name="avatar" show-size truncate-length="25" @change="onFileSelected"></v-file-input>
                  </v-card-text>
                  <v-card-actions class="mt-n6">
                    <v-btn  text @click="adicionar_popup = false">
                      Cancelar
                    </v-btn>
                    <v-btn color="primary" text @click="adicionar_popup = false">
                      Carregar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog v-model="criar_popup" max-width="1000px">
                <v-card>
                  <v-card-title>
                    <h2>Criar CV</h2>
                  </v-card-title>
                  <v-card-text class="mt-3">
                    <h5>Pode criar a partir do seu ePortefolio, carregar a partir da sua biblioteca ou criar de raíz.</h5>
                  </v-card-text>
                  <v-card-actions class="mt-n7">
                    <v-btn class="mx-2" color="indigo" dark  elevation="3" @click="criar_popup = false">
                      Seu ePortefolio
                    </v-btn>
                    <v-btn class="mx-2" color="indigo" text elevation="3" @click="criar_popup = false">
                      Selecionar da biblioteca
                    </v-btn>
                    <v-btn class="mx-2" color="indigo" text elevation="3" @click="criar_popup = false">
                      Criar novo
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </v-container>
    </div>  
</template>

<script>
import { VContainer, VRow, VCol, VLayout, VImg, VCard, VCardText, VCardTitle, VCardSubtitle, VDivider, VCardActions, VProgressLinear, VList, VListItem, VListItemTitle,  VListItemAction, VListItemContent, VAppBarNavIcon, VToolbarTitle, VMenu, VProgressCircular, VFileInput, VDialog, VItem, VHover, VOverlay, VFadeTransition } from 'vuetify/lib'
import NavBar from '../components/NavBar'
import pdf from 'vue-pdf'
import axios from 'axios'

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
      fileRules: [
        value => !value || value.size < 1000000 || 'Tamanho da foto no máximo com 1 MB!',
      ],
      pdf: null,
      adicionar_popup: false,
      criar_popup: false,
      pdf_popup: false,
      strapi_url: 'http://localhost:1337',
      currentPage: 0,
      pageCount: 0
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
        VMenu,
        VProgressCircular,
        VFileInput,
        VDialog,
        pdf,
        VItem,
        VHover,
        VOverlay,
        VFadeTransition
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

      onFileSelected(e) {
        this.pdf = e
      },

      exportToPDF () {
        var element = document.getElementById('document');
        var opt = {
          margin:1,
          filename:'eportefolio.pdf',
          image: { type: 'jpeg', quality: 0.95 },
          html2canvas:  { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        // New Promise-based usage:
        html2pdf().set(opt).from(element).save();
        // Old monolithic-style usage:
        html2pdf(element, opt);
		  },

      downloadFile (cv) {
        axios.get(cv.url.split('/uploads/').join(`${this.strapi_url}/uploads/`), { responseType: 'blob' })
          .then(response => {
            const blob = new Blob([response.data], { type: 'application/pdf' })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = cv.name
            link.click()
            URL.revokeObjectURL(link.href)
          }).catch(console.error)
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