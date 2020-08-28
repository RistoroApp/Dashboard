<template>
  <v-container>
    <v-progress-linear indeterminate v-if="loading" />
    <div v-else>
      <v-row>
        <v-col>
          <h1>Impostazioni</h1>
        </v-col>
        <v-col v-if="changesettings">
          <v-row>
            <v-col cols="8" class="text-right">
              <span class="subtitle-1 text--primary"
                >Impostazioni modificate</span
              >
            </v-col>
            <v-col cols="4">
              <v-btn rounded block dark color="green" @click="save"
                >Salva</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider />
      <v-card
        v-for="setting in settings_visible"
        :key="setting._id"
        class="my-4"
      >
        <v-row align="center" justify="center">
          <v-col cols="3" class="text-center font-weight-bold">
            {{ setting.name }}
          </v-col>
          <v-col cols="9" class="px-6">
            <v-text-field
              v-if="setting.type === 'Number' || setting.type === 'String'"
              :type="setting.type === 'Number' ? 'number' : ''"
              :step="setting.type === 'Number' ? '0.01' : ''"
              v-model="setting.value"
              roudend
              single-line
              @change="change"
            ></v-text-field>
            <v-btn
              v-if="setting.type === 'Image'"
              @click="
                () => {
                  currentSetting = setting;
                  openMedia = true;
                }
              "
              block
              >Cambia immagine</v-btn
            >
            <v-dialog v-model="openMedia" max-width="800">
              <MediaPicker
                generics
                v-if="setting.type === 'Image' && openMedia && currentSetting"
                :oldselection="
                  currentSetting.value ? currentSetting.value : null
                "
                @selection="sel => select_file(sel, currentSetting._id)"
                style="background-color: white"
              />
            </v-dialog>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import setting from "../api/settings/setting";
import MediaPicker from "../components/Media/MediaPicker";

export default {
  name: "Settings",
  components: { MediaPicker },
  data() {
    return {
      loading: false,
      settings: null,
      error: null,
      changesettings: false,
      openMedia: false,
      currentSetting: null
    };
  },
  computed: {
    settings_visible() {
      return this.settings.filter(el => !el.hidden);
    }
  },
  async created() {
    try {
      this.loading = true;
      this.settings = await setting.getAll();
      this.loading = false;
    } catch (e) {
      this.error = e;
      this.loading = false;
      console.log(e);
    }
  },
  methods: {
    change() {
      this.changesettings = true;
      console.log("Change");
    },
    select_file(sel, id) {
      let setting = this.settings.find(el => el._id === id);
      setting.value = sel;
      this.changesettings = true;
      this.openMedia = false;
      this.currentSetting = null;
      console.log(this.settings);
    },
    async save() {
      try {
        this.settings = await setting.updateAll(this.settings);
        this.changesettings = false;
      } catch (e) {
        console.log(e);
      }
    }
  },
  watch: {
    change: (new_change, old_change) => {
      console.log(old_change);
      console.log("Changed items");
    }
  }
};
</script>

<style scoped></style>
