<template>
  <v-dialog v-model="alert" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Elimina Elemento: {{ item.name }}</span>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close')">
          Annulla
        </v-btn>
        <v-btn color="red darken-1" text @click="$emit('delete-item')">
          Elimina
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Delete",
  props: ["item", "alert"]
};
</script>

<style scoped></style>
