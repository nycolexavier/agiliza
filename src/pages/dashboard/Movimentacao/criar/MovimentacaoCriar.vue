<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MovimentacaoCriarPage',

  components: {
    Footer,
  },

  data() {
    return {
      form: {
        idlote: '',
        tipomovimentacao: '',
        quantidade: '',
        datamovimentacao: '',
        status: 'ativo',
      },

      snackbar: false,
      snackbarTexto: '',
      snackbarCor: 'success',
    };
  },

  methods: {
    irParaMovimentacoes() {
      this.$router.push(ROUTES.movimentacao.list);
    },

    async enviarForm() {
      try {
        await api.post('/movimentacao', {
          idlote: Number(this.form.idlote),
          tipomovimentacao: this.form.tipomovimentacao,
          quantidade: Number(this.form.quantidade),
          datamovimentacao: this.form.datamovimentacao,
          status: this.form.status,
        });

        this.snackbarTexto = 'Movimentação criada com sucesso';
        this.snackbarCor = 'success';
        this.snackbar = true;

        setTimeout(() => {
          this.$router.push(ROUTES.movimentacao.list);
        }, 1000);
      } catch (error) {
        console.error('Erro ao criar movimentação', error);

        this.snackbarTexto = 'Erro ao criar movimentação';
        this.snackbarCor = 'error';
        this.snackbar = true;
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
        <h2>Criar movimentação</h2>
      </v-col>

      <v-col cols="12" md="6" class="text-end">
        <v-btn variant="outlined" @click="irParaMovimentacoes">
          Movimentações
        </v-btn>
      </v-col>
    </v-row>

    <!-- Card do formulário -->
    <v-card variant="outlined">
      <v-card-text>
        <v-form @submit.prevent="enviarForm">
          <v-row>
            <!-- Lote -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.idlote"
                label="ID do Lote"
                type="number"
                required
                :rules="[(v) => !!v || 'Lote é obrigatório']"
              />
            </v-col>

            <!-- Tipo -->
            <v-col cols="12" md="6">
              <v-select
                v-model="form.tipomovimentacao"
                :items="['entrada', 'saida']"
                label="Tipo de movimentação"
                required
                :rules="[(v) => !!v || 'Tipo é obrigatório']"
              />
            </v-col>

            <!-- Quantidade -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.quantidade"
                label="Quantidade"
                type="number"
                required
                :rules="[
                  (v) => !!v || 'Quantidade é obrigatória',
                  (v) => v > 0 || 'Quantidade deve ser maior que zero',
                ]"
              />
            </v-col>

            <!-- Data -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.datamovimentacao"
                label="Data da movimentação"
                type="date"
                required
                :rules="[(v) => !!v || 'Data é obrigatória']"
              />
            </v-col>
          </v-row>

          <!-- Botão -->
          <v-row class="mt-4">
            <v-col cols="12" class="text-end">
              <v-btn
                type="submit"
                color="primary"
                :disabled="
                  !form.idlote ||
                  !form.tipomovimentacao ||
                  !form.quantidade ||
                  !form.datamovimentacao
                "
              >
                Criar movimentação
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <!-- Snackbar -->
    <v-snackbar
      v-model="snackbar"
      :color="snackbarCor"
      timeout="3000"
      location="top right"
    >
      {{ snackbarTexto }}
    </v-snackbar>

    <Footer />
  </BaseFormContainer>
</template>
