<template>
    <v-app>
        <v-toolbar fixed app dark max-height="70px">
            <v-toolbar-title class="headline text-uppercase"> 
                <span> Gestor CVs </span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn flat target="_blank">
                <span> ePortefolio </span>
            </v-btn>
            <v-btn flat target="_blank">
                <span> Sobre Nós </span>
            </v-btn>
            <v-btn flat target="_blank">
                <span> Ajuda </span>
            </v-btn>   
            <v-btn flat href = "https://github.com" target="_blank">
                <span class="mr-2"> Latest realese </span>  
            </v-btn>
        </v-toolbar>

        <v-content>
            <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
            <router-view></router-view>
        </v-content>
    </v-app>  
</template>

<script>
 import { VApp, VToolbar, VSpacer, VBtn } from 'vuetify/lib'

export default {
    name: 'app',
    computed: {
        alert () {
            return this.$store.state.alert
        }
    },
    watch:{
        $route (to, from){
            // clear alert on location change
            this.$store.dispatch('alert/clear');
        }
    },

    components: {
        VApp, 
        VToolbar, 
        VSpacer, 
        VBtn
    }
};
</script>