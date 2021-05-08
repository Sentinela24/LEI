<template>
    <div>
        <v-container fluid >
        <v-row justify="center">
        <v-col cols=4>
        <h2>Criar Eportfolio</h2>
        <form @submit.prevent="handleSubmit">
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
        </form>
        </v-col>
        </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { VContainer, VRow, VCol, VLayout } from 'vuetify/lib'

export default {
     components: {
        VContainer,
        VRow,
        VCol,
        VLayout,
    },

    data () {
        return {
            eportfolio: {
                id : '',
                nome: '',
                genero: '',
                nacionalidade: '',
                email: '',
                telemovel: '',
                profissao: '',
                avatar: null
            },
            submitted: false
        }
    },

    computed: { 
        ...mapState('authentication', ['status'])
    },
    
    methods: {
        handleSubmit(e) {
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

                    this.$store.dispatch('users/putEportfolio', { eportfolio: formData, user : this.$store.state.authentication.user.user })
                }
            });
        },

        onFileSelected(e) {
            this.eportfolio.avatar = e.target.files[0]
        }
    }
};
</script>