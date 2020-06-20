<template>
  <v-container>
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
  </v-container>
</template>
<script>
import order from "../api/menu/order";

export default {
  data() {
    return {
      orders: []
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
