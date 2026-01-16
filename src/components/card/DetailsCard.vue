<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export interface InfoItem {
  label: string;
  value: string | number | null | undefined;
}

export default defineComponent({
  name: 'DetailsCard',

  props: {
    items: {
      type: Array as PropType<InfoItem[]>,
      required: true,
    },
  },
});
</script>

<template>
  <v-card variant="outlined">
    <v-card-text>
      <v-row>
        <v-col v-for="(item, index) in items" :key="index" cols="12" md="6">
          <strong>{{ item.label }}</strong>
          <div>
            {{ item.value ?? '-' }}
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
