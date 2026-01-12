export interface Lote {
  id: string;
  codigoLote: string;
  marca: string;
  produto: string;
  status: 'ativo' | 'inativo';
  dataValidade: string;
  precoCusto: string;
  precoVenda: string;
  criadoEm: string;
  criadoPor: string;
  codigoBarra: string;
  quantidade: string;
}
export interface LotePostDTO {
  id: string;
  codigoLote: string;
  marca: string;
  produto: string;
  status: 'ativo' | 'inativo';
  dataValidade: string;
  precoCusto: string;
  precoVenda: string;
  criadoEm: string;
  criadoPor: string;
  codigoBarra: string;
  quantidade: string;
}
export interface LotePatchDTO {
  codigoLote: string;
  marca: string;
  produto: string;
  quantidadeProduto: string;
  dataValidade: string;
}
