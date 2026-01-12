import type { Produto } from '@/interfaces/Produtos/Produto';
export interface InformacoesNutricionais {
  carboidratosTotais: string;
  idProduto: Produto[];
  proteinas: string;
  gordurasTotais: string;
  gordurasSaturadas: string;
  gordurasTrans: string;
  fibraAlimentar: string;
}
