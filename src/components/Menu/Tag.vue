<template>
  <v-container class="text-left">
    <v-row justify="center">
      <v-col cols="12">
        <v-row align="end">
          <v-col cols="8">
            <v-row align="center">
              <h1 class="display-3 font-weight-thin">Tag</h1>
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
          <v-row align="center" v-for="tag in tags" :key="tag._id">
            <v-col cols="4">
              <h2 class="title">{{ tag.name }}</h2>
            </v-col>
            <v-col cols="6">
              <p class="body-2 pa-0 ma-0">{{ tag.description }}</p>
            </v-col>
            <v-col cols="2">
              <v-row justify="space-around">
                <v-btn icon @click="edit(tag)">
                  <v-icon color="orange lighten-2">edit</v-icon>
                </v-btn>
                <v-btn icon @click="del(tag)">
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
                <span class="headline">Aggiungi Ingrediente</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Nome dell'tag"
                        hint="Es: Biologico"
                        v-model="form.name"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        label="Descrizione"
                        rows="2"
                        v-model="form.description"
                        no-resize
                        required
                      ></v-textarea>
                    </v-col>
                    <v-col>
                      <v-select
                        v-model="form.color"
                        :items="colors"
                        item-value="_id"
                        label="Colore"
                        return-object
                      >
                        <template v-slot:item="{ item }">
                          <v-row justify="start">
                            <v-col cols="3">
                              <span>{{ item.id }}: </span>
                            </v-col>
                            <v-col cols="5">
                              <v-chip
                                :color="item.background"
                                :text-color="item.text"
                              >
                                {{ form.name ? form.name : "Tag" }}
                              </v-chip>
                            </v-col>
                          </v-row>
                        </template>
                        <template v-slot:selection="{ item }">
                          <v-chip
                            :color="item.background"
                            :text-color="item.text"
                          >
                            {{ form.name ? form.name : "Tag" }}
                          </v-chip>
                        </template>
                      </v-select>
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
                <span class="headline"
                  >Elimina Ingrediente: {{ form.name }}</span
                >
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
import tag from "../../api/menu/tag";
import setting from "../../api/settings/setting";

const form = {
  id: 0,
  name: "",
  description: "",
  color: ""
};

export default {
  name: "Category",
  data() {
    return {
      loading: true,
      tags: [],
      dialog: false,
      update: false,
      alert: false,
      colors: [],
      form: {
        id: 0,
        name: "",
        description: "",
        color: ""
      }
    };
  },
  methods: {
    async fetch() {
      try {
        this.tags = await tag.getAll();
        let col = await setting.getTheme();
        this.colors = col.colors.tags;
        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    },
    async save() {
      try {
        if (this.update) {
          await tag.updateOne(
            {
              name: this.form.name,
              description: this.form.description,
              color: this.form.color
            },
            this.form._id
          );
          let index = this.tags.findIndex(el => el._id === this.form._id);
          this.tags[index].name = this.form.name;
          this.tags[index].description = this.form.description;
        } else if (this.delete) {
          await tag.deleteOne(this.form._id);
          this.tags = this.tags.filter(el => el._id !== this.form._id);
        } else {
          let newCat = await tag.addOne(this.form);
          this.tags.push(newCat);
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
