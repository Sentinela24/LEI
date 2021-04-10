<template>
    <div>
        <h1>Perfil</h1>
        <div class="perfil">
            <ul v-if="user.params">
                <span>Nome: {{user.params.username}}</span>
                <span>Email: {{user.params.email}}</span>
            </ul>
        </div>
        <h1>Eportfolio</h1>
        <div class="eportfolio">
            <ul v-if="user.params.eportfolio">
                <span>Nome: {{user.params.eportfolio.nome}}</span>
                <span>Género: {{user.params.eportfolio.genero}}</span>
                <span>Nacionalidade: {{user.params.eportfolio.nacionalidade}}</span>
                <span>Email: {{user.params.eportfolio.email}}</span>
                <span>Telemóvel: {{user.params.eportfolio.telemovel}}</span>
                <span>Profissão: {{user.params.eportfolio.profissao}}</span>
            </ul>
            <ul v-else>
                <span>Ainda não tem um Eportfolio criado...</span>
                <!-- <a :href = "$router.resolve('/eportfolio')">Carregar aqui para criar um Eportfolio </a> -->
                <router-link to="/eportfolio" class="btn btn-link">Carregar aqui para criar um Eportfolio</router-link>
            </ul>
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
    created () {
        let href = this.$route.path.split('/');
        console.log(href);
        var user_id;
        if (href.length == 3){
            user_id = href[2];
        }
        this.$store.dispatch('users/getUser', {id:user_id});
    }
}
</script>
