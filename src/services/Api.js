const API_KEY = "sua-api-key-aqui";
const BASE_URL = "https://api.sheetbest.com/sheets/seu-id-da-planilha";

export async function fetchSheetData(sheetName) {
  const url = `${BASE_URL}?sheet=${sheetName}`;
  const res = await fetch(url, {
    headers: { "X-Api-Key": API_KEY }
  });
  if (!res.ok) throw new Error(`Erro ao buscar ${sheetName}: ${res.statusText}`);
  return await res.json();
}
