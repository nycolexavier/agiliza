<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'DateBadge',

  props: {
    date: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const diasParaVencer = computed(() => {
      const hoje = new Date();
      const validade = new Date(props.date);

      const diff = validade.getTime() - hoje.getTime();
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    });

    const cor = computed(() => {
      if (diasParaVencer.value < 20) return 'red';
      if (diasParaVencer.value <= 60) return 'orange';
      return 'green';
    });

    const textoTooltip = computed(() => {
      if (diasParaVencer.value < 20) return 'Produto perto do vencimento';
      if (diasParaVencer.value <= 60) return 'Produto vence em até 2 meses';
      return 'Produto dentro do prazo';
    });

    const dataFormatada = computed(() => {
      return new Date(props.date).toLocaleDateString('pt-BR');
    });

    return {
      cor,
      textoTooltip,
      dataFormatada,
    };
  },
});
</script>

<template>
  <v-tooltip location="top">
    <template #activator="{ props }">
      <v-chip
        v-bind="props"
        :color="cor"
        variant="flat"
        size="small"
      >
        {{ dataFormatada }}
      </v-chip>
    </template>

    <span>{{ textoTooltip }}</span>
  </v-tooltip>
</template>


<style scoped>
.date-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.85rem;
  display: inline-block;
  cursor: help;
}

.vermelho {
  background-color: #fde2e2;
  color: #c62828;
}

.amarelo {
  background-color: #fff4cc;
  color: #b26a00;
}

.verde {
  background-color: #e6f4ea;
  color: #1b5e20;
}
</style>
