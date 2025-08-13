import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ResultsUser from "../components/ResultsUser";
import GeneralStats from "../components/GeneralStats";

const ResultsPage = () => {
  const location = useLocation();
  const [userResults, setUserResults] = useState(null);
  const [uniqueCode, setUniqueCode] = useState(null);

  useEffect(() => {
    if (location.state && location.state.userResults) {
      setUserResults(location.state.userResults);
      setUniqueCode(location.state.uniqueCode);
    }
  }, [location.state]);

  if (!userResults) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-600">Cargando resultados...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl">
        <ResultsUser userResults={userResults} />
        {uniqueCode && (
          <div className="p-6 bg-yellow-100 rounded-lg text-yellow-800 shadow-md mt-8">
            <h3 className="text-xl font-bold">¡Guarda tu código! 🔑</h3>
            <p className="mt-2 text-lg">
              Si quieres volver a ver tus resultados más tarde y seguir
              comparando, guarda y usa este código único:
              <br />
              <span className="font-bold text-2xl tracking-widest block mt-2">
                {uniqueCode}
              </span>
            </p>
            <p className="mt-4 text-sm">
              Úsalo en la sección de inicio para acceder a tus datos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
