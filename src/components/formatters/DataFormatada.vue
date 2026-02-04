<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'DataFormatada',

  props: {
    value: {
      type: [String, Date],
      required: true,
    },
  },

  setup(props) {
    const dataFormatada = computed(() => {
      if (!props.value) return '-';

      const data = new Date(props.value);

      if (isNaN(data.getTime())) return '-';

      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();

      return `${dia}/${mes}/${ano}`;
    });

    return { dataFormatada };
  },
});
</script>

<template>
  <span>{{ dataFormatada }}</span>
</template>
