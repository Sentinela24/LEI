<template>
    <div>
        <NavBar/>
        <v-container v-if="(typeof user.params !== 'undefined')" fluid>
            <v-card flat class="mx-auto my-3" max-width="1180px">
                <v-toolbar flat class="indigo--text text-h1 display-3" >
                  <v-toolbar-title>
                      <h2>Biblioteca</h2>
                  </v-toolbar-title>
                </v-toolbar>
                <v-divider class="my-1 mx-2"></v-divider>
                <v-card-text class="black--text mt-n2">
                  <h6>Use a biblioteca para armazenar e organizar os seus documentos.</h6>
                </v-card-text>

                <v-list v-for="(card, index_card) in cards" :key="index_card">
                  <v-card :loading="card.is_loading" class="indigo lighten-5 mx-auto mb-4 py-7" max-width="1130px"> 
                    <template slot="progress">
                      <v-progress-linear color="white" height="10" indeterminate></v-progress-linear>
                    </template>
                    <v-card-title class="indigo lighten-5 my-n7 indigo--text">
                      <h4>{{ card.name }}</h4>
                      <v-spacer></v-spacer>
                      <v-btn large color="indigo" dark text class="ma-2 mx-1" @click="card.popup = true">
                        <v-icon color="indigo"> mdi-plus-circle </v-icon> 
                        <span>Adicionar</span>
                      </v-btn>
                      <v-divider v-if="index_card == 0" color="white" class="my-1" vertical></v-divider>
                      <v-btn v-if="index_card == 0" large color="indigo" dark text class="ma-2 mx-1" @click="criar_popup = true">
                        <v-icon color="indigo"> mdi-plus-circle </v-icon> 
                        <span>Criar CV</span>
                      </v-btn>
                    </v-card-title>
                    <v-divider></v-divider>
                    <div v-if="user.params[card.type].length != 0">
                      <v-row class="mt-3"> 
                        <v-col v-for="c in user.params[card.type]" :key="c.id" class="d-flex child-flex" cols="3"> 
                          <v-card class="mx-5" elevation="3">
                            <v-hover>
                              <template v-slot:default="{ hover }">
                               <v-card max-width="225px" elevation="0" class="mb-n4">
                                 <pdf v-if="index_card == 0" :ref="'page' + c.id" :src="c.url.split('/uploads/').join(`${strapi_url}/uploads/`)"></pdf>
                                 <v-img v-else gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px" :src="c.url.split('/uploads/').join(`${strapi_url}/uploads/`)"></v-img>
                                  <v-fade-transition>
                                    <v-overlay v-if="hover" class="rounded-0" absolute color="indigo lighten-2">
                                      <v-btn  color="primary"  @click.prevent="downloadFile(c)">DOWNLOAD</v-btn> 
                                    </v-overlay>
                                  </v-fade-transition>
                                </v-card>
                              </template>
                            </v-hover>
                            <v-divider></v-divider>
                            <v-card-text class="mb-n3 mt-n5 mx-2">
                              <span class="ml-n3 d-inline-block text-truncate" style="width: 150px;">{{ c.name.split('.')[0] }}</span>

                              <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn class="mt-n3" color="indigo" x-small icon dark v-bind="attrs" v-on="on">
                                    <v-icon> mdi-dots-vertical </v-icon> 
                                  </v-btn>
                                </template>
                                <v-list>
                                  <v-list-item  v-for="(item, index) in items" :key="index" @click="selectSection(index, c, card.type)">
                                    <v-list-item-title :to= "item.path" >{{ item.title }}</v-list-item-title>
                                  </v-list-item>
                                </v-list>
                              </v-menu>
                          
                              <v-btn v-if="card.type != 'certificados'" x-small icon dark class="mt-n3" color="indigo" @click.prevent="$refs['page' + c.id][0].print()"><v-icon>mdi-arrow-expand</v-icon></v-btn>
                              <v-btn v-else x-small icon dark class="mt-n3" color="indigo" @click="open_image(c)"><v-icon>mdi-arrow-expand</v-icon></v-btn>
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>
                    </div>
                    <div v-else>
                      <v-row align="center" justify="center">
                        <v-icon slot="icon"  color="warning" size="72">
                          mdi-pencil-box-outline
                        </v-icon>
                      </v-row>
                      <v-row align="center" justify="center">
                        <h5>Sem documentos nesta secção.</h5>
                      </v-row>
                    </div>
                  </v-card>
                  
                  <v-dialog v-model="card.popup" max-width="600px">
                    <v-card>
                      <v-card-title class="indigo--text">
                        <h2>{{ card.title }}</h2>
                      </v-card-title>
                      <v-divider class="my-n2"></v-divider>
                      <v-form ref="form" v-model="card.valid" lazy-validation class="mx-2">
                        <v-file-input class="mb-n1" prepend-icon="mdi-file text--indigo" :rules="fileRules" accept="application/pdf, image/png, image/jpeg, image/bmp" label="Adicionar" type="file" name="cv" show-size truncate-length="25" ></v-file-input>
                        <v-btn :disabled="!card.valid" color="indigo" dark @click="validate('form', card.type)" class="mb-2">
                          Carregar
                        </v-btn>
                        <v-btn color="indigo" text @click="card.popup = false" class="mb-2">
                          Cancelar
                        </v-btn>
                      </v-form>
                    </v-card>
                  </v-dialog>

                </v-list>

            <v-dialog v-model="criar_popup" max-width="600px">
              <v-card>
                <v-card-title class="indigo--text">
                  <h2>Criar CV</h2>
                </v-card-title>
                <v-divider class="my-n2"></v-divider>
                <v-card-text class="mt-3">
                  <h5>Pode criar a partir do seu ePortefolio ou criar de raíz.</h5>
                </v-card-text>
                <v-card-actions class="mt-n7">
                  <v-btn class="mx-2" color="indigo" dark  elevation="3" @click="criar_popup = false">
                    Seu ePortefolio
                  </v-btn>
                  <v-btn class="mx-2 criar" color="indigo" text elevation="3" to="/criar-eportfolio">
                    Criar novo
                  </v-btn>
                  <v-btn class="mx-2" color="indigo" text elevation="3" @click="criar_popup = false">
                    Cancelar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="image_popup" width="400px">
              <v-card v-if="(typeof certificate.url !== 'undefined')" >
                <v-img width="400px" :src="certificate.url.split('/uploads/').join(`${strapi_url}/uploads/`)"></v-img>
                <v-card-title class="indigo--text mt-n3">
                  <h2><span class="font-weight-light">Nome:</span>&nbsp;{{certificate.name.split('.')[0]}}</h2>
                </v-card-title>
                <v-card-title class="indigo--text mt-n7">
                  <h2><span class="font-weight-light">Tipo:</span>&nbsp;{{certificate.mime.split('/')[1]}}</h2>
                </v-card-title>
                <v-card-title class="indigo--text mt-n7">
                  <h2><span class="font-weight-light">Tamanho:</span>&nbsp;{{certificate.size}} KB</h2>
                </v-card-title>
              </v-card>
            </v-dialog>

            <v-dialog v-model="delete_popup" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Tem a certeza que pretende eliminar este documento da biblioteca?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close_delete">Cancelar</v-btn>
                  <v-btn color="blue darken-1" text @click="delete_item_confirm">Sim</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>

          </v-card>
        </v-container>
    </div>  
