import React, { useState } from "react";
import type { Survey } from "../types";

interface Props {
  onCreate: (survey: Partial<Survey>) => void;
}

const colors = ["purple", "blue", "gray", "orange"] as const;

const colorNames: Record<typeof colors[number], string> = {
  purple: "Morado",
  blue: "Azul",
  gray: "Gris",
  orange: "Naranja",
};

const SurveyForm: React.FC<Props> = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState<typeof colors[number]>("purple");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({ title, description, color });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mb-4">
      <h2 className="font-semibold mb-2">Crear nueva encuesta</h2>

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />

      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />

      <select
        value={color}
        onChange={(e) => setColor(e.target.value as any)}
        className="border p-2 mb-2 w-full"
      >
        {colors.map((c) => (
          <option key={c} value={c}>
            {colorNames[c]}
          </option>
        ))}
      </select>

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Crear
      </button>
    </form>
  );
};

export default SurveyForm;
