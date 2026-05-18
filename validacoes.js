// =============================================
//  JS/validacoes.js
//  Funções de validação dos inputs do usuário
// =============================================

export function nomeValido(nome) {
  return typeof nome === "string" && nome.trim() !== "";
}

export function valorValido(valor) {
  return typeof valor === "number" && Number.isFinite(valor) && valor > 0;
}

export function aporteValido(aporte) {
  return typeof aporte === "number" && Number.isFinite(aporte) && aporte > 0;
}

export function guardadoValido(guardado) {
  return typeof guardado === "number" && Number.isFinite(guardado) && guardado >= 0;
}
