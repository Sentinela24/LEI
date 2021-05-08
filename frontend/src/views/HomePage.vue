<template>
    <v-container fill-height fluid>
        <v-row align="center">
            <v-col cols=8>
                <div class="title">
                    <h1 class="blue--text display-3"> Gestor Minhopass </h1>
                    <p class="subheading"> O próximo passo na tua carreira </p>
                    <v-row>
                        <v-col cols=1>
                            <v-btn to="/login" color="primary">
                                Login
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn to="/register" color="primary">
                                Registar
                            </v-btn>
                        </v-col>
                    </v-row>
                </div>
            </v-col>

            <v-col cols=4 class="ml-auto">
                <v-img height="600"
                      src="https://picsum.photos/400/?random"
                      aspect-ratio="1.7"
                    ></v-img>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { VCol, VRow, VContainer, VImg } from 'vuetify/lib'

export default {
    
    components: {
        VCol, 
        VRow, 
        VContainer,
        VImg
    },

    created () {
        // reset login status
        this.$store.dispatch('authentication/logout');
    }
};
</script>

<style>
    div.title {padding-left: 200px; padding-top: 300px;}
    div.h1 { font-size: 100px };
</style>