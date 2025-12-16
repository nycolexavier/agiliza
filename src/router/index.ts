import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '@/pages/login/Login.vue';
import Dashboard from '@/pages/dashboard/Dashboard.vue';
import Produtos from '@/pages/dashboard/Produtos.vue/Produtos.vue';
import Fornecedores from '@/pages/dashboard/Fornecedores/Fornecedores.vue';
import Deposito from '@/pages/dashboard/Deposito/Deposito.vue';
import Usuarios from '@/pages/dashboard/Usuarios/Usuarios.vue';
import Lotes from '@/pages/dashboard/Lotes/Lotes.vue';
import UsuarioEditar from '@/pages/dashboard/Usuarios/editar/UsuarioEditar.vue';
import ProdutosEditar from '@/pages/dashboard/Produtos.vue/editar/ProdutosEditar.vue';

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
      name: 'produtos-editar',
      component: ProdutosEditar,
    },
    {
      path: '/dashboard/fornecedores',
      name: 'fornecedores',
      component: Fornecedores,
    },
    {
      path: '/dashboard/deposito',
      name: 'deposito',
      component: Deposito,
    },
    {
      path: '/dashboard/usuarios',
      name: 'usuarios',
      component: Usuarios,
    },
    {
      path: "/usuarios/:id",
      name: "usuario-detalhe",
      component: UsuarioEditar
    },
    {
      path: '/dashboard/lotes',
      name: 'lotes',
      component: Lotes,
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
