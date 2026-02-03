<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  name: 'BaseTable',

  props: {
    headers: {
      type: Array as PropType<{ title: string; key: string }[]>,
      required: true,
    },
    items: {
      type: Array as PropType<any[]>,
      required: true,
    },
    actionLabel: {
      type: String,
      default: 'Ver',
    },
  },

  emits: ['action'],
});
</script>

<template>
  <v-card variant="outlined">
   <v-data-table :headers="headers" :items="items" hide-default-footer>
      
      <template
        v-for="(_, slotName) in $slots"
        #[slotName]="slotProps"
      >
        <slot :name="slotName" v-bind="slotProps" />
      </template>

      <template #item.actions="{ item }">
        <v-btn size="small" variant="outlined" @click="$emit('action', item)">
          {{ actionLabel }}
        </v-btn>
      </template>

      <template #no-data> Nenhum registro encontrado </template>
    </v-data-table>
  </v-card>
</template>
