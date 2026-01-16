<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseSnackbar',

  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },

    texto: {
      type: String,
      required: true,
    },

    tipo: {
      type: String,
      default: 'success',
    },
  },

  emits: ['update:modelValue'],
});
</script>

<template>
  <v-snackbar
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :color="tipo"
    timeout="3000"
    location="top right"
  >
    {{ texto }}
  </v-snackbar>
</template>
