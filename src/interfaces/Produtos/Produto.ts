export interface Produto{
  id: number,
  nome: string,
  sku: number,
  unidadeMedida: string,
  quantidadeProduto: string,
  status: "ativo" | "inativo",
  categoria: string
}