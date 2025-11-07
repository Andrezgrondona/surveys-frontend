export interface Survey {
    _id: string;
    title: string;
    description: string;
    color: "purple" | "blue" | "gray" | "orange";
    createdAt: string;
  }
  
  export interface Question {
    _id: string;
    surveyId: string;
    text: string;
    type: "text" | "multiple";
    options?: string[];
  }
  
  export interface Answer {
    _id: string;
    surveyId: string;
    questionId: string;
    userId: string;
    response: string;
  }

  export interface SurveyResult {
    questionId: string;
    questionText: string;
    results: { response: string; count: number }[];
    userResponses: { userId: string; response: string }[];
  }
  