import React, { useState } from "react";
import { createQuestion } from "../api/survey.api";

interface Props {
  surveyId: string;
  onCreate: () => void;
}

interface CreateQuestionDTO {
  surveyId: string;
  text: string;
  type: "text" | "multiple";
  options?: string[];
}

const QuestionForm: React.FC<Props> = ({ surveyId, onCreate }) => {
  const [text, setText] = useState("");
  const [type, setType] = useState<"text" | "multiple">("text");
  const [options, setOptions] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const questionData: CreateQuestionDTO = { surveyId, text, type };
    if (type === "multiple") {
      questionData.options = options.split(",").map((o) => o.trim());
    }

    await createQuestion(questionData);
    setText("");
    setOptions("");
    onCreate();
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mb-4">
      <input
        type="text"
        placeholder="Texto de la pregunta"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as "text" | "multiple")}
        className="border p-2 mb-2 w-full"
      >
        <option value="text">Texto</option>
        <option value="multiple">Selección múltiple</option>
      </select>
      {type === "multiple" && (
        <input
          type="text"
          placeholder="Opciones separadas por coma"
          value={options}
          onChange={(e) => setOptions(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
      )}
      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Crear Pregunta
      </button>
    </form>
  );
};

export default QuestionForm;
