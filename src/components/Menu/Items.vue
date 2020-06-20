<template>
  <v-container class="text-left">
    <v-row justify="center">
      <v-col cols="12">
        <v-row align="end">
          <v-col cols="8" class="text-left">
            <h1 class="display-3 font-weight-thin">Elementi</h1>
          </v-col>
          <v-col cols="4">
            <v-row justify="end" class="px-4">
              <v-btn @click="dialog = true">Aggiungi Elemento</v-btn>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-divider id="divider" />
          </v-col>
        </v-row>
        <v-container class="mx-9 mt-9">
          <v-row align="center" v-for="element in items" :key="element._id">
            <v-col cols="3">
              <h2 class="title">{{ element.name }}</h2>
            </v-col>
            <v-col cols="6">
              <p class="body-2 pa-0 ma-0">
                {{
                  element.description.length > 150
                    ? element.description.substring(0, 100) + "..."
                    : element.description
                }}
              </p>
            </v-col>
            <v-col cols="1">
              <p class="body-2 pa-0 ma-0 font-weight-bold">
                {{ element.price.toFixed(2) }} €
              </p>
            </v-col>
            <v-col cols="2">
              <v-row justify="space-around">
                <v-btn icon @click="edit(element)">
                  <v-icon color="orange lighten-2">edit</v-icon>
                </v-btn>
                <v-btn icon @click="del(element)">
                  <v-icon color="red darken-2">delete</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card class="text-left">
              <v-card-title>
                <span class="headline">Aggiungi Elemento</span>
              </v-card-title>
              <v-card-text>
                <v-stepper v-model="stepper">
                  <v-stepper-header>
                    <v-stepper-step :complete="stepper > 1" step="1">
                      Dati
                    </v-stepper-step>
                    <v-divider />
                    <v-stepper-step step="2">Immagine</v-stepper-step>
                  </v-stepper-header>
                  <v-stepper-items>
                    <v-stepper-content step="1">
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="Nome dell'elemento"
                            hint="Es: Pasta al Pomodoro"
                            v-model="form.name"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-textarea
                            label="Descrizione"
                            hint=""
                            rows="3"
                            v-model="form.description"
                            no-resize
                            required
                          ></v-textarea>
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            label="Prezzo"
                            hint="10.00"
                            v-model="form.price"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="8">
                          <v-select
                            v-model="form.category"
                            :items="categories"
                            label="Categoria"
                            item-text="name"
                            item-value="_id"
                            class="text-left"
                          ></v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-select
                            v-model="form.allergens"
                            :items="allergens"
                            label="Allergeni"
                            item-text="name"
                            item-value="_id"
                            class="text-left"
                            multiple
                          ></v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-select
                            v-model="form.tags"
                            :items="tags"
                            label="Tag"
                            item-text="name"
                            item-value="_id"
                            class="text-left"
                            multiple
                          ></v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-checkbox
                            v-model="form.freezed"
                            label="Prodotto surgelato"
                          />
                        </v-col>
                      </v-row>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                      <Cropper v-if="!update" @confirm="confirm" />
                      <div></div>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Chiudi</v-btn>
                <v-btn color="blue darken-1" text @click="next">Avanti</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <v-row justify="center">
          <Delete
            :item="form"
            :alert="alert"
            @close="close"
            v-on:delete-item="deleteItem()"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import item from "../../api/menu/item";
import category from "../../api/menu/category";
import allergen from "../../api/menu/allergen";

import Cropper from "../Cropper";
import Delete from "../utils/Delete";
import tag from "../../api/menu/tag";

const form = {
  name: "",
  description: "",
  category: "",
  avatar: null,
  image: null,
  price: 0,
  freezed: false,
  allergen: null,
  tag: null
};

export default {
  name: "Items",
  components: { Delete, Cropper },
  data() {
    return {
      loading: true,
      stepper: 1,
      items: [],
      categories: [],
      ingredients: [],
      allergens: [],
      tags: [],
      dialog: false,
      update: false,
      alert: false,
      form: form
    };
  },
  computed: {
    cutted_description() {
      if (this.description.length > 150) {
        return this.description.substring(0, 150) + "...";
      } else {
        return this.description;
      }
    }
  },
  methods: {
    confirm(blob, file) {
      this.form.avatar = blob;
      this.form.image = file;
      console.log("Confirmed Image");
    },
    async fetch() {
      try {
        this.items = await item.getAll();
        this.categories = await category.getAll();
        this.allergens = await allergen.getAll();
        this.tags = await tag.getAll();

        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    },
    async save() {
      try {
        if (this.update) {
          console.log(this.form);
          let data = {};
          for (let key of Object.keys(this.form)) {
            console.log(this.form[key]);
            if (this.form[key]) {
              data[key] = this.form[key];
            }
          }

          console.log(data);

          await item.updateOne(data, this.form._id);

          let index = this.items.findIndex(el => el._id === this.form._id);

          this.items[index] = { ...this.items[index], data };
        } else {
          let newItem = await item.addOne(this.form);
          this.items.push(newItem);
        }
        this.update = false;
        this.dialog = false;
        this.alert = false;
        this.form = form;
      } catch (e) {
        console.log(e);
      }
    },
    async deleteItem() {
      try {
        await item.deleteOne(this.form._id);
        this.items = this.items.filter(el => el._id !== this.form._id);
        this.alert = false;
        this.form = form;
      } catch (e) {
        console.log(e);
      }
    },
    next() {
      if (this.stepper < 2) {
        this.stepper++;
      } else {
        this.save();
      }
    },
    edit(cat) {
      this.form = cat;
      this.update = true;
      this.dialog = true;
      this.stepper = 1;
    },
    async del(cat) {
      this.alert = true;
      this.form = cat;
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
