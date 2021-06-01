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
                            <v-toolbar-title><h2>Editar ePortefolio</h2></v-toolbar-title>
                        </v-toolbar>
                        <v-card-title class="mt-n4 mb-n6"><h4>Dados pessoais</h4></v-card-title>
                        <v-divider></v-divider>
                        <v-form ref="form" v-model="valid" lazy-validation class="mx-2 mb-1">
                            <v-text-field v-model="user.params.eportfolios[0].nome" prepend-icon="mdi-account" :counter="30" :rules="nameRules" label="Nome" name="nome" required></v-text-field>
                            <v-text-field v-model="user.params.eportfolios[0].email" prepend-icon="mdi-email"  :rules="emailRules" label="E-mail" name="email" required></v-text-field>
                            <v-file-input prepend-icon="mdi-camera" :rules="fileRules" accept="image/png, image/jpeg, image/bmp" type="file" name="avatar" label="Foto" show-size truncate-length="25" @change="onFileSelected"></v-file-input>
                            <v-radio-group label="Género" v-model="user.params.eportfolios[0].genero" row prepend-icon="mdi-account-group" name="genero">
                                <v-radio label="F"  value="F"></v-radio>
                                <v-radio label="M"  value="M"></v-radio>
                                <v-radio label="Outro"  value="Outro"></v-radio>
                            </v-radio-group>
                            <v-menu v-model="fromDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="user.params.eportfolios[0].data_nasc" label="Data de Nascimento" prepend-icon="mdi-calendar" readonly :value="fromDateDisp" v-on="on" name="data_nasc" required></v-text-field>
                                </template>
                                <v-date-picker locale="pt-pt" :min="minDate" :max="maxDate" v-model="fromDateVal" no-title @input="fromDateMenu = false"></v-date-picker>
                            </v-menu>
                            <v-text-field v-model="user.params.eportfolios[0].telemovel" prepend-icon="mdi-phone" :counter="9" :rules="phoneRules" label="Telefone"  name="telemovel" required></v-text-field>
                            <v-select v-model="user.params.eportfolios[0].nacionalidade" prepend-icon="mdi-flag" :items="paises" :rules="[v => !!v || 'Nacionalidade é requerida']" label="Nacionalidade"  name="nacionalidade" required></v-select>
                            <v-text-field v-model="user.params.eportfolios[0].profissao" prepend-icon="mdi-briefcase" label="Profissão" name="profissao" required></v-text-field>
                            <v-btn :disabled="!valid" color="success" class="mr-4 mb-3" @click="validate">Criar</v-btn>
                            <v-btn color="error" class="mr-4 mb-3" @click="reset">Reset</v-btn>
                        </v-form>
                    </v-card>
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
            maxDate: null,
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

        user () {
            return this.$store.state.users.user;
        }
    },
    
    methods: {
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
                console.log("id:" + this.$store.state.users.user.params.eportfolios[0].id)
                this.$store.dispatch('users/editEportfolio', { eportfolio: formData, user : this.$store.state.users.user.params })
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