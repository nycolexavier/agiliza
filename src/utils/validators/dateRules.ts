export const dataNaoFutura = (v: string) => {
  if (!v) return true;

  const hoje = new Date().toISOString().substring(0, 10);

  return v <= hoje || 'Data não pode ser posterior ao dia atual';
};
