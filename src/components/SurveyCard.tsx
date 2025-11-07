import React, { useState } from "react";
import type { Survey } from "../types";

interface Props {
  survey: Survey;
  onSelect: () => void;
  onDelete: (surveyId: string) => void;
  onUpdate: (surveyId: string, data: Partial<Survey>) => void;
}

const colors = ["purple", "blue", "gray", "orange"] as const;
type ColorType = typeof colors[number];

const colorMap: Record<ColorType, string> = {
  purple: "bg-purple-100",
  blue: "bg-blue-100",
  gray: "bg-gray-100",
  orange: "bg-orange-100",
};

const colorNames: Record<ColorType, string> = {
  purple: "Morado",
  blue: "Azul",
  gray: "Gris",
  orange: "Naranja",
};

const SurveyCard: React.FC<Props> = ({ survey, onSelect, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(survey.title);
  const [description, setDescription] = useState(survey.description);
  const [color, setColor] = useState<ColorType>(survey.color as ColorType);
  const bgColor = colorMap[color];

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(`¿Deseas eliminar la encuesta "${survey.title}"?`);
    if (confirmDelete) {
      onDelete(survey._id);
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdate(survey._id, { title, description, color });
    setIsEditing(false);
  };

  const handleChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColor(e.target.value as ColorType);
  };

  return (
    <div
      className={`relative border p-4 rounded cursor-pointer hover:shadow-md transition ${bgColor}`}
      onClick={!isEditing ? onSelect : undefined}
    >
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(!isEditing);
          }}
          className="text-blue-500 font-bold hover:text-blue-700"
        >
          ✎
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 font-bold hover:text-red-700"
        >
          ✕
        </button>
      </div>

      {isEditing ? (
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-1 mb-2 w-full rounded"
            placeholder="Título"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-1 mb-2 w-full rounded"
            placeholder="Descripción"
          />
          <select
            value={color}
            onChange={handleChangeColor}
            className="border p-1 w-full rounded mb-2"
          >
            {colors.map((c) => (
              <option key={c} value={c}>
                {colorNames[c]}
              </option>
            ))}
          </select>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-2 py-1 rounded mr-2"
          >
            Guardar
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(false);
            }}
            className="bg-gray-300 px-2 py-1 rounded"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <div>
          <h3 className="font-semibold">{survey.title}</h3>
          <p>{survey.description}</p>
        </div>
      )}
    </div>
  );
};

export default SurveyCard;
