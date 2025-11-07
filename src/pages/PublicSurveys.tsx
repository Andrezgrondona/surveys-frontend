import { useEffect, useState } from "react";
import { getSurveys, getQuestions } from "../api/survey.api";
import AnswerForm from "../components/AnswerForm";
import type { Question, Survey } from "../types";

const PublicSurveys = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);

  useEffect(() => {
    getSurveys().then(setSurveys);
  }, []);

  const loadQuestions = async (survey: Survey) => {
    setSelectedSurvey(survey);
    const qs = await getQuestions(survey._id);
    setQuestions(qs);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-6xl w-full bg-white shadow-md rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Encuestas Disponibles
        </h1>

        {/* Lista de encuestas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {surveys.map((s) => (
            <button
              key={s._id}
              onClick={() => loadQuestions(s)}
              className={`p-5 rounded-xl shadow-sm border border-gray-200 text-left transition-all duration-300 hover:shadow-md hover:border-blue-400 ${
                selectedSurvey?._id === s._id ? "bg-blue-50 border-blue-400" : "bg-white"
              }`}
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {s.title}
              </h2>
              <p className="text-sm text-gray-500">
                {s.description || "Haz clic para responder esta encuesta."}
              </p>
            </button>
          ))}
        </div>

        {/* Formulario de preguntas */}
        {selectedSurvey && (
          <div className="mt-10 border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              {selectedSurvey.title}
            </h2>
            <AnswerForm surveyId={selectedSurvey._id} questions={questions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicSurveys;
