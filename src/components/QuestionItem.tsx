import React, { useState } from "react";
import type { Question } from "../types";
import { updateQuestion, deleteQuestion } from "../api/survey.api"; // ✅ importar

interface Props {
  question: Question;
  surveyId: string;
  onUpdate: () => void;
}

const QuestionItem: React.FC<Props> = ({ question, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(question.text);
  const [options, setOptions] = useState(question.options?.join(", ") || "");

  const saveEdit = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updated: any = { text, type: question.type };
      if (question.type === "multiple") {
        updated.options = options.split(",").map((o) => o.trim());
      }
      await updateQuestion(question._id, updated);
      setIsEditing(false);
      onUpdate(); 
    } catch (err) {
      console.error("Error actualizando la pregunta:", err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar esta pregunta?"
    );
    if (!confirmDelete) return;
    try {
      await deleteQuestion(question._id);
      onUpdate(); 
    } catch (err) {
      console.error("Error eliminando la pregunta:", err);
    }
  };

  return (
    <li className="border p-2 rounded mb-2">
      {isEditing ? (
        <div>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border p-1 w-full mb-1"
          />
          {question.type === "multiple" && (
            <input
              value={options}
              onChange={(e) => setOptions(e.target.value)}
              className="border p-1 w-full mb-1"
              placeholder="Opciones separadas por coma"
            />
          )}
          <button
            className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
            onClick={saveEdit}
          >
            Guardar
          </button>
          <button
            className="bg-gray-300 px-2 py-1 mr-2 rounded"
            onClick={() => setIsEditing(false)}
          >
            Cancelar
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <span>
            {question.text} ({question.type})
          </span>
          <div className="flex gap-2">
            <button
              className="bg-yellow-500 text-white px-2 py-1 rounded"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={handleDelete}
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default QuestionItem;
