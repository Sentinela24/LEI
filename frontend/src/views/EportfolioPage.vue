<template>
    <div>
        <v-container fluid >
          <v-row justify="center">
            <v-col cols=4>
              <v-card :loading="loading" class="indigo lighten-5 mx-auto my-10" max-width="874">
                <template slot="progress">
                    <v-progress-linear color="white" height="10" indeterminate></v-progress-linear>
                </template>
                <v-toolbar class="my-3 indigo white--text text-h1 display-3" dark>
                  <v-toolbar-title>
                      <h2>Criar ePortefolio</h2>
                  </v-toolbar-title>
                </v-toolbar>
                <v-card-title class="mt-n4 mb-n6"><h4>Dados pessoais</h4></v-card-title>
                <v-divider></v-divider>
              <v-form 
               ref="form" v-model="valid" lazy-validation class="mx-2 mb-1">
                <v-text-field v-model="eportfolio.name" prepend-icon="mdi-account" :counter="30" :rules="nameRules" label="Nome" name="nome" required></v-text-field>
                <v-text-field v-model="eportfolio.email" prepend-icon="mdi-email"  :rules="emailRules" label="E-mail" name="email" required></v-text-field>
                <v-file-input prepend-icon="mdi-camera" :rules="fileRules" accept="image/png, image/jpeg, image/bmp" type="file" name="avatar" label="Foto" show-size truncate-length="25" @change="onFileSelected"></v-file-input>
                <v-radio-group label="Género" v-model="eportfolio.genero" row prepend-icon="mdi-account-group" name="genero">
                  <v-radio label="F"  value="F"></v-radio>
                  <v-radio label="M"  value="M"></v-radio>
                  <v-radio label="Outro"  value="Outro"></v-radio>
                </v-radio-group>
                <v-menu v-model="fromDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field label="Data de Nascimento" prepend-icon="mdi-calendar" readonly :value="fromDateDisp" v-on="on" name="data_nasc" required></v-text-field>
                    </template>
                    <v-date-picker locale="pt-pt" :min="minDate" :max="maxDate" v-model="fromDateVal" no-title @input="fromDateMenu = false"></v-date-picker>
                </v-menu>
                <v-text-field v-model="eportfolio.telefone" prepend-icon="mdi-phone" :counter="9" :rules="phoneRules" label="Telefone"  name="telemovel" required></v-text-field>
                <v-select v-model="eportfolio.nacionalidade" prepend-icon="mdi-flag" :items="paises" :rules="[v => !!v || 'Nacionalidade é requerida']" label="Nacionalidade"  name="nacionalidade" required></v-select>
                <v-text-field v-model="eportfolio.profissao" prepend-icon="mdi-briefcase" label="Profissão" name="profissao" required></v-text-field>
        <!--    <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required></v-checkbox> -->
                <v-btn :disabled="!valid" color="success" class="mr-4 mb-3" @click="validate">
                  Validate
                </v-btn>
                <v-btn color="error" class="mr-4 mb-3" @click="reset">
                  Reset Form
                </v-btn>
                <v-btn color="warning" @click="resetValidation" class="mb-3">
                  Reset Validation
                </v-btn>
              </v-form>
              </v-card>
        
    <!--    <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="nome">Nome</label>
                <input type="text" v-model="eportfolio.nome" v-validate="'required'" name="nome" class="form-control" :class="{ 'is-invalid': submitted && errors.has('nome') }" />
                <div v-if="submitted && errors.has('nome')" class="invalid-feedback">{{ errors.first('nome') }}</div>
            </div>
            <div class="form-group">
                <input type="file" @change="onFileSelected" name="avatar">
            </div>
            <div class="form-group">
                <label for="genero">Género</label>
                <br/>
                <input type="radio" v-model="eportfolio.genero" value="F" name="genero" class="form-radio" :class="{ 'is-invalid': submitted && errors.has('genero') }" />
                <label for="F">F</label>
                <input type="radio" v-model="eportfolio.genero" value="M" name="genero" class="form-radio" :class="{ 'is-invalid': submitted && errors.has('genero') }" />
                <label for="M">M</label>
                <input type="radio" v-model="eportfolio.genero" value="Outro" name="genero" class="form-radio" :class="{ 'is-invalid': submitted && errors.has('genero') }" />
                <label for="Outro">Outro</label>
                
                <div v-if="submitted && errors.has('genero')" class="invalid-feedback">{{ errors.first('genero') }}</div>
            </div>
            <div class="form-group">
                <label htmlFor="nacionalidade">Nacionalidade</label>
                <input type="nacionalidade" v-model="eportfolio.nacionalidade" v-validate="{ required: true, min: 6 }" name="nacionalidade" class="form-control" :class="{ 'is-invalid': submitted && errors.has('nacionalidade') }" />
                <div v-if="submitted && errors.has('nacionalidade')" class="invalid-feedback">{{ errors.first('nacionalidade') }}</div>
            </div>
            <div class="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" v-model="eportfolio.email" v-validate="{ required: true, min: 6 }" name="email" class="form-control" :class="{ 'is-invalid': submitted && errors.has('email') }" />
                <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
            </div>
            <div class="form-group">
                <label htmlFor="telemovel">Telemóvel</label>
                <input type="telemovel" v-model="eportfolio.telemovel" v-validate="{ required: true, min: 6 }" name="telemovel" class="form-control" :class="{ 'is-invalid': submitted && errors.has('telemovel') }" />
                <div v-if="submitted && errors.has('telemovel')" class="invalid-feedback">{{ errors.first('telemovel') }}</div>
            </div>
            <div class="form-group">
                <label htmlFor="profissao">Profissão</label>
                <input type="profissao" v-model="eportfolio.profissao" v-validate="{ required: true, min: 6 }" name="profissao" class="form-control" :class="{ 'is-invalid': submitted && errors.has('profissao') }" />
                <div v-if="submitted && errors.has('profissao')" class="invalid-feedback">{{ errors.first('profissao') }}</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="status.registering">Criar</button>
                <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                <button class="btn btn-primary" @click="$router.go(-1)">Cancel</button>
            </div>
        </form> -->
        </v-col>
        </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { VContainer, VRow, VCol, VLayout, VForm, VTextField, VSelect, VCheckbox, VFileInput, VCard, VCardTitle, VRadio, VRadioGroup, VDivider, VToolbarTitle, VMenu, VDatePicker} from 'vuetify/lib'
