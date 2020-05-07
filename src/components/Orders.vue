<template>
  <v-data-table
    hide-default-footer
    :headers="headers"
    :items="orders"
    :loading="loading"
    :expanded.sync="expanded"
    :single-expand="true"
    item-key="_id"
    show-expand
    class="elevation-2"
  >
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <Files
          :id="item._id"
          :files-id="item.files"
          :status="item.status"
        ></Files>
      </td>
    </template>
    <template v-slot:item.shipping="{ item }">
      <v-icon v-if="item.shipping.ship" color="success">check_circle</v-icon>
      <v-icon v-if="!item.shipping.ship" color="warning">cancel</v-icon>
    </template>
    }
  </v-data-table>
</template>

<script>
import print from "../api/print/print";
import Files from "./Files";

export default {
  name: "Orders",
  components: { Files },
  data() {
    return {
      expanded: [],
      loading: true,
      headers: [
        { text: "Nome", value: "name" },
        { text: "Cognome", value: "surname" },
        { text: "Email", value: "email" },
        { text: "N.Files", value: "nFiles" },
        { text: "Data", value: "createdAt" },
        { text: "Spedizione", value: "shipping" },
        { text: "Stato", value: "status" },
        { text: "", value: "data-table-expand" }
      ],
      orders: []
    };
  },
  methods: {
    async fetch() {
      try {
        await print.getAll();
        this.orders = this.$store.state.services;
        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style scoped></style>
