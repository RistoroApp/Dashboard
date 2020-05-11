<template>
  <v-data-table
    hide-default-footer
    :headers="headers"
    :items="loading ? [] : orders"
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
    <template v-slot:item.status="{ item }">
      <v-chip :color="getColor(item.status)">{{ getText(item.status) }}</v-chip>
    </template>
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
        { text: "Stato", value: "status" },
        { text: "", value: "data-table-expand" }
      ]
    };
  },
  computed: {
    orders() {
      return this.$store.state.services;
    }
  },
  methods: {
    async fetch() {
      try {
        await print.getAll();
        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    },
    getColor(status) {
      switch (status) {
        case "pending":
          return "error";
        case "working":
          return "warning";
        case "completed":
          return "success";
      }
    },
    getText(status) {
      switch (status) {
        case "pending":
          return "In Attesa";
        case "working":
          return "In Lavorazione";
        case "completed":
          return "Completato";
      }
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style scoped></style>
