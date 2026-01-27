// Valida se o preço de venda é maior ou igual ao preço de custo
export function precoVendaMaiorOuIgualCusto(
  precoVenda: number,
  precoCusto: number
) {
  if (!precoVenda || !precoCusto) return true;

  const venda = Number(precoVenda);
  const custo = Number(precoCusto);

  if (isNaN(venda) || isNaN(custo)) return true;

  return (
    venda >= custo || 'Preço de venda não pode ser menor que o preço de custo'
  );
}

//  Valida se o preço de custo é menor ou igual ao preço de venda

export function precoCustoMenorOuIgualVenda(
  precoCusto: number,
  precoVenda: number
) {
  if (!precoCusto || !precoVenda) return true;

  const custo = Number(precoCusto);
  const venda = Number(precoVenda);

  if (isNaN(custo) || isNaN(venda)) return true;

  return (
    custo <= venda || 'Preço de custo não pode ser maior que o preço de venda'
  );
}
