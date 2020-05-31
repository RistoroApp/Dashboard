<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col class="text-left">
        <Cropper />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

import Cropper from "../components/Cropper";
export default {
  name: "Home",
  components: { Cropper }
};
</script>

<style scoped>
#divider {
  margin: 20px 0;
}
</style>
