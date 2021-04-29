<template>
    <div>
        <h1>Perfil</h1>
        <div class="perfil">
            <ul v-if="user.params">
                <span>Nome: {{user.params.username}}</span>
                <br/>
                <span>Email: {{user.params.email}}</span>
            </ul>
        </div>
        <h1>Eportfolio</h1>
        <div class="eportfolio">
            <ul v-if="user.params.eportfolios.length">
                <li v-for="eport in user.params.eportfolios" :key="eport.id">
                    <span>Nome: {{eport.nome}}</span>
                     <br/>
                    <span>Género: {{eport.genero}}</span>
                     <br/>
                    <span>Nacionalidade: {{eport.nacionalidade}}</span>
                     <br/>
                    <span>Email: {{eport.email}}</span>
                     <br/>
                    <span>Telemóvel: {{eport.telemovel}}</span>
                     <br/>
                    <span>Profissão: {{eport.profissao}}</span>
                     <br/>
                    <span>Data de Nascimento: {{eport.data_nasc}}</span>
                </li>
            </ul>
            <ul v-else>
                <span>Ainda não tem um Eportfolio criado...</span>
                <!-- <a :href = "$router.resolve('/eportfolio')">Carregar aqui para criar um Eportfolio </a> -->
            </ul>
            <router-link to="/eportfolio" class="btn btn-link">Carregar aqui para criar um Eportfolio</router-link>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        user () {
            return this.$store.state.users.user;
        }
    },

    /*
    beforeRouteEnter (to, from, next) {

        next(vm => vm.setData(err, user))
        this.$store.dispatch('users/getUser', to.params.id)
        console.log(user)
    },
    */

    beforeRouteUpdate (to, from, next) {
        this.user = null
        
        this.init()
        console.log(user)
        next()

    },

    created () {
        this.init();
    },

    methods: {
        init() {
            let href = this.$route.path.split('/');
            console.log(href);
            var user_id;
            if (href.length == 3){
                user_id = href[2];
            }
            this.$store.dispatch('users/getUser', {id:user_id});
        }
    }
}
</script>
