import type { Fornecedor } from './Fornecedores/Fornecedor';
import type { Produto } from './Produtos/Produto';
import type { Status } from './Status';

export interface ProdutosFornecedores {
  idProduto: Produto[];
  idFornecedor: Fornecedor[];
  status: Status;
  criadoEm: string;
  criadoPor: string;
  AtualizadoEm: string;
}
