export interface Movimentacao {
  id: number;
  idlote: number;
  tipomovimentacao: 'entrada' | 'saida';
  quantidade: number;
  datamovimentacao: string;
  status: string;
}
