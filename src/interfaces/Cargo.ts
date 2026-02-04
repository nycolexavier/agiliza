export const CARGOS = [
  'admin',
  'gerente',
  'funcionario',
  'fornecedor',
] as const;

export const CARGOSSemFornecedor = [
  'admin',
  'gerente',
  'funcionario',
] as const;

export type cargo = typeof CARGOS[number]

export type Cargo = 'admin' | 'gerente' | 'funcionario' | 'fornecedor';
