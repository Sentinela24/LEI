<template>
    <v-app>
        <v-app-bar fixed app dark max-height="70px" clipped-left class="indigo" >
            <v-app-bar-title class="headline text-uppercase"> 
                <span> Gestor CVs </span>
            </v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn flat target="_blank" class="indigo">
                <span> Home </span>
            </v-btn>
            <v-btn flat target="_blank" class="indigo">
                <span> Sobre Nós </span>
            </v-btn>
            <v-btn flat target="_blank" class="indigo">
                <span> Ajuda </span>
            </v-btn>

            <div v-if="current_route != '/login' && current_route != '/home' && current_route != '/register'">
            <v-btn flat to="/home" class="indigo">
                <span> Logout </span>  
            </v-btn>
            </div>
        </v-app-bar>

        <v-main>
                <v-content>
                <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                <router-view></router-view>
                </v-content>
        </v-main>
    </v-app>  
</template>

<script>
import { VApp, VToolbar, VSpacer, VBtn, VAppBar, VContent } from 'vuetify/lib'

export default {
    name: 'app',
    computed: {
        alert () {
            return this.$store.state.alert
        }
        /*
        current_route () {
            return this.$route.path
        }
        */
    },

    data () {
        return {
            current_route : this.$route.path
        }
    },

    watch:{
        $route (to, from){
            // clear alert on location change
            this.$store.dispatch('alert/clear');
            this.current_route = to.path
        }

    },

    components: {
        VApp, 
        VToolbar, 
        VSpacer, 
        VBtn,
        VAppBar,
        VContent
    }
};
</script>