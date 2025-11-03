import { useState, useEffect } from "react";

export default function TaskList() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  // ✅ 1. Carrega tarefas salvas ao abrir o app
  useEffect(() => {
    const salvas = localStorage.getItem("tarefas");
    if (salvas) {
      setTarefas(JSON.parse(salvas));
    }
  }, []);

  // ✅ 2. Salva tarefas sempre que mudar
  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  // Função: adicionar tarefa
  const adicionarTarefa = () => {
    if (novaTarefa.trim() === "") return;
    const nova = { id: Date.now(), texto: novaTarefa, feita: false };
    setTarefas([...tarefas, nova]);
    setNovaTarefa("");
  };

  // Função: alternar feita/não feita
  const alternarFeita = (id) => {
    setTarefas(
      tarefas.map((t) =>
        t.id === id ? { ...t, feita: !t.feita } : t
      )
    );
  };

  // Função: remover tarefa
  const removerTarefa = (id) => {
    setTarefas(tarefas.filter((t) => t.id !== id));
  };

    return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg w-96 mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">📝 Lista de Tarefas</h2>

      {/* ✅ Contador de progresso */}
      {tarefas.length > 0 && (
        <p className="text-sm text-gray-400 text-center mb-3">
          {tarefas.filter((t) => t.feita).length} de {tarefas.length} tarefas concluídas
        </p>
      )}

      {/* Campo de adicionar nova tarefa */}
      <div className="flex mb-4">
        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Digite uma tarefa..."
          className="flex-1 p-2 rounded-l bg-slate-700 outline-none text-white"
        />
        <button
          onClick={adicionarTarefa}
          className="bg-blue-500 px-4 rounded-r hover:bg-blue-600 font-bold"
        >
          +
        </button>
      </div>

      {/* Lista de tarefas */}
      {tarefas.length === 0 ? (
        <p className="text-gray-400 text-center">Nenhuma tarefa ainda...</p>
      ) : (
        <ul className="space-y-2">
          {tarefas.map((t) => (
            <li
              key={t.id}
              className="flex justify-between items-center bg-slate-700 p-2 rounded"
            >
              <span
                onClick={() => alternarFeita(t.id)}
                className={`flex-1 cursor-pointer ${
                  t.feita ? "line-through text-gray-400" : ""
                }`}
              >
                {t.texto}
              </span>
              <button
                onClick={() => removerTarefa(t.id)}
                className="text-red-400 hover:text-red-600 font-bold"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}