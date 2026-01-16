<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseFormContainer',
});
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>
