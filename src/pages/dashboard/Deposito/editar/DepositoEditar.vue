<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Deposito } from '@/interfaces/Deposito/Deposito';
import { ROUTES } from '@/router/utils/routes';
import { DepositoIDPatch, DepositoListID } from '@/services/deposito.services';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import FormCard from '@/components/form/FormCard.vue';

export default defineComponent({
  name: 'DepositoEditarPage',

  components: {
    Footer,
    FormCard,
    PageHeader,
  },

  data(vm) {
    return {
      deposito: null as Deposito | null,
      form: {
        corredor: '',
        prateleira: '',
        sessao: '',
        quantidadeMaxima: '',
      },
    };
  },

  mounted() {
    this.buscarDeposito();
  },

  methods: {
    irParaODeposito() {
      if (!this.deposito) return;

      this.$router.push(ROUTES.deposito.ver(this.deposito.id));
    },

    async buscarDeposito() {
      try {
        const id = this.$route.params.id;

        if (typeof id === 'string') {
          const response = await DepositoListID(id);
          this.deposito = response.data;

          this.form.corredor = response.data.corredor;
          this.form.prateleira = response.data.prateleira;
          this.form.sessao = response.data.sessao;
          this.form.quantidadeMaxima = response.data.quantidadeMaxima;
        }
      } catch (error) {
        console.error('Erro ao buscar deposito', error);
      }
    },

    async enviarForm() {
      try {
        const id = this.$route.params.id;
        if (typeof id === 'string') {
          const response = await DepositoIDPatch(id, this.form);
          return response;
        }
      } catch (error) {}
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      :title="`Editar corredor: ${deposito?.corredor}`"
      showBack
      backLabel="Voltar para ver o depósito"
      @back="irParaODeposito"
    />

    <FormCard
      submitLabel="Salvar alterações"
      :disabled="
        !form.corredor ||
        !form.prateleira ||
        !form.sessao ||
        !form.quantidadeMaxima
      "
      @submit="enviarForm"
    >
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.corredor"
          label="Corredor"
          variant="outlined"
          density="compact"
          required
          :rules="[(v) => !!v || 'Corredor é obrigatório']"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.prateleira"
          label="Prateleira"
          variant="outlined"
          density="compact"
          required
          :rules="[(v) => !!v || 'Prateleira é obrigatório']"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.sessao"
          label="Sessão"
          variant="outlined"
          density="compact"
          required
          :rules="[(v) => !!v || 'Sessão é obrigatório']"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.quantidadeMaxima"
          label="Quantidade máxima"
          variant="outlined"
          density="compact"
          required
          :rules="[(v) => !!v || 'Quantidade máxima é obrigatório']"
        />
      </v-col>
    </FormCard>

    <Footer />
  </BaseFormContainer>
</template>
