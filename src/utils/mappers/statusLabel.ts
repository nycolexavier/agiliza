import type { Usuario } from '@/interfaces/Usuarios/Usuario';

export const STATUS_LABEL: Record<Usuario['status'], string> = {
  ativo: 'Ativo',
  inativo: 'Inativo',
};
