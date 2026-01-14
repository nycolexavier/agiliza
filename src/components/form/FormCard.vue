<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormCard',

  props: {
    submitLabel: {
      type: String,
      default: 'Salvar',
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    showCancel: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['submit', 'cancel'],
});
</script>

<template>
  <v-card variant="outlined">
    <v-card-text>
      <v-form @submit.prevent="$emit('submit')">
        <!-- CAMPOS -->
        <v-row>
          <slot />
        </v-row>

        <!-- AÇÕES -->
        <v-row class="mt-4">
          <v-col cols="12" class="d-flex justify-end gap-4">
            <v-btn
              v-if="showCancel"
              variant="outlined"
              @click="$emit('cancel')"
            >
              Cancelar
            </v-btn>

            <v-btn
              color="primary"
              type="submit"
              :disabled="disabled"
            >
              {{ submitLabel }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
