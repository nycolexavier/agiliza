export interface Lote {
  id: string;
  codigoLote: string;
  marca: string;
  produto: string;
  status: 'ativo' | 'inativo';
  dataValidade: string;
  precoCusto: string;
  precoVenda: string
  criadoEm: string
  criadoPor: string
  codigoBarra: string
  quantidade: string
}
