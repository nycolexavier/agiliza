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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/dashboard/produtos',
      name: 'produtos',
      component: Produtos,
    },
    {
      path: '/dashboard/produtos/:id',
      name: 'produtos-ver',
      component: ProdutosVer,
    },
    {
      path: '/dashboard/produtos/:id/editar',
      name: 'produtos-editar',
      component: ProdutosEditar,
    },
    {
      path: '/dashboard/produtos/new',
      name: 'produtos-new',
      component: ProdutoCriar,
    },
    {
      path: '/dashboard/fornecedores',
      name: 'fornecedores',
      component: Fornecedores,
    },
    {
      path: '/dashboard/fornecedores/:id',
      name: 'fornecedores-ver',
      component: FornecedorVer,
    },
    {
      path: '/dashboard/fornecedores/:id/editar',
      name: 'fornecedores-editar',
      component: FornecedorEditar,
    },
    {
      path: '/dashboard/fornecedores/new',
      name: 'fornecedores-new',
      component: FornecedorCriar,
    },
    {
      path: '/dashboard/deposito',
      name: 'deposito',
      component: Deposito,
    },
    {
      path: '/dashboard/deposito/:id',
      name: 'deposito-ver',
      component: DepositoVer,
    },
    {
      path: '/dashboard/deposito/:id/editar',
      name: 'deposito-editar',
      component: DepositoEditar,
    },
    {
      path: '/dashboard/deposito/new',
      name: 'deposito-criar',
      component: DepositoCriar,
    },
    {
      path: '/dashboard/usuarios',
      name: 'usuarios',
      component: Usuarios,
    },
    {
      path: '/dashboard/usuarios/new',
      name: 'usuarios-criar',
      component: UsuarioCriar,
    },
    {
      path: '/dashboard/usuarios/ver',
      name: 'usuarios-ver',
      component: UsuarioVer,
    },
    {
      path: '/dashboard/usuarios/:id',
      name: 'usuario-detalhe',
      component: UsuarioVer,
    },
    {
      path: '/dashboard/usuarios/:id/editar',
      name: 'usuario-editar',
      component: UsuarioEditar,
    },
    {
      path: '/dashboard/lotes',
      name: 'lotes',
      component: Lotes,
    },
    {
      path: '/dashboard/lotes/:id',
      name: 'lotes-ver',
      component: LotesVer,
    },
    {
      path: '/dashboard/lotes/:id/editar',
      name: 'lotes-editar',
      component: LotesEditar,
    },
    {
      path: '/dashboard/movimentacao',
      name: 'movimentacao',
      component: Movimentacao,
    },
    {
      path: '/dashboard/movimentacao/new',
      name: 'movimentacao-criar',
      component: MovimentacaoCriar,
    },
    {
      path: '/dashboard/movimentacao/:id',
      name: 'movimentacao-ver',
      component: MovimentacaoVer,
    },
    {
      path: '/dashboard/movimentacao/:id/editar',
      name: 'movimentacao-editar',
      component: MovimentacaoEditar,
    },
    {
      path: '/dashboard/marca',
      name: 'marca',
      component: Marca,
    },
    {
      path: '/dashboard/marca/new',
      name: 'marca-criar',
      component: MarcaCriar,
    },
    {
      path: '/dashboard/marca/:id',
      name: 'marca-ver',
      component: MarcaVer,
    },
    {
      path: '/dashboard/relatorio',
      name: 'relatorio',
      component: Relatorio,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

export default router;
