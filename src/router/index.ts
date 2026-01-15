import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '@/pages/login/Login.vue';
import Dashboard from '@/pages/dashboard/Dashboard.vue';
import Produtos from '@/pages/dashboard/Produtos/Produtos.vue';
import Fornecedores from '@/pages/dashboard/Fornecedores/Fornecedores.vue';
import Deposito from '@/pages/dashboard/Deposito/Deposito.vue';
import Usuarios from '@/pages/dashboard/Usuarios/Usuarios.vue';
import Lotes from '@/pages/dashboard/Lotes/Lotes.vue';
import LotesEditar from '@/pages/dashboard/Lotes/editar/LotesEditar.vue';
import UsuarioCriar from '@/pages/dashboard/Usuarios/criar/UsuarioCriar.vue';
import UsuarioVer from '@/pages/dashboard/Usuarios/ver/UsuarioVer.vue';
import ProdutosVer from '@/pages/dashboard/Produtos/ver/ProdutosVer.vue';
import FornecedorCriar from '@/pages/dashboard/Fornecedores/criar/FornecedorCriar.vue';
import ProdutoCriar from '@/pages/dashboard/Produtos/criar/ProdutoCriar.vue';
import DepositoVer from '@/pages/dashboard/Deposito/ver/DepositoVer.vue';
import DepositoCriar from '@/pages/dashboard/Deposito/criar/DepositoCriar.vue';
import UsuarioEditar from '@/pages/dashboard/Usuarios/ver/editar/UsuarioEditar.vue';
import FornecedorVer from '@/pages/dashboard/Fornecedores/ver/FornecedorVer.vue';
import FornecedorEditar from '@/pages/dashboard/Fornecedores/editar/FornecedorEditar.vue';
import ProdutosEditar from '@/pages/dashboard/Produtos/editar/ProdutosEditar.vue';
import DepositoEditar from '@/pages/dashboard/Deposito/editar/DepositoEditar.vue';
import LotesVer from '@/pages/dashboard/Lotes/ver/LotesVer.vue';
import Movimentacao from '@/pages/dashboard/Movimentacao/Movimentacao.vue';
import Marca from '@/pages/dashboard/Marca/Marca.vue';
import Relatorio from '@/pages/dashboard/Relatorio/Relatorio.vue';
import MarcaCriar from '@/pages/dashboard/Marca/criar/MarcaCriar.vue';
import MarcaVer from '@/pages/dashboard/Marca/ver/MarcaVer.vue';
import MovimentacaoCriar from '@/pages/dashboard/Movimentacao/criar/MovimentacaoCriar.vue';
import MovimentacaoEditar from '@/pages/dashboard/Movimentacao/editar/MovimentacaoEditar.vue';
import MovimentacaoVer from '@/pages/dashboard/Movimentacao/ver/MovimentacaoVer.vue';
import MenuLayout from '@/components/layouts/MenuLayout.vue';
import LotesCriar from '@/pages/dashboard/Lotes/criar/LotesCriar.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    // DASHBOARD (COM MENU)
    {
      path: '/dashboard',
      component: MenuLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard,
        },

        // PRODUTOS
        { path: 'produtos', component: Produtos },
        { path: 'produtos/new', component: ProdutoCriar },
        { path: 'produtos/:id', component: ProdutosVer },
        { path: 'produtos/:id/editar', component: ProdutosEditar },

        // FORNECEDORES
        { path: 'fornecedores', component: Fornecedores },
        { path: 'fornecedores/new', component: FornecedorCriar },
        { path: 'fornecedores/:id', component: FornecedorVer },
        { path: 'fornecedores/:id/editar', component: FornecedorEditar },

        // DEPÓSITO
        { path: 'deposito', component: Deposito },
        { path: 'deposito/new', component: DepositoCriar },
        { path: 'deposito/:id', component: DepositoVer },
        { path: 'deposito/:id/editar', component: DepositoEditar },

        // USUÁRIOS
        { path: 'usuarios', component: Usuarios },
        { path: 'usuarios/new', component: UsuarioCriar },
        { path: 'usuarios/:id', component: UsuarioVer },
        { path: 'usuarios/:id/editar', component: UsuarioEditar },

        // LOTES
        { path: 'lotes', component: Lotes },
        { path: 'lotes/new', component: LotesCriar },
        { path: 'lotes/:id', component: LotesVer },
        { path: 'lotes/:id/editar', component: LotesEditar },

        // MOVIMENTAÇÃO
        { path: 'movimentacao', component: Movimentacao },
        { path: 'movimentacao/new', component: MovimentacaoCriar },
        { path: 'movimentacao/:id', component: MovimentacaoVer },
        { path: 'movimentacao/:id/editar', component: MovimentacaoEditar },

        // MARCA
        { path: 'marca', component: Marca },
        { path: 'marca/new', component: MarcaCriar },
        { path: 'marca/:id', component: MarcaVer },

        // RELATÓRIO
        { path: 'relatorio', component: Relatorio },
      ],
    },
  ],
});

export default router;
