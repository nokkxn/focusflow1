// Importamos as funções do React que controlam o estado e os efeitos colaterais
import { useState, useEffect } from "react";

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

  // useEffect é uma função que observa mudanças em variáveis.
  // Aqui, ela observa "ativo" e "tempo".
  useEffect(() => {
    let intervalo;

    // Se o cronômetro estiver ativo e o tempo for maior que 0
    if (ativo && tempo > 0) {
      // Cria um intervalo que reduz o tempo a cada 1 segundo (1000 ms)
      intervalo = setInterval(() => setTempo((t) => t - 1), 1000);
    } 
    // Se o tempo acabar, mostra um alerta e pausa
    else if (tempo === 0) {
      alert("⏰ Tempo esgotado!");
      setAtivo(false);
    }

    // "return" serve para limpar o intervalo quando o componente for atualizado ou fechado
    return () => clearInterval(intervalo);
  }, [ativo, tempo]); // <- Sempre que "ativo" ou "tempo" mudar, esse useEffect roda de novo

  // =========================
  // 3️⃣ FUNÇÃO DE FORMATAÇÃO
  // =========================

  // Essa função transforma o número de segundos em formato mm:ss
  const formatarTempo = (segundos) => {
    const min = Math.floor(segundos / 60); // Divide o total por 60 pra achar os minutos
    const seg = segundos % 60; // Pega o resto da divisão (os segundos)
    // toString() transforma o número em texto
    // padStart(2, "0") garante que sempre tenha 2 dígitos (ex: 07, 09)
    return `${min.toString().padStart(2, "0")}:${seg.toString().padStart(2, "0")}`;
  };

  // =========================
  // 4️⃣ INTERFACE (HTML + TAILWIND)
  // =========================

  // O "return" é o que vai aparecer na tela
  return (
    <div className="bg-slate-900 h-screen text-white flex flex-col items-center justify-center">
      {/* Título principal */}
      <h1 className="text-3xl font-bold mb-4">FocusFlow ⏳</h1>

      {/* Mostra o tempo formatado */}
      <p className="text-6xl font-mono mb-6">{formatarTempo(tempo)}</p>

      {/* Botões de controle */}
      <div className="flex gap-4">
        {/* Botão que alterna entre "Iniciar" e "Pausar" */}
        <button
          onClick={() => setAtivo(!ativo)} // Inverte o valor de ativo (true → false)
          className="bg-green-500 px-6 py-2 rounded-lg font-bold hover:bg-green-600"
        >
          {ativo ? "Pausar" : "Iniciar"} {/* Texto muda conforme o estado */}
        </button>

        {/* Botão para resetar o tempo */}
        <button
          onClick={() => {
            setTempo(25 * 60);
            setAtivo(false);
          }}
          className="bg-red-500 px-6 py-2 rounded-lg font-bold hover:bg-red-600"
        >
          Resetar
        </button>
      </div>
    </div>
  );
}
