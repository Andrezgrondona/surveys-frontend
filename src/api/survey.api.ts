import axios from "axios";
import type { Answer, Question, Survey } from "../types";


const API_URL = "http://localhost:4000/api";

export const getSurveys = async (): Promise<Survey[]> => {
  const { data } = await axios.get(`${API_URL}/surveys`);
  return data;
};

//creamos la pregunta
export const createQuestion = async (question: {
  surveyId: string;
  text: string;
  type: "text" | "multiple";
  options?: string[];
}) => {
  const { data } = await axios.post(`${API_URL}/questions`, question);
  return data;
};

//actualizamos la pregunta
export const updateQuestion = async (id: string, question: {
  text?: string;
  type?: "text" | "multiple";
  options?: string[];
}) => {
  const { data } = await axios.put(`${API_URL}/questions/${id}`, question);
  return data;
};

//borramos la pregunta
export const deleteQuestion = async (id: string) => {
  const { data } = await axios.delete(`${API_URL}/questions/${id}`);
  return data;
};

//eliminamos la encuesta
export const deleteSurvey = async (id: string) => {
  const { data } = await axios.delete(`${API_URL}/surveys/${id}`);
  return data;
};

//actilizar la encuesta
export const updateSurvey = async (id: string, survey: Partial<Survey>) => {
  const { data } = await axios.put(`${API_URL}/surveys/${id}`, survey);
  return data;
};


//creamos la encuesta
export const createSurvey = async (survey: Partial<Survey>) => {
  const { data } = await axios.post(`${API_URL}/surveys`, survey);
  return data;
};

//obtenemos las preguntas de una encuesta
export const getQuestions = async (surveyId: string): Promise<Question[]> => {
  const { data } = await axios.get(`${API_URL}/questions/${surveyId}`);
  return data;
};

//enviamos la respuesta de una pregunta
export const submitAnswer = async (answer: Partial<Answer>) => {
  const { data } = await axios.post(`${API_URL}/answers`, answer);
  return data;
};

//obtenemos los resultados de una encuesta
export const getResults = async (surveyId: string) => {
  const { data } = await axios.get(`${API_URL}/answers/${surveyId}/results`);
  return data;
};
