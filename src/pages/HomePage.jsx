import TestForm from "../components/TestForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { motion } from "framer-motion";
import { collection, query, where, getDocs } from "firebase/firestore";

const HomePage = () => {
  const [showModal, setShowModal] = useState(true);
  const [userName, setUserName] = useState("");
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [uniqueCode, setUniqueCode] = useState("");
  const [showInstructionBtn, setShowInstructionBtn] = useState(false); // Initialize state for instruction button
  useEffect(() => {
    setShowInstructionBtn(!showModal); // Show instruction button when modal is closed
  }, [showModal]);
  const [lookupError, setLookupError] = useState("");
  const navigate = useNavigate();

  const handleStartTest = (name) => {
    setUserName(name);
    setIsTestStarted(true);
  };

  const handleLookupResults = async (e) => {
    e.preventDefault();
    setLookupError("");
    try {
      const q = query(
        collection(db, "tests_results"),
        where("uniqueCode", "==", uniqueCode)
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
    }
  };

  useEffect(() => {
    setShowInstructionBtn(!showModal);
  }, [showModal]);

  if (isTestStarted) {
    return <TestForm userName={userName} />;
  }

  // Modal de autopromoción, instrucciones y advertencias
  if (showModal) {
    return (
      <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="relative bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-lg mx-auto overflow-y-auto max-h-[95vh] flex flex-col">
          {/* Botón de cerrar */}
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600 text-center mb-4 sm:mb-6">
            Bienvenido al Test de Estrategias Emocionales
          </h1>

          {/* Autopromoción */}
          <div className="bg-blue-50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6 border-l-4 border-blue-400">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-2">
              ¿Te gustaría una app similar para tu negocio?
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              Este test es una app de <b>JG Softworks</b>. Creamos aplicaciones
              web y móviles personalizadas para empresas, instituciones y
              profesionales. Si necesitas una solución a medida, visita nuestra
              página:
            </p>
            <a
              href="https://jgsoftworks-site.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
            >
              Ver más proyectos de JG Softworks →
            </a>
          </div>

          {/* Instrucciones */}
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
              Instrucciones
            </h2>
            <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-2">
              <li>
                <span className="font-semibold">Ingresa tu nombre:</span>{" "}
                Escribe tu nombre en la página principal para comenzar el test.
              </li>
              <li>
                <span className="font-semibold">Responde con sinceridad:</span>{" "}
                Selecciona "Sí" o "No" según tu comportamiento habitual.
              </li>
              <li>
                <span className="font-semibold">Tiempo:</span> Tienes hasta 15
                minutos para responder todas las preguntas.
              </li>
              <li>
                <span className="font-semibold">Visualización:</span> Puedes
                usar el test en modo vertical u horizontal, es completamente
                responsivo.
              </li>
              <li>
                <span className="font-semibold">Resultados:</span> Al finalizar,
                se generará un código único para consultar tus respuestas
                negativas (estrategias a mejorar) más adelante.
              </li>
            </ul>
          </div>

          {/* Advertencias */}
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mb-4">
            <h2 className="text-lg font-bold text-yellow-800 mb-2">
              Advertencias
            </h2>
            <ul className="list-disc list-inside text-sm sm:text-base text-yellow-700 space-y-1">
              <li>
                Desactiva el traductor automático del navegador para evitar
                errores en el test.
              </li>
              <li>
                El código generado solo sirve para volver a visualizar tus
                respuestas negativas.
              </li>
            </ul>
          </div>

          <button
            onClick={() => setShowModal(false)}
            className="w-full mt-2 bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition duration-300 font-bold"
          >
            Entendido, comenzar
          </button>
          {!showModal && showInstructionBtn && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
              onClick={() => setShowModal(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
              Instrucciones
            </motion.button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Test de Estrategias
        </h1>

        <div className="border-b-2 pb-4 mb-4 border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Comienza un nuevo test</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStartTest(e.target.userName.value);
            }}
            className="space-y-4"
          >
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Tu nombre"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Comenzar Test
            </button>
          </form>
        </div>

        <div>
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
            >
              Ver mis Resultados
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
