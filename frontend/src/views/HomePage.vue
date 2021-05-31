<template>
    <v-container fill-height :style="{backgroundImage: 'url(http://localhost:1337/uploads/desktop_2325627_1920_d50af40d6d.jpg)'}" fluid>
        <v-row>
            <v-col md="6" class="ml-auto">
                <v-card class="py-2 px-3" elevation="10" color="rgb(237, 237, 237, 1)"  max-width="510px" >
                    <h1 class="font-weight-normal indigo--text display-3  mt-2"> Gestor Minhopass </h1>
                    <h5 class="mx-1"> O próximo passo na tua carreira </h5>
                    <v-btn class="mx-1 mb-2" to="/login" dark color="indigo">
                                Login
                    </v-btn>
                    <v-btn class="mb-2" to="/register" dark color="indigo" >
                        Registar
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { VCol, VRow, VContainer, VImg, VCard } from 'vuetify/lib'

export default {
    
    components: {
        VCol, 
        VRow, 
        VContainer,
        VImg,
        VCard
    },

    created () {
        // reset login status
        this.$store.dispatch('authentication/logout');
    }
};
</script>
