import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Asume que tienes un archivo firebase.js
import { collection, onSnapshot } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth"; // Importa la función de signOut
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la redirección

const ResultsAdmin = () => {
  const [results, setResults] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [generalStats, setGeneralStats] = useState({
    totalUsers: 0,
    percentages: {},
  });
  const [selectedCategory, setSelectedCategory] = useState("all");

  const navigate = useNavigate(); // Inicializa el hook de navegación
  const auth = getAuth(); // Obtiene la instancia de auth

const strategies = [
  {
    id: 1,
    text: "Cuando una persona se enoja conmigo, busco entender las razones por las que está enojada.",
    category: "redireccionamiento",
  },
  {
    id: 2,
    text: "Cuando siento enojo o rabia, tomo una respiración profunda antes de actuar.",
    category: "redireccionamiento",
  },
  {
    id: 3,
    text: "Logro anticipar situaciones que me pueden generar emociones desagradables y tomo acciones para evitar que estas emociones escalen.",
    category: "redireccionamiento",
  },
  {
    id: 4,
    text: "Cuando algo me causa malestar, busco una actividad para distraerme: ver películas, comer algo dulce u otras.",
    category: "respiracion",
  },
  {
    id: 5,
    text: "Cuando siento frustración, busco comprender cuáles son los obstáculos que me están impidiendo lograr mi objetivo.",
    category: "respiracion",
  },
  {
    id: 6,
    text: "Hago ejercicios de respiración recurrentes para encontrar la calma.",
    category: "respiracion",
  },
  {
    id: 7,
    text: "Si una situación me genera estrés, la suspendo y prefiero hacer otra cosa.",
    category: "distraccion",
  },
  {
    id: 8,
    text: "Evito ciertas situaciones de las cuales tengo certeza que me pueden generar malestar.",
    category: "distraccion",
  },
  {
    id: 9,
    text: "Cuando una situación me causa mucha alegría o satisfacción, comprendo qué factores incidieron en el resultado de esto, para replicarlos.",
    category: "distraccion",
  },
  {
    id: 10,
    text: "Realizo prácticas de meditación para transformar mis emociones.",
    category: "anticipacion",
  },
  {
    id: 11,
    text: "Sé qué hacer para no exasperarme cuando hay situaciones que me pueden generar malestar.",
    category: "anticipacion",
  },
  {
    id: 12,
    text: "Cuando algo me molesta, prefiero quedarme callado/a.",
    category: "anticipacion",
  },
];

  const categories = [
    "all",
    "redireccionamiento",
    "respiracion",
    "distraccion",
    "anticipacion",
  ];

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tests_results"),
      (snapshot) => {
        const allResults = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResults(allResults);

        const totalUsers = allResults.length;
        const categoryCounts = {
          redireccionamiento: 0,
          respiracion: 0,
          distraccion: 0,
          anticipacion: 0,
        };

        allResults.forEach((doc) => {
          for (const category in doc.categories_count) {
            categoryCounts[category] += doc.categories_count[category];
          }
        });

        const percentages = {};
        const totalPositiveResponses = Object.values(categoryCounts).reduce(
          (sum, count) => sum + count,
          0
        );

        for (const category in categoryCounts) {
          percentages[category] =
            totalPositiveResponses > 0
              ? (
                  (categoryCounts[category] / totalPositiveResponses) *
                  100
                ).toFixed(2)
              : 0;
        }
        setGeneralStats({ totalUsers, percentages });
      }
    );
    return () => unsubscribe();
  }, []);

  const calculateAverageTime = () => {
    if (results.length === 0) return "0s";
    const totalDurationInSeconds = results.reduce((sum, result) => {
      if (result.timestamp) {
        const duration =
          (result.timestamp.toDate() - result.timestamp.toDate()) / 1000;
        return sum + duration;
      }
      return sum;
    }, 0);
    const avgSeconds = totalDurationInSeconds / results.length;
    return `${Math.round(avgSeconds)}s`;
  };

  const toggleExpanded = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin"); // Redirige al usuario a la página de inicio
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  const filteredAndSortedResults = results
    .filter((result) => {
      if (selectedCategory === "all") {
        return true;
      }
      return result.categories_count[selectedCategory] > 0;
    })
    .sort((a, b) => {
      if (selectedCategory === "all") {
        return b.timestamp.seconds - a.timestamp.seconds;
      }
      return (
        b.categories_count[selectedCategory] -
        a.categories_count[selectedCategory]
      );
    });

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Panel de Administración
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-indigo-100 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-indigo-700">Total de Participantes</p>
          <p className="text-3xl font-bold text-indigo-900">
            {generalStats.totalUsers}
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-green-700">Tiempo Promedio</p>
          <p className="text-3xl font-bold text-green-900">
            {calculateAverageTime()}
          </p>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-4">
        Estadísticas de Categorías
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Object.keys(generalStats.percentages).map((category) => (
          <div key={category} className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <p className="text-sm font-medium capitalize">{category}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-indigo-700">
                {generalStats.percentages[category]}%
              </span>
              <div className="w-1/2 bg-gray-300 rounded-full h-3">
                <div
                  className="bg-indigo-500 h-3 rounded-full"
                  style={{ width: `${generalStats.percentages[category]}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-4">
        Detalle de Respuestas por Usuario
      </h3>

      <div className="mb-6 flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm">
        <label htmlFor="category-filter" className="font-medium text-gray-700">
          Filtrar y ordenar por categoría:
        </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-48 p-2 border border-gray-300 rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all"
                ? "Todas las categorías"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Respuestas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categorías
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Detalles
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedResults.map((result) => (
              <React.Fragment key={result.id}>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {result.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {Object.keys(result.responses).length} de 12
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {Object.keys(result.categories_count)
                      .map((key) => `${key}: ${result.categories_count[key]}`)
                      .join(", ")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => toggleExpanded(result.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      {expandedUser === result.id
                        ? "Ocultar"
                        : "Ver Respuestas"}
                    </button>
                  </td>
                </tr>
                {expandedUser === result.id && (
                  <tr>
                    <td colSpan="4" className="bg-gray-50 p-4">
                      <div className="space-y-3">
                        {Object.keys(result.responses)
                          .sort((a, b) => parseInt(a) - parseInt(b))
                          .map((questionId) => {
                            const question = strategies.find(
                              (q) => q.id === parseInt(questionId)
                            );
                            const answer = result.responses[questionId];
                            const isCorrect = answer === question.correct;

                            return (
                              <div
                                key={questionId}
                                className={`p-3 rounded-lg shadow-sm transition duration-300 ease-in-out ${
                                  isCorrect ? "bg-green-100" : "bg-red-100"
                                }`}
                              >
                                <p className="font-semibold text-gray-700">
                                  {questionId}. {question.text}
                                </p>
                                <div className="mt-1 flex justify-between items-center text-sm">
                                  <p className="text-gray-600">
                                    Respuesta del usuario:{" "}
                                    <span
                                      className={`font-bold uppercase ${
                                        isCorrect
                                          ? "text-green-800"
                                          : "text-red-800"
                                      }`}
                                    >
                                      {answer}
                                    </span>
                                  </p>
                                  <p className="text-gray-600">
                                    Respuesta esperada:{" "}
                                    <span className="font-bold uppercase text-gray-900">
                                      {question.correct}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsAdmin;
