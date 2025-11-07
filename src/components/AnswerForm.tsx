import React, { useState } from "react";
import { submitAnswer } from "../api/survey.api";
import type { Question } from "../types";

interface Props {
  surveyId: string;
  questions: Question[];
}

const AnswerForm: React.FC<Props> = ({ surveyId, questions }) => {
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (questionId: string, value: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert("Por favor ingresa tu correo electrónico antes de enviar.");
      return;
    }

    setIsSubmitting(true);
    try {
      for (const q of questions) {
        await submitAnswer({
          surveyId,
          questionId: q._id,
          userId: email, 
          response: responses[q._id] || "",
        });
      }
      alert("✅ ¡Respuestas enviadas correctamente!");
      setResponses({});
      setEmail("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err.response?.data?.message || "❌ Error al enviar la respuesta.";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 max-w-2xl mx-auto space-y-6"
    >
      <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
        Completa tus respuestas
      </h3>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Correo electrónico:
        </label>
        <input
          type="email"
          placeholder="tu@email.com"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-4">
        {questions.map((q) => (
          <div
            key={q._id}
            className="bg-gray-50 border border-gray-200 rounded-lg p-4"
          >
            <label className="block mb-2 font-semibold text-gray-800">
              {q.text}
            </label>

            {q.type === "text" ? (
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                value={responses[q._id] || ""}
                onChange={(e) => handleChange(q._id, e.target.value)}
                required
              />
            ) : (
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                value={responses[q._id] || ""}
                onChange={(e) => handleChange(q._id, e.target.value)}
                required
              >
                <option value="">Seleccione una opción</option>
                {q.options?.map((o, idx) => (
                  <option key={idx} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full sm:w-auto px-6 py-2.5 font-medium text-white rounded-lg shadow-md transition 
            ${
              isSubmitting
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-gray-500 hover:bg-blue-600 "
            }`}
        >
          {isSubmitting ? "Enviando..." : "Enviar respuestas"}
        </button>
      </div>
    </form>
  );
};

export default AnswerForm;
