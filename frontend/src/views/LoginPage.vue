<template>
    <div>
        <v-container fluid >
        <v-row justify="center">
        <v-col cols=4>
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="identifier">Utilizador</label>
                <input type="text" v-model="identifier" name="identifier" class="form-control" :class="{ 'is-invalid': submitted && !identifier }" />
                <div v-show="submitted && !identifier" class="invalid-feedback">identifier is required</div>
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="loggingIn">Login</button>
                <img v-show="loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                <router-link to="/home" class="btn btn-link">Cancelar</router-link>
            </div>
        </form>
        </v-col>
        </v-row>
        </v-container> 
    </div>
</template>

<script>
import { VContainer, VRow, VCol, VLayout } from 'vuetify/lib'

export default {
    components : {
        VContainer,
        VRow,
        VCol,
        VLayout
    },

    data () {
        return {
            identifier: '',
            password: '',
            submitted: false
        }
    },
    computed: {
        loggingIn () {
            return this.$store.state.authentication.status.loggingIn;
        },
    },

    methods: {
        async handleSubmit() {
            this.submitted = true;
            const { identifier, password } = this;
            if (identifier && password) {
                await this.$store.dispatch('authentication/login', { identifier, password });
                await this.$store.dispatch('users/getUser', {id : this.$store.state.authentication.user.user.id});
                if(this.$store.state.users.user.params.eportfolios.length)
                                this.$router.push('/eportfolio')
                                    .catch((erro) => {console.log(erro)});
                            else
                                this.$router.push('/criar')
                                    .catch((erro) => {console.log(erro)});
                            
            }
        }
    }
};
</script>