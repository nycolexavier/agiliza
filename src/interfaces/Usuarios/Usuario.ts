export interface Usuario {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  status: 'ativo' | 'inativo';
  telefone: string;
  criadoEm: string;
  criadoPor: string;
  atuaizadoEm: string;
}