</template>

<script>
import { VContainer, VRow, VCol, VLayout, VImg, VCard, VCardText, VCardTitle, VCardSubtitle, VDivider, VCardActions, VProgressLinear, VList, VListItem, VListItemTitle,  VListItemAction, VListItemContent, VAppBarNavIcon, VToolbarTitle, VMenu, VProgressCircular, VFileInput, VDialog, VItem, VHover, VOverlay, VFadeTransition, VForm } from 'vuetify/lib'
import NavBar from '../components/NavBar'
import pdf from 'vue-pdf'
import axios from 'axios'

export default {
    data: () => ({
      selection: 1,
      model: null,
      items: [
        { title: 'Editar nome', path: '/editar-perfil', click() { this.$router.push('/editar-perfil')} },
        { title: 'Apagar documento', click() {} },
      ],
      cards: [
        { 'name' : 'CVs', title: 'Carregar CV', is_loading: false, type: 'cvs', popup: false, valid: false },
        { 'name' : 'Certicados/diplomas', title: 'Carregar certificado/diploma', is_loading: false, type: 'certificados', popup: false, valid: false },
        { 'name' : 'Cartas de apresentação', title: 'Carregar carta de apresentação', is_loading: false, type: 'cartas', popup: false, valid: false },
        { 'name' : 'Outros documentos', title: 'Carregar documento', is_loading: false, type: 'outros', popup: false, valid: false },
      ],
      fileRules: [
        value => !value || value.size < 2000000 || 'Tamanho da foto no máximo com 2 MB!',
      ],
      pdf: null,
      adicionar_popup: false,
      adicionar_popup_cert: false,
      criar_popup: false,
      image_popup: false,
      strapi_url: 'http://localhost:1337',
      currentPage: 0,
      pageCount: 0,
      valid : true,
      strapi_url: 'http://localhost:1337',
      certificate: {},
      delete_popup: false,
      delete_index: -1,
      delete_type: '',
      docs: {}
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
        VFadeTransition,
        VForm 
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
            const blob = new Blob([response.data])
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = cv.name
            link.click()
            URL.revokeObjectURL(link.href)
          }).catch(console.error)
      },

      async selectSection(index, doc, type) {
        if (this.items[index].path)
          this.items[index].click.call(this)
        else{
          this.docs = this.user.params[type]
          this.delete_index = this.user.params[type].indexOf(doc)
          this.delete_type  = type
          this.delete_popup = true
        }
      },

      validate (form, type_form) {
        console.log(this.$refs[form][0])
        if(this.$refs[form][0].validate()){
          const formElement = this.$refs[form][0].$el
          const formData = new FormData();
          const formElements = formElement.elements;
          for (let i = 0; i < formElements.length; i++) {
            const currentElement = formElements[i];
            console.log(currentElement.type)
            if (currentElement.type === 'file') {
              if (currentElement.files.length === 1) {
                const file = currentElement.files[0];
                console.log(currentElement.files[0])
                formData.append(`files`, currentElement.files[0], file.name);
              } else {
                for (let i = 0; i < currentElement.files.length; i++) {
                  const file = currentElement.files[i];
                  formData.append(`files.${currentElement.name}`, currentElement.files[0], file.name);
                }
              }
            }
          }
          for (var p of formData) {
            console.log("Elemento do form: " + p);
          }
          console.log("FROMDATA" + JSON.stringify(Object.fromEntries(formData)))
          this.$store.dispatch('users/put_file', { user : this.$store.state.users.user.params, file : formData, tipo: type_form})

          for(var card of this.cards)
            card.popup = false
        }
      },

      open_image(cert){
        console.log(cert)
        this.certificate = cert
        this.image_popup = true
      },

      delete_item_confirm () {
        this.docs.splice(this.delete_index, 1)
        this.$store.dispatch('users/delete_document', { docs: this.docs, user: this.user.params, type: this.delete_type })
        this.close_delete()
      },

      close_delete () {
        this.delete_popup = false
        this.delete_index = -1
      },
      
    },

    created () {
        this.$store.dispatch('users/getAll');
    }
    
};
</script>
<style scoped>
  .criar{
    text-decoration: none;
  }
</style>