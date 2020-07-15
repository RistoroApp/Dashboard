<template>
  <v-container class="text-left">
    <v-row justify="center">
      <v-col cols="12">
        <v-row align="end">
          <v-col cols="8">
            <v-row align="center">
              <h1 class="display-3 font-weight-thin">Piatti/Bevande</h1>
              <v-btn
                @click="$router.push({ name: 'add-item' })"
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
          <Delete
            v-if="deleting"
            :item="deleting"
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
import item from "../../../api/menu/item";
import category from "../../../api/menu/category";
import allergen from "../../../api/menu/allergen";

import Delete from "../../utils/Delete";
import tag from "../../../api/menu/tag";

export default {
  name: "Items",
  components: { Delete },
  data() {
    return {
      loading: true,
      stepper: 1,
      items: [],
      categories: [],
      ingredients: [],
      allergens: [],
      tags: [],
      deleting: null,
      dialog: false,
      update: false,
      alert: false
    };
  },
  methods: {
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
    async deleteItem() {
      try {
        await item.deleteOne(this.deleting._id);
        this.items = this.items.filter(el => el._id !== this.deleting._id);
        this.deleting = null;
        this.alert = false;
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
      this.$router.push({ name: "edit-item", params: { id: cat._id } });
    },
    async del(el) {
      this.alert = true;
      this.deleting = el;
    },
    close() {
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
