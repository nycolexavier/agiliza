import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '@/pages/login/Login.vue';
import Dashboard from '@/pages/dashboard/Dashboard.vue';
import Produtos from '@/pages/dashboard/Produtos/Produtos.vue';
import Fornecedores from '@/pages/dashboard/Fornecedores/Fornecedores.vue';
import Deposito from '@/pages/dashboard/Deposito/Deposito.vue';
import Usuarios from '@/pages/dashboard/Usuarios/Usuarios.vue';
import Lotes from '@/pages/dashboard/Lotes/Lotes.vue';
import FornecedorEditar from '@/pages/dashboard/Fornecedores/editar/FornecedorEditar.vue';
import DepositoEditar from '@/pages/dashboard/Deposito/editar/DepositoEditar.vue';
import LotesEditar from '@/pages/dashboard/Lotes/editar/LotesEditar.vue';
import UsuarioCriar from '@/pages/dashboard/Usuarios/criar/UsuarioCriar.vue';
import UsuarioVer from '@/pages/dashboard/Usuarios/ver/UsuarioVer.vue';
import ProdutosVer from '@/pages/dashboard/Produtos/ver/ProdutosVer.vue';
import FornecedorCriar from '@/pages/dashboard/Fornecedores/criar/FornecedorCriar.vue';
import ProdutoCriar from '@/pages/dashboard/Produtos/criar/ProdutoCriar.vue';

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
      name: 'deposito-editar',
      component: DepositoEditar,
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
      path: '/dashboard/lotes',
      name: 'lotes',
      component: Lotes,
    },
    {
      path: '/dashboard/lotes/:id',
      name: 'lotes-editar',
      component: LotesEditar,
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