import axios from 'axios';

export default {
     components: {
        VContainer,
        VRow,
        VCol,
        VLayout, 
        VForm, 
        VTextField, 
        VSelect, 
        VCheckbox,
        VFileInput,
        VCard,
        VCardTitle,
        VRadio,
        VRadioGroup,
        VToolbarTitle, 
        VDivider,
        VMenu,
        VDatePicker
    },

    data () {
        return {
            eportfolio: {
                id : '',
                nome: '',
                genero: '',
                nacionalidade: null,
                email: '',
                telemovel: '',
                profissao: '',
                avatar: null,
                data_nasc: null
            },
            loading: false,
            submitted: false,
            valid: true,
            nameRules: [
              v => !!v || 'Campo obrigatório',
              v => (v && v.length <= 30) || 'Nome tem que ter no máximo 30 caracteres',
            ],
            emailRules: [
              v => !!v || 'Campo obrigatório',
              v => /.+@.+\..+/.test(v) || 'E-mail tem que ser válido',
            ],
            fileRules: [
              value => !value || value.size < 2000000 || 'Tamanho da foto no máximo com 2 MB!',
            ],
            phoneRules: [
              v => !!v || 'Campo obrigatório',
              v => new RegExp("^(91|92|93|96|97)\\d{7}$").test(v) || 'Telefone tem que ser válido',
            ],
            paises: undefined,
            checkbox: false,
            fromDateMenu: false,
            fromDateVal: null,

            minDate: "1930-07-04",
            maxDate: null
        }
    },


    created() {
      this.fetchData();
      
      var curr = new Date()
      var year = curr.getFullYear()
      var month= curr.getMonth() + 1
      if(month < 10)
        month = '0' + month 
      var day = curr.getDate()
      if(day < 10)
        day = '0' + day 
      this.maxDate = year + '-' + month + '-' + day
    },

    computed: { 
        ...mapState('authentication', ['status']),
        fromDateDisp() {    
            return this.fromDateVal;
            // format date, apply validations, etc. Example below.
            // return this.fromDateVal ? this.formatDate(this.fromDateVal) : "";
        },
    },
    
    methods: {
/*        handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    const formElement = document.querySelector('form');
                    const formData = new FormData();

                    const formElements = formElement.elements;

                    const data = {};

                    for (let i = 0; i < formElements.length; i++) {
                        const currentElement = formElements[i];
                        if (!['submit', 'file'].includes(currentElement.type)) {
                            if('radio'.includes(currentElement.type)){
                                
                                if(currentElement.checked)
                                    data[currentElement.name] = currentElement.value;
                            }
                            else{
                                data[currentElement.name] = currentElement.value;
                            }

                        } else if (currentElement.type === 'file') {
                        if (currentElement.files.length === 1) {
                            const file = currentElement.files[0];
                            formData.append(`files.${currentElement.name}`, file, file.name);
                        } else {
                            for (let i = 0; i < currentElement.files.length; i++) {
                                const file = currentElement.files[i];
                                formData.append(`files.${currentElement.name}`, file, file.name);
                            }
                        }
                      }
                    } 
                    formData.append('data', JSON.stringify(data));
                    this.$store.dispatch('users/putEportfolio', { eportfolio: formData, user : this.$store.state.users.user.params })
                }
            });
        }, */

        onFileSelected(e) {
            this.eportfolio.avatar = e
        },

        validate () {
          console.log(this.$refs.form)
            if(this.$refs.form.validate()){
                const formElement = this.$refs.form.$el
                const formData = new FormData();
                const formElements = formElement.elements;
                const data = {};

                for (let i = 0; i < formElements.length; i++) {
                    const currentElement = formElements[i];
                    console.log(currentElement)
                    if (!['submit', 'file', 'button'].includes(currentElement.type)) {
                        if('radio'.includes(currentElement.type)){
                            if(currentElement.checked)
                                data[currentElement.name] = currentElement.value;
                        }
                        else{
                            data[currentElement.name] = currentElement.value;
                        }

                    } else if (currentElement.type === 'file') {
                        if (currentElement.files.length === 1) {
                            const file = currentElement.files[0];
                            console.log(currentElement.files[0])
                            formData.append(`files.${currentElement.name}`, file, file.name);
                        } else {
                            for (let i = 0; i < currentElement.files.length; i++) {
                                const file = currentElement.files[i];

                                formData.append(`files.${currentElement.name}`, file, file.name);
                            }
                        }
                  }
                }
                formData.append('data', JSON.stringify(data));
                console.log("FormData: " + JSON.stringify(data))
                this.$store.dispatch('users/putEportfolio', { eportfolio: formData, user : this.$store.state.users.user.params })
            }
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },

        fetchData() { 
          axios.get('https://restcountries.eu/rest/v2/all')
            .then((response) => {
              this.paises = response.data.map(a => a.name)
            });
        }
    }
};
</script>