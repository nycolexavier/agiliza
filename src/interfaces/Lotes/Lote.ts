import type { Status } from '../Status';
// todo ver a questão do id
// todo mandar o status DEFAULT
export interface Lote {
  id: string;
  codigoLote: string;
  marca: string;
  produto: string;
  status: Status;
  dataValidade: string;
  precoCusto: string;
  precoVenda: string;
  criadoEm: string;
  criadoPor: string;
  codigoBarra: string;
  quantidade: string;
}
export interface LotePostDTO {
  id?: string; 
  codigoLote: string;
  marca: string;
  produto: string;
  status: Status;
  dataValidade: string;
  precoCusto: string;
  precoVenda: string;
  criadoEm?: string;
  criadoPor?: string;
  codigoBarra: string;
  quantidade: string;
}
export interface LotePatchDTO {
  codigoLote: string;
  marca: string;
  produto: string;
  quantidade: string;
  dataValidade: string;
}
