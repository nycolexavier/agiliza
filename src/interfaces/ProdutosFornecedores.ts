import type { Fornecedor } from './Fornecedores/Fornecedor';
import type { Produto } from './Produtos/Produto';

export interface ProdutosFornecedores {
  idProduto: Produto[];
  idFornecedor: Fornecedor[];
  status: 'Ativo' | 'Inativo';
  criadoEm: string;
  criadoPor: string;
  AtualizadoEm: string;
}
