export const ROUTES = {
  dashboard: '/dashboard',

  fornecedores: {
    list: '/dashboard/fornecedores',
    new: '/dashboard/fornecedores/new',
    ver: (id: string) => `/dashboard/fornecedores/${id}`,
    editar: (id: string) => `/dashboard/fornecedores/${id}/editar`,
  },

  produtos: {
    list: '/dashboard/produtos',
    new: '/dashboard/produtos/new',
    ver: (id: string) => `/dashboard/produtos/${id}`,
    editar: (id: string) => `/dashboard/produtos/${id}/editar`,
  },

  deposito: {
    list: '/dashboard/deposito',
    new: '/dashboard/deposito/new',
    ver: (id: string) => `/dashboard/deposito/${id}`,
    editar: (id: string) => `/dashboard/deposito/${id}/editar`,
  },

  usuarios: {
    list: '/dashboard/usuarios',
    new: '/dashboard/usuarios/new',
    ver: (id: string) => `/dashboard/usuarios/${id}`,
    editar: (id: string) => `/dashboard/usuarios/${id}/editar`,
  },

  lotes: {
    list: '/dashboard/lotes',
    new: '/dashboard/lotes/new',
    ver: (id: string) => `/dashboard/lotes/${id}`,
    editar: (id: string) => `/dashboard/lotes/${id}/editar`,
  },

  movimentacao: {
    list: '/dashboard/movimentacao',
    new: '/dashboard/movimentacao/new',
    ver: (id: string) => `/dashboard/movimentacao/${id}`,
    editar: (id: number) => `/dashboard/movimentacao/${id}/editar`,
  },

  marca: {
    list: '/dashboard/marca',
    new: '/dashboard/marca/new',
    ver: (id: string) => `/dashboard/marca/${id}`,
    editar: (id: string) => `/dashboard/marca/${id}/editar`,
  },

  relatorio: {
    list: '/dashboard/relatorio',
    new: '/dashboard/relatorio/new',
    ver: (id: string) => `/dashboard/relatorio/${id}`,
    editar: (id: string) => `/dashboard/relatorio/${id}/editar`,
  },
};
