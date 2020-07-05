<template>
  <v-container class="text-left">
    <v-row justify="center">
      <v-col cols="12">
        <v-row align="end">
          <v-col cols="8">
            <v-row align="center">
              <h1 class="display-3 font-weight-thin">Allergeni</h1>
              <v-btn
                @click="dialog = true"
                text
                class="mt-2 ml-2"
                color="primary"
                small
                ><v-icon>add_circle</v-icon>Aggiungi</v-btn
              >
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
            v-for="ingredient in allergens"
            :key="ingredient._id"
          >
            <v-col cols="4">
              <h2 class="title">{{ ingredient.name }}</h2>
            </v-col>
            <v-col cols="6">
              <p class="body-2 pa-0 ma-0">{{ ingredient.description }}</p>
            </v-col>
            <v-col cols="2">
              <v-row justify="space-around">
                <v-btn icon @click="edit(ingredient)">
                  <v-icon color="orange lighten-2">edit</v-icon>
                </v-btn>
                <v-btn icon @click="del(ingredient)">
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
                <span class="headline">Aggiungi Allergene</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Nome dell'allergene"
                        hint="Es: Senza Glutine"
                        v-model="form.name"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        label="Descrizione"
                        hint="In questo prodotto non è presente alcuna traccia di glutine."
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
                <span class="headline">Elimina Allergene: {{ form.name }}</span>
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
import allergen from "../../api/menu/allergen";

const form = {
  name: "",
  description: ""
};

export default {
  name: "Allergen",
  data() {
    return {
      expanded: [],
      loading: true,
      headers: [
        { text: "Nome", value: "name" },
        { text: "Descrizione", value: "description" },
        { text: "", value: "data-table-expand" }
      ],
      allergens: [],
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
        this.allergens = await allergen.getAll();
        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    },
    async save() {
      try {
        if (this.update) {
          await allergen.updateOne(
            { name: this.form.name, description: this.form.description },
            this.form._id
          );
          let index = this.allergens.findIndex(el => el._id === this.form._id);
          this.allergens[index].name = this.form.name;
          this.allergens[index].description = this.form.description;
        } else if (this.delete) {
          await allergen.deleteOne(this.form._id);
          this.allergens = this.allergens.filter(
            el => el._id !== this.form._id
          );
        } else {
          let newCat = await allergen.addOne(this.form);
          this.allergens.push(newCat);
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
