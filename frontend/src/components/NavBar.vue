<template>
    <v-card>
    <v-navigation-drawer app clipped
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    >
      <v-list-item class="px-2">
        <v-list-item-avatar v-if="user.params.eportfolios.length">
            <v-img :src="image"></v-img>
        </v-list-item-avatar>

        <v-list-item-avatar v-else>          
            <v-img src="http://localhost:1337/uploads/default_02de446a72.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title v-if="user.params.eportfolios.length">
            {{ user.params.eportfolios[0].nome }}
        </v-list-item-title>

        <v-list-item-title v-else>
            Utilizador
        </v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>    
</template>


<script>
import { VList, VIcon, VListItem, VListItemTitle, VCard, VNavigationDrawer, VListItemAvatar, VImg, VDivider, VListItemContent, VListItemIcon} from 'vuetify/lib'

export default {
    components: {
        VList,
        VIcon,
        VListItem,
        VListItemTitle,
        VCard, 
        VNavigationDrawer,
        VListItemAvatar, 
        VImg,
        VDivider, 
        VListItemContent, 
        VListItemIcon
    },
    
    computed: {
        user () {
            return this.$store.state.users.user;
        },

        image : function () {
            return this.user.params.eportfolios[0].avatar.url.split('/uploads/').join(`${this.strapi_url}/uploads/`);
            //return 'http://localhost:1337/uploads/5859205_0_d076e0d6a8.jpg'
        }
    },

    data () {
      return {
        drawer: true,
        items: [
          { title: 'Feed', icon: 'mdi-home-city' },
          { title: 'Biblioteca', icon: 'mdi-account' },
          { title: 'ePortefolio', icon: 'mdi-account-multiple' },
        ],
        mini: true,
        strapi_url: 'http://localhost:1337'
      }
    }
}
</script>   
