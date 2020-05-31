<template>
  <v-row>
    <v-col cols="12">
      <v-file-input v-model="selectedFile" @change="setupCropper" />
    </v-col>
    <v-row v-if="objectUrl">
      <v-col cols="12">
        <img ref="source" :src="objectUrl" style="max-width: 100%" />
      </v-col>
      <v-col cols="12" class="pa-8">
        <v-card link>
          <v-row align="center" justify="center">
            <v-col cols="2" class="text-center">
              <img
                class="image"
                :src="previewCropped"
                style="max-width: 100%; border-radius: 50%"
              />
            </v-col>
            <v-col cols="7">
              <v-card-title>Test</v-card-title>
            </v-col>
            <v-col cols="2"> </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col class="pa-8">
        <v-btn @click="confirm">Conferma</v-btn>
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
      debouncedUpdatePreview: debounce(this.updatePreview, 257)
    };
  },
  methods: {
    resetCropper() {
      this.cropper.reset();
    },
    confirm() {
      this.cropper?.getCroppedCanvas().toBlob(blob => {
        this.$emit("confirm", blob, this.selectedFile);
      });
    },
    setupCropper(selectedFile) {
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
        crop: this.debouncedUpdatePreview,
        movable: false
      });
    },
    updatePreview() {
      const canvas = this.cropper.getCroppedCanvas();
      this.previewCropped = canvas.toDataURL("image/png");
    }
  }
};
</script>

<style scoped></style>
