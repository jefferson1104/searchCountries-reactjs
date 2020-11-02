//api nativa do js para formatar numbers
const formatter = Intl.NumberFormat('pt-BR');

//funcao para formatar numeros
function formatNumber(value) {
  return formatter.format(value);
}

export { formatNumber };