<script lang="ts">
import BaseFormContainer from '@/components/base/BaseFormContainer.vue';
import BaseSnackbar from '@/components/base/BaseSnackbar.vue';
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import { MarcaPost } from '@/services/marca';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import CreateFormCard from '@/components/form/CreateFormCard.vue';

export default defineComponent({
  name: 'MarcaCriarPage',

  components: {
    Footer,
    PageHeader,
    BaseSnackbar,
    CreateFormCard,
  },

  data() {
    return {
       isLoading: false,
      form: {
        nome: '',
        criadoEm: '',
        atualizadoEm: '',
      },

      snackbar: false,
      snackbarTexto: '',
      snackbarTipo: 'success',
    };
  },

  methods: {
    irParaMarca() {
      this.$router.push(ROUTES.marca.list);
    },

    async enviarForm() {
      try {
        this.isLoading = true;
        await MarcaPost({
          nome: this.form.nome.toLocaleLowerCase().trim(),
          criadoEm: new Date().toISOString(),
          atualizadoEm: new Date().toISOString(),
        });

        (this.snackbarTexto = 'Marca criado com sucesso'),
          (this.snackbarTipo = 'success');
        this.snackbar = true;

        setTimeout(() => {
          this.$router.push(ROUTES.marca.list);
        }, 1000);
      } catch (error) {
        console.error('Erro ao criar marca', error);
      } finally{
          this.isLoading = false;
      }
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader title="Criar marca" showBack @back="irParaMarca" />

    <CreateFormCard
      v-if="!isLoading"
      submitLabel="Criar marca"
      :disabled="!form.nome"
      @submit="enviarForm"
    >
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.nome"
          label="Nome"
          variant="outlined"
          required
          :rules="[(v) => !!v || 'Nome é obrigatório']"
        />
      </v-col>
    </CreateFormCard>

        <div v-else class="text-center pa-4">
          <v-progress-circular indeterminate/>
          <p>Carregando marca...</p>
        </div>

    <BaseSnackbar
      v-model="snackbar"
      :texto="snackbarTexto"
      :tipo="snackbarTipo"
    />
  </BaseFormContainer>
</template>
