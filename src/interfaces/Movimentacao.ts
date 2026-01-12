export interface Movimentacao {
  id: string;
  idlote: number;
  tipomovimentacao: 'entrada' | 'saida';
  quantidade: number;
  datamovimentacao: string;
  status: string;
}
