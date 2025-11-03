// Importamos as funções do React que controlam o estado e os efeitos colaterais
import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";

export default function App() {
  // =========================
  // 1️⃣ VARIÁVEIS DE ESTADO
  // =========================

  // "tempo" guarda o tempo total em segundos. Começa com 25 minutos (25 * 60 segundos)
  const [tempo, setTempo] = useState(25 * 60);

  // "ativo" guarda se o cronômetro está rodando (true = rodando, false = pausado)
  const [ativo, setAtivo] = useState(false);

  // =========================
  // 2️⃣ EFEITO DE CONTAGEM
  // =========================

  useEffect(() => {
    let intervalo;

    if (ativo && tempo > 0) {
      intervalo = setInterval(() => setTempo((t) => t - 1), 1000);
    } else if (tempo === 0) {
      alert("⏰ Tempo esgotado!");
      setAtivo(false);
    }

    return () => clearInterval(intervalo);
  }, [ativo, tempo]);

  // =========================
  // 3️⃣ FUNÇÃO DE FORMATAÇÃO
  // =========================

  const formatarTempo = (segundos) => {
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${min.toString().padStart(2, "0")}:${seg
      .toString()
      .padStart(2, "0")}`;
  };

  // =========================
  // 4️⃣ INTERFACE (HTML + TAILWIND)
  // =========================

  return (
    <div className="bg-slate-900 h-screen text-white flex flex-col items-center justify-center">
      {/* Título principal */}
      <h1 className="text-3xl font-bold mb-4">FocusFlow ⏳</h1>

      {/* Mostra o tempo formatado */}
      <p className="text-6xl font-mono mb-6">{formatarTempo(tempo)}</p>

      {/* Botões de controle */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={() => setAtivo(!ativo)}
          className="bg-green-500 px-6 py-2 rounded-lg font-bold hover:bg-green-600 transition"
        >
          {ativo ? "Pausar" : "Iniciar"}
        </button>

        <button
          onClick={() => {
            setTempo(25 * 60);
            setAtivo(false);
          }}
          className="bg-red-500 px-6 py-2 rounded-lg font-bold hover:bg-red-600 transition"
        >
          Resetar
        </button>
      </div>

      {/* Lista de tarefas */}
      <TaskList />
    </div>
  );
}
