import { useEffect, useState } from "react";
import {
  getSurveys,
  createSurvey,
  getQuestions,
  deleteSurvey,
  updateSurvey,
} from "../api/survey.api";
import SurveyForm from "../components/SurveyForm";
import QuestionForm from "../components/QuestionForm";
import SurveyCard from "../components/SurveyCard";
import QuestionItem from "../components/QuestionItem";
import type { Question, Survey } from "../types";

const Admin = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  const loadSurveys = async () => {
    const data = await getSurveys();
    setSurveys(data);
  };

  const selectSurvey = async (survey: Survey) => {
    setSelectedSurvey(survey);
    const qs = await getQuestions(survey._id);
    setQuestions(qs);
  };

  useEffect(() => {
    loadSurveys();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white border border-gray-300 rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Administrador de Encuestas
          </h1>
          <p className="text-gray-600 text-lg">
            Crea, edita y organiza tus encuestas fácilmente desde este panel.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 mb-10 shadow-sm">
          <SurveyForm
            onCreate={async (survey) => {
              await createSurvey(survey);
              loadSurveys();
            }}
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {surveys.map((s) => (
            <SurveyCard
              key={s._id}
              survey={s}
              onSelect={() => selectSurvey(s)}
              onDelete={async (id) => {
                if (confirm("¿Deseas eliminar esta encuesta? 🗑️")) {
                  await deleteSurvey(id);
                  loadSurveys();
                }
              }}
              onUpdate={async (id, data) => {
                await updateSurvey(id, data);
                loadSurveys();
              }}
            />
          ))}
        </div>

        {selectedSurvey && (
          <div className="bg-gray-50 border border-gray-300 rounded-xl shadow-sm p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
              Preguntas de:{" "}
              <span className="text-gray-800">{selectedSurvey.title}</span>
            </h2>

            <QuestionForm
              surveyId={selectedSurvey._id}
              onCreate={async () => {
                const qs = await getQuestions(selectedSurvey._id);
                setQuestions(qs);
              }}
            />

            <ul className="mt-6 space-y-4">
              {questions.map((q) => (
                <QuestionItem
                  key={q._id}
                  question={q}
                  surveyId={selectedSurvey._id}
                  onUpdate={async () => {
                    const qs = await getQuestions(selectedSurvey._id);
                    setQuestions(qs);
                  }}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
