<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CreateForm',

  props: {
    submitLabel: {
      type: String,
      default: 'Salvar',
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['submit'],

  methods: {
    onSubmit() {
      this.$emit('submit');
    },
  },
});
</script>

<template>
  <v-card variant="outlined">
    <v-card-text>
      <v-form @submit.prevent="onSubmit">
        <v-row>
          <slot />
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" class="text-end">
            <v-btn color="primary" type="submit" :disabled="disabled">
              {{ submitLabel }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
