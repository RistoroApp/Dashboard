<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <h1 class="display-1">Ordini</h1>
        <h2 class="h4 font-italic font-weight-light" v-if="orders.length === 0">
          Nessun ordine
        </h2>
        <v-card
          v-for="order in orders"
          :key="order._id"
          :color="getColor(order)"
          class="my-3"
        >
          <v-row no-gutters align="center" justify="center">
            <v-col cols="10" class="text--white">
              <v-card-text class="text--white"
                >Ordine al tavolo: {{ order.table }} - Numero chiamate:
                {{ order.n_call }}
              </v-card-text>
            </v-col>
            <v-col cols="2">
              <v-btn color="white" @click="complete(order._id)">
                Completa
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4">
        <h1 class="display-1">Gestisci il tuo menu</h1>
        <div v-for="link in links" :key="link.link">
          <v-divider v-if="link.text === 'spacer'" class="my-8"></v-divider>
          <v-card v-else link hover :to="{ name: link.link }" class="my-4">
            <v-card-title class="body-2">
              {{ link.text }}
            </v-card-title>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import order from "../api/menu/order";

export default {
  data() {
    return {
      orders: [],
      links: [
        {
          text: "Aggiungi/modifica piatti e bevande",
          link: "menu-items"
        },
        {
          text: "Aggiungi/modifica categorie",
          link: "menu-categories"
        },
        {
          text: "Aggiungi/modifica tag",
          link: "menu-tags"
        },
        {
          text: "Aggiungi/modifica allergeni",
          link: "menu-allergens"
        },
        {
          text: "spacer"
        },
        {
          text: "Gestisci Media",
          link: "media"
        },
        {
          text: "spacer"
        },
        {
          text: "Gestisci impostazioni",
          link: "settings"
        }
      ]
    };
  },
  methods: {
    async fetch() {
      try {
        this.orders = await order.getAll();
      } catch (e) {
        console.log(e);
      }
    },
    getColor(order) {
      switch (order.status) {
        case "new_call":
        case "new":
          return "green";
      }
    },
    async complete(id) {
      try {
        this.orders = await order.complete(id);
      } catch (e) {
        console.log(e);
      }
    }
  },
  created() {
    this.fetch();

    setInterval(
      function() {
        this.fetch();
      }.bind(this),
      10000
    );
  }
};
</script>
