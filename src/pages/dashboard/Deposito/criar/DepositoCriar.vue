<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DepositoCriarPage',

  components: {
    Footer,
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
        const response = await api.post(`/deposito`, {
          corredor: this.form.corredor,
          prateleira: this.form.prateleira,
          sessao: this.form.sessao,
          quantidadeMaxima: this.form.quantidadeMaxima,
        });

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
    <!-- Cabeçalho -->
    <v-row align="center" class="mb-4">
      <v-col cols="12" md="6">
        <h2>Criar depósito</h2>
      </v-col>

      <v-col cols="12" md="6" class="text-end">
        <v-btn variant="outlined" @click="irParaODeposito">
          Voltar para depósitos
        </v-btn>
      </v-col>
    </v-row>

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
