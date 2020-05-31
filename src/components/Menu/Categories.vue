<template>
  <v-container class="text-left">
    <v-row justify="center">
      <v-col cols="12">
        <v-row align="end">
          <v-col cols="8" class="text-left">
            <h1 class="display-3 font-weight-thin">Categorie</h1>
          </v-col>
          <v-col cols="4">
            <v-row justify="end" class="px-4">
              <v-btn @click="dialog = true">Aggiungi Categoria</v-btn>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-divider id="divider" />
          </v-col>
        </v-row>
        <v-container class="mx-9 mt-9">
          <v-row
            align="center"
            v-for="category in categories"
            :key="category._id"
          >
            <v-col cols="4">
              <h2 class="title">{{ category.name }}</h2>
            </v-col>
            <v-col cols="6">
              <p class="body-2 pa-0 ma-0">{{ category.description }}</p>
            </v-col>
            <v-col cols="2">
              <v-row justify="space-around">
                <v-btn icon @click="edit(category)">
                  <v-icon color="orange lighten-2">edit</v-icon>
                </v-btn>
                <v-btn icon @click="del(category)">
                  <v-icon color="red darken-2">delete</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="headline">Aggiungi Categoria</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Nome della categoria"
                        hint="Es: Menu del Giorno"
                        v-model="form.name"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        label="Descrizione"
                        hint="example of helper text only on focus"
                        rows="2"
                        v-model="form.description"
                        no-resize
                        required
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Chiudi</v-btn>
                <v-btn color="blue darken-1" text @click="save">Salva</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <v-row justify="center">
          <v-dialog v-model="alert" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="headline">Elimina Categoria: {{ form.name }}</span>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Annulla</v-btn>
                <v-btn color="red darken-1" text @click="save">Elimina</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import category from "../../api/menu/category";

const form = {
  name: "",
  description: ""
};

export default {
  name: "Category",
  data() {
    return {
      expanded: [],
      loading: true,
      headers: [
        { text: "Nome", value: "name" },
        { text: "Descrizione", value: "description" },
        { text: "", value: "data-table-expand" }
      ],
      categories: [],
      dialog: false,
      update: false,
      alert: false,
      form: {
        id: 0,
        name: "",
        description: ""
      }
    };
  },
  methods: {
    async fetch() {
      try {
        this.categories = await category.getAll();
        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    },
    async save() {
      try {
        if (this.update) {
          await category.updateOne(
            { name: this.form.name, description: this.form.description },
            this.form._id
          );
          let index = this.categories.findIndex(el => el._id === this.form._id);
          this.categories[index].name = this.form.name;
          this.categories[index].description = this.form.description;
        } else if (this.delete) {
          await category.deleteOne(this.form._id);
          this.categories = this.categories.filter(
            el => el._id !== this.form._id
          );
        } else {
          let newCat = await category.addOne(this.form);
          this.categories.push(newCat);
        }
        this.update = false;
        this.delete = false;
        this.dialog = false;
        this.alert = false;
        this.form = form;
      } catch (e) {
        console.log(e);
      }
    },
    edit(cat) {
      this.form = cat;
      this.update = true;
      this.dialog = true;
    },
    async del(cat) {
      this.alert = true;
      this.form = cat;
      this.delete = true;
    },
    close() {
      this.form = form;
      this.dialog = false;
      this.alert = false;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style scoped></style>
