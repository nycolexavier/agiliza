<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseFormActions',

  props: {
    loading: Boolean,
    disabled: Boolean,
  },

  emits: ['submit', 'cancel'],
});
</script>

<template>
  <v-row class="mt-4">
    <v-col cols="12" class="d-flex gap-4">
      <v-btn
        color="primary"
        :loading="loading"
        :disabled="disabled"
        @click="$emit('submit')"
      >
        Salvar
      </v-btn>

      <v-btn variant="outlined" @click="$emit('cancel')"> Voltar </v-btn>
    </v-col>
  </v-row>
</template>
