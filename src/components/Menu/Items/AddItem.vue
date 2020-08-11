<template>
  <v-container>
    <h1 class="headline mb-5">Aggiungi Piatto - Bevanda</h1>
    <v-row justify="center">
      <v-col class="text-center" v-if="loading">
        <v-progress-circular indeterminate class="mx-auto" />
      </v-col>
      <v-col v-if="!loading">
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
                <v-col>
                  <v-btn
                    color="green"
                    :dark="!valid"
                    :disabled="valid"
                    style="width: 100%"
                    @click="stepper++"
                  >
                    Avanti
                  </v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content step="2">
              <MediaPicker
                items
                back
                nullselection
                :oldselection="form.image"
                @back="stepper--"
                @selection="selectImg"
              />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MediaPicker from "../../Media/MediaPicker";
import category from "../../../api/menu/category";
import allergen from "../../../api/menu/allergen";
import tag from "../../../api/menu/tag";
import item from "../../../api/menu/item";
export default {
  name: "AddItem",
  components: { MediaPicker },
  data() {
    return {
      stepper: 1,
      form: {
        name: "",
        description: "",
        category: "",
        price: "",
        allergens: null,
        tags: null,
        freezed: false,
        image: null
      },
      categories: null,
      allergens: null,
      tags: null,
      loading: false
    };
  },
  computed: {
    valid() {
      return !this.form.name || !this.form.category || !this.form.price;
    },
    id() {
      return this.$route.params.id;
    }
  },
  async created() {
    this.loading = true;
    await this.fetch();
    this.loading = false;
  },
  methods: {
    async fetch() {
      try {
        this.categories = await category.getAll();
        this.allergens = await allergen.getAll();
        this.tags = await tag.getAll();

        if (this.id) {
          this.form = await item.getOne(this.id);
          console.log(this.form);
        }

        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    },
    async next() {
      if (this.stepper < 2) {
        this.stepper++;
      } else {
        this.loading = true;
        if (this.id) {
          await item.updateOne(this.form, this.id);
        } else {
          await item.addOne(this.form);
        }
        this.loading = false;

        await this.$router.push({ name: "menu-items" });
      }
    },
    selectImg(sel) {
      this.form.image = sel;
      this.next();
    }
  }
};
</script>

<style scoped></style>
