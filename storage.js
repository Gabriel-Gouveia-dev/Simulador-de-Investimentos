// =============================================
//  JS/storage.js
//  Persistência de metas via localStorage
// =============================================

const CHAVE = "metas-financeiras:metas";

/**
 * Lê todas as metas salvas.
 * @returns {Array}
 */
export function lerMetas() {
  try {
    const dados = localStorage.getItem(CHAVE);
    return dados ? JSON.parse(dados) : [];
  } catch {
    console.error("Erro ao ler metas do localStorage.");
    return [];
  }
}

/**
 * Salva uma nova meta.
 * @param {{ nome: string, valorMeta: number, valorGuardado: number, aporteMensal: number }} meta
 */
export function salvarMeta(meta) {
  try {
    const metas = lerMetas();

    const novaMeta = {
      id:            Date.now(),
      dataCriacao:   new Date().toLocaleDateString("pt-BR"),
      nome:          meta.nome,
      valorMeta:     meta.valorMeta,
      valorGuardado: meta.valorGuardado,
      aporteMensal:  meta.aporteMensal,
    };

    metas.push(novaMeta);
    localStorage.setItem(CHAVE, JSON.stringify(metas));
    return novaMeta;
  } catch {
    console.error("Erro ao salvar meta.");
    return null;
  }
}

/**
 * Remove uma meta pelo id.
 * @param {number} id
 */
export function removerMeta(id) {
  try {
    const metas      = lerMetas();
    const atualizadas = metas.filter(m => m.id !== id);
    localStorage.setItem(CHAVE, JSON.stringify(atualizadas));
  } catch {
    console.error("Erro ao remover meta.");
  }
}

/**
 * Remove todas as metas.
 */
export function limparMetas() {
  try {
    localStorage.removeItem(CHAVE);
  } catch {
    console.error("Erro ao limpar metas.");
  }
}
