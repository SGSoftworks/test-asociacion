import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Asume que tienes un archivo firebase.js
import { collection, onSnapshot } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth"; // Importa la función de signOut
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la redirección
import * as XLSX from "xlsx";

const ResultsAdmin = () => {
  // Función para exportar datos relevantes a Excel
  const handleExport = () => {
    // Construir datos para exportar
    const exportData = results.map((result) => {
      return {
        Nombre: result.userName,
        Código: result.uniqueCode || "",
        Fecha: result.timestamp
          ? result.timestamp.toDate
            ? result.timestamp.toDate().toLocaleString()
            : result.timestamp.toLocaleString()
          : "",
        ...result.categories_count,
        Respuestas: Object.entries(result.responses)
          .map(([qid, ans]) => `${qid}: ${ans}`)
          .join(", "),
      };
    });
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Resultados");
    XLSX.writeFile(wb, "resultados_test_estrategias.xlsx");
  };
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
      category: "respiracion",
    },
    {
      id: 3,
      text: "Logro anticipar situaciones que me pueden generar emociones desagradables y tomo acciones para evitar que estas emociones escalen.",
      category: "distraccion",
    },
    {
      id: 4,
      text: "Cuando algo me causa malestar, busco una actividad para distraerme: ver películas, comer algo dulce u otras.",
      category: "anticipacion",
    },
    {
      id: 5,
      text: "Cuando siento frustración, busco comprender cuáles son los obstáculos que me están impidiendo lograr mi objetivo.",
      category: "redireccionamiento",
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
      category: "anticipacion",
    },
    {
      id: 9,
      text: "Cuando una situación me causa mucha alegría o satisfacción, comprendo qué factores incidieron en el resultado de esto, para replicarlos.",
      category: "redireccionamiento",
    },
    {
      id: 10,
      text: "Realizo prácticas de meditación para transformar mis emociones.",
      category: "respiracion",
    },
    {
      id: 11,
      text: "Sé qué hacer para no exasperarme cuando hay situaciones que me pueden generar malestar.",
      category: "distraccion",
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
    return "No disponible";
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
        <div className="bg-blue-100 p-4 rounded-lg shadow-sm flex flex-col items-center justify-center">
          <p className="text-sm text-blue-700 mb-2">Exportar Resultados</p>
          <button
            onClick={handleExport}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-200 text-sm font-semibold"
            title="Exportar a Excel"
          >
            Exportar Excel
          </button>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-4">
        Estadísticas de Respuestas Negativas
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
                            return (
                              <div
                                key={questionId}
                                className={`p-3 rounded-lg shadow-sm transition duration-300 ease-in-out bg-gray-50 border-l-4 ${
                                  answer === "no"
                                    ? "border-red-400"
                                    : "border-green-400"
                                }`}
                              >
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-bold text-gray-700">
                                    {questionId}. {question.category}
                                  </span>
                                  <span
                                    className={`font-bold uppercase ${
                                      answer === "no"
                                        ? "text-red-700"
                                        : "text-green-700"
                                    }`}
                                  >
                                    {answer}
                                  </span>
                                </div>
                                <p className="text-gray-700 text-sm">
                                  {question.text}
                                </p>
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
