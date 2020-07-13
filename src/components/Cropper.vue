<template>
  <v-row>
    <v-col cols="12">
      <v-file-input v-model="selectedFile" @change="setupCropper" />
    </v-col>
    <v-row v-if="objectUrl">
      <v-col cols="6">
        <img ref="source" :src="objectUrl" style="max-width: 100%" />
      </v-col>
      <v-col cols="6" class="pa-8">
        <v-card
          link
          @click="nav(item.slug_name)"
          style="border-radius: 20px"
          class="py-2 item"
          elevation="4"
        >
          <v-row align="center" justify="center" no-gutters class="pa-4">
            <v-col cols="auto" class="text-center px-2">
              <v-progress-circular indeterminate v-if="loading" />
              <v-img
                class="elevation-5 mx-auto"
                :src="previewCropped"
                v-if="!loading"
                max-height="70"
                max-width="70"
                style="border-radius: 50%"
              />
            </v-col>
            <v-col>
              <h2 class="title font-weight-regular px-4">
                Anteprima
              </h2>
              <p class="px-4 font-italic font-weight-light ma-0 subtitle-1">
                Test L'immagine ritagliata viene utilizzata per una migliore
                visualizzazione dei piatti nella lista Menu
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
import debounce from "lodash/debounce";
import Cropper from "cropperjs";

export default {
  name: "Cropper",
  data() {
    return {
      cropper: null,
      objectUrl: null,
      previewCropped: null,
      selectedFile: null,
      loading: false,
      debouncedUpdatePreview: debounce(this.updatePreview, 100)
    };
  },
  methods: {
    confirm() {
      this.cropper?.getCroppedCanvas().toBlob(blob => {
        this.$emit("confirm", blob, this.selectedFile);
      });
    },
    setupCropper(selectedFile) {
      this.loading = true;
      if (this.cropper) {
        this.cropper.destroy();
      }

      if (this.objectUrl) {
        window.URL.revokeObjectURL(this.objectUrl);
      }

      if (!selectedFile) {
        this.cropper = null;
        this.objectUrl = null;
        this.previewCropped = null;
        return;
      }

      this.objectUrl = window.URL.createObjectURL(selectedFile);
      this.$nextTick(this.setupCropperInstance);
    },
    setupCropperInstance() {
      this.cropper = new Cropper(this.$refs.source, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: "none",
        ready: this.cropend,
        cropend: this.cropend,
        cropstart: this.cropstart,
        movable: false,
        scalable: false,
        zoomable: false
      });
    },
    cropstart() {
      this.$emit("loading", true);
      console.log("Cropping Started");
      this.loading = true;
    },
    cropend() {
      this.updatePreview();

      this.loading = false;

      this.cropper?.getCroppedCanvas().toBlob(blob => {
        this.$emit("confirm", blob, this.selectedFile);
      });
      this.$emit("loading", false);
    },
    async updatePreview() {
      const canvas = this.cropper.getCroppedCanvas();
      this.previewCropped = canvas.toDataURL("image/png");
      console.log("Preview updated");
    }
  }
};
</script>

<style scoped></style>
