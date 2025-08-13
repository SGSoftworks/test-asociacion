import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import InitialScreen from "../components/InitialScreen";
import TestForm from "../components/TestForm"; // Aunque no se usa directamente en este componente, se mantiene el import para claridad

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [uniqueCode, setUniqueCode] = useState("");
  const [lookupError, setLookupError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Mostrar el modal solo la primera vez que se visita la página
  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("hasSeenInitialModal");
    if (!hasSeenModal) {
      setShowModal(true);
      sessionStorage.setItem("hasSeenInitialModal", "true");
    }
  }, []);

  const handleStartTest = (e) => {
    e.preventDefault();
    if (userName.trim() !== "") {
      navigate("/test", { state: { userName } });
    }
  };

  const handleLookupResults = async (e) => {
    e.preventDefault();
    setLookupError("");
    setLoading(true);
    try {
      const q = query(
        collection(db, "tests_results"),
        where("uniqueCode", "==", uniqueCode.toUpperCase())
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        navigate("/results", {
          state: { userResults: docData, uniqueCode: docData.uniqueCode },
        });
      } else {
        setLookupError("Código no válido. Por favor, verifica el código.");
      }
    } catch (e) {
      setLookupError("Ocurrió un error al buscar los resultados.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {showModal && <InitialScreen onClose={() => setShowModal(false)} />}

      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Test de Estrategias
        </h1>

        <div className="text-center mb-6">
          <p className="text-gray-600 mb-4">
            ¡Hola! ¿Listo para comenzar? Lee las instrucciones y comienza el
            test.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 text-white py-2 px-6 rounded-full font-bold hover:bg-indigo-700 transition duration-300"
          >
            Ver Instrucciones
          </button>
        </div>

        <div className="border-t-2 pt-6 mt-6 border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Comienza un nuevo test</h2>
          <form onSubmit={handleStartTest} className="space-y-4">
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700"
              >
                Tu nombre:
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Tu nombre"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
              disabled={userName.trim() === ""}
            >
              Comenzar Test
            </button>
          </form>
        </div>

        <div className="border-t-2 pt-6 mt-6 border-gray-200">
          <h2 className="text-xl font-semibold mb-2">¿Ya hiciste el test?</h2>
          <form onSubmit={handleLookupResults} className="space-y-4">
            <div>
              <label
                htmlFor="uniqueCode"
                className="block text-sm font-medium text-gray-700"
              >
                Ingresa tu código único:
              </label>
              <input
                type="text"
                id="uniqueCode"
                value={uniqueCode}
                onChange={(e) => setUniqueCode(e.target.value.toUpperCase())}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Ej. 1A2B3C"
                required
              />
            </div>
            {lookupError && (
              <p className="text-red-500 text-sm">{lookupError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
              disabled={loading}
            >
              {loading ? "Buscando..." : "Ver mis Resultados"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
