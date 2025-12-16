export interface Lote{
  id: number,
  codigoLote: string,
  marca: string,
  produto: string,
  status: "ativo" | "inativo",
  dataValidade: string
}