<template>
  <div>
    <v-progress-linear
      :indeterminate="true"
      v-show="loading"
    ></v-progress-linear>
    <v-simple-table v-show="!loading" id="table">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Nome File</th>
            <th class="text-left">Numero Copie</th>
            <th class="text-left">Fronte/Retro</th>
            <th class="text-left">Bianco/Nero</th>
            <th class="text-left">Note</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in files"
            :key="item._id"
            @click="download(item._id, item.file)"
          >
            <td>{{ item.file }}</td>
            <td>{{ item.properties.n_copies }}</td>
            <td>{{ item.properties.fr ? "Si" : "No" }}</td>
            <td>{{ item.properties.bw ? "Si" : "No" }}</td>
            <td>{{ item.properties.notes }}</td>
          </tr>
        </tbody>
      </template> </v-simple-table
    ><v-row justify="center" style="margin: 20px">
      <v-btn
        color="warning"
        class="mx-4"
        @click="setStatus('working')"
        :disabled="status === 'working' || status === 'completed'"
        >In Lavorazione</v-btn
      >
      <v-btn
        color="success"
        class="mx-4"
        @click="setStatus('completed')"
        :disabled="status === 'completed'"
        >Completato</v-btn
      >
    </v-row>
  </div>
</template>

<script>
import api from "../api/print/print";
export default {
  name: "Files",
  props: ["id", "filesId", "status"],
  data() {
    return {
      loading: true,
      files: [],
      error: null
    };
  },
  methods: {
    async fetch() {
      this.files = [];
      this.loading = true;

      for (let file of this.filesId) {
        try {
          let data = await api.getFile(file);
          this.files.push(data);
        } catch (e) {
          this.error = e;
          console.log(e);
        }
      }
      this.loading = false;
    },
    async download(id, name) {
      try {
        let res = await api.downloadFile(id);
        const link = document.createElement("a");
        link.href = res;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
      } catch (e) {
        console.log(e);
        this.error = e;
      }
    },
    async setStatus(status) {
      try {
        await api.setStatus(this.id, status);
      } catch (e) {
        console.log(e);
      }
    }
  },
  watch: {
    filesId: function() {
      this.fetch();
    }
  },
  beforeMount() {
    console.log("Component Mounted");
    this.fetch();
  },
  beforeDestroy() {
    this.files = [];
    this.loading = true;
  }
};
</script>

<style scoped>
#table {
  margin: 20px;
}
</style>
