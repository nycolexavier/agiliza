<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { DepositoPost } from '@/services/deposito.services';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';

export default defineComponent({
  name: 'DepositoCriarPage',

  components: {
    Footer,
    PageHeader,
  },

  data() {
    return {
      form: {
        corredor: '',
        prateleira: '',
        sessao: '',
        quantidadeMaxima: '',
      },

      snackbar: false,
      snackbarTexto: '',
      snackbarCor: 'success',
    };
  },

  methods: {
    irParaODeposito() {
      this.$router.push(ROUTES.deposito.list);
    },

    async enviarForm() {
      try {
        const response = await DepositoPost(this.form);

        (this.snackbarTexto = 'Depósito criado com sucesso'),
          (this.snackbarCor = 'success');
        this.snackbar = true;

        setTimeout(() => {
          this.$router.push(ROUTES.deposito.list);
        }, 1000);
      } catch (error) {
        console.error('Erro ao criar um depósito');
      }
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      title="Criar depósito"
      showBack
      backLabel="Voltar para depósitos"
      @back="irParaODeposito"
    />

    <!-- Card do formulário -->
    <v-card variant="outlined">
      <v-card-text>
        <v-form @submit.prevent="enviarForm">
          <v-row>
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

            <!-- Botões -->
            <v-col cols="12" class="text-end">
              <v-btn
                color="primary"
                type="submit"
                :disabled="
                  !form.corredor ||
                  !form.prateleira ||
                  !form.sessao ||
                  !form.quantidadeMaxima
                "
              >
                Criar depósito
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <Footer />

    <v-snackbar
      v-model="snackbar"
      :color="snackbarCor"
      timeout="3000"
      location="top right"
    >
      {{ snackbarTexto }}
    </v-snackbar>
  </BaseFormContainer>
</template>
