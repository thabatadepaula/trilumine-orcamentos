import { useEffect } from "react";
import { supabase } from "./supabase";

export default function TesteSupabase() {
  useEffect(() => {
    async function testarConexao() {
      const { data, error } = await supabase
        .from("materiais")
        .select("*")
        .limit(1);

      if (error) {
        console.error("Erro ao conectar com Supabase:", error.message);
      } else {
        console.log("Conexão OK! Primeiro item:", data);
      }
    }

    testarConexao();
  }, []);

  return (
    <div style={{ padding: "2rem", fontSize: "1.2rem" }}>
      Veja o console do navegador (F12) para o resultado do teste.
    </div>
  );
}
