<template>
  <v-container class="fill-height">
    <v-navigation-drawer v-model="drawer" app>
      <v-list class="text-left" dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
              :to="{ name: child.link }"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" link :to="{ name: item.link }">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Dashboard</v-toolbar-title>
    </v-app-bar>

    <v-row justify="center" class="fill-height">
      <v-col class="text-left">
        <router-view />
      </v-col>
    </v-row>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: "expand_less",
          "icon-alt": "expand_more",
          text: "Menu",
          model: false,
          children: [
            {
              icon: "category",
              text: "Categorie",
              link: "menu-categories"
            },
            {
              icon: "build",
              text: "Tags",
              link: "menu-tags"
            },
            {
              icon: "build",
              text: "Allergeni",
              link: "menu-allergens"
            },
            {
              icon: "build",
              text: "Elementi",
              link: "menu-items"
            }
          ]
        },
        {
          icon: "settings",
          text: "Impostazioni",
          link: "settings",
        }
      ]
    };
  }
};
</script>

<style scoped>
#divider {
  margin: 20px 0;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
