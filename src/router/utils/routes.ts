export const ROUTES = {
  dashboard: '/dashboard',

  fornecedores: {
    list: '/dashboard/fornecedores',
    new: '/dashboard/fornecedores/new',
    ver: (id: number) => `/dashboard/fornecedores/${id}`,
    editar: (id: number) => `/dashboard/fornecedores/${id}/editar`,
  },

  produtos: {
    list: '/dashboard/produtos',
    new: '/dashboard/produtos/new',
    ver: (id: number) => `/dashboard/produtos/${id}`,
    editar: (id: number) => `/dashboard/produtos/${id}/editar`,
  },

  deposito: {
    list: '/dashboard/deposito',
    new: '/dashboard/deposito/new',
    ver: (id: number) => `/dashboard/deposito/${id}`,
    editar: (id: number) => `/dashboard/deposito/${id}/editar`,
  },

  usuarios: {
    list: '/dashboard/usuarios',
    new: '/dashboard/usuarios/new',
    ver: (id: number) => `/dashboard/usuarios/${id}`,
    editar: (id: number) => `/dashboard/usuarios/${id}/editar`,
  },

  lotes: {
    list: '/dashboard/lotes',
    new: '/dashboard/lotes/new',
    ver: (id: number) => `/dashboard/lotes/${id}`,
    editar: (id: number) => `/dashboard/lotes/${id}/editar`,
  },
};
