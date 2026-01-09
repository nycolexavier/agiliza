export interface Lote {
  id: number;
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
