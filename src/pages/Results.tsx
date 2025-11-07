import { useEffect, useState } from "react";
import { getSurveys, getResults } from "../api/survey.api";
import type { Survey } from "../types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28BD4",
  "#FF6666",
];

const Results = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any>({});

  const loadSurveys = async () => {
    const data = await getSurveys();
    setSurveys(data);
  };

  const loadResults = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allResults: any = {};
    for (const survey of surveys) {
      const res = await getResults(survey._id);

      const aggregated: { [response: string]: number } = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      res.forEach((q: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        q.results.forEach((r: any) => {
          aggregated[r.response] = (aggregated[r.response] || 0) + r.count;
        });
      });

      allResults[survey._id] = Object.entries(aggregated).map(
        ([name, value]) => ({
          name,
          value,
        })
      );
    }
    setResults(allResults);
  };

  useEffect(() => {
    loadSurveys();
  }, []);

  useEffect(() => {
    if (surveys.length) loadResults();
  }, [surveys]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📊 Resultados Generales de Encuestas
      </h1>

      {surveys.map((survey) => (
        <div key={survey._id} className="border p-4 rounded-lg mb-6 shadow">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            {survey.title}
          </h2>

          {results[survey._id] && results[survey._id].length > 0 ? (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={results[survey._id]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {results[survey._id].map(
                        (_: { name: string; value: number }, index: number) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        )
                      )}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full md:w-1/2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results[survey._id]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value">
                      {results[survey._id].map(
                        (_: { name: string; value: number }, index: number) => (
                          <Cell
                            key={`bar-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        )
                      )}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="text-gray-500">No hay resultados aún.</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Results;
