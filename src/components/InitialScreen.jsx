import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InitialScreen = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleStartTest = (e) => {
    e.preventDefault();
    if (userName.trim() !== "") {
      navigate("/test", { state: { userName } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          Bienvenido al Test de Gestión Emocional
        </h1>

        {/* Sección de Autopromoción para JG Softworks */}
        <div className="bg-blue-50 p-6 rounded-lg mb-6 border-l-4 border-blue-400">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            ¡Una demo de JG Softworks! 🚀
          </h2>
          <p className="text-gray-700">
            En JG Softworks creamos aplicaciones web y móviles personalizadas
            para potenciar tu negocio. Este test es una muestra de nuestro
            trabajo. Si necesitas una solución a medida, ¡contáctanos!
          </p>
          <a
            href="https://jgsoftworks-site.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
          >
            Ver más proyectos de JG Softworks →
          </a>
        </div>

        {/* Sección de Instrucciones */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Instrucciones
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <span className="font-semibold">Ingresa tu nombre:</span> Escribe
              tu nombre para empezar el test.
            </li>
            <li>
              <span className="font-semibold">Responde con sinceridad:</span>{" "}
              Lee cada pregunta y selecciona "Sí" o "No" según tu comportamiento
              habitual.
            </li>
            <li>
              <span className="font-semibold">Sin límite de tiempo:</span>{" "}
              Tienes 15 minutos para responder todas las preguntas. No te
              preocupes, puedes volver a la pregunta anterior si lo necesitas.
            </li>
            <li>
              <span className="font-semibold">Guarda tus resultados:</span> Al
              finalizar, se generará un código para que puedas consultar tus
              resultados más tarde.
            </li>
          </ul>
        </div>

        {/* Formulario para iniciar el test */}
        <form onSubmit={handleStartTest} className="mt-8">
          <label
            htmlFor="userName"
            className="block text-gray-700 font-medium mb-2"
          >
            Tu nombre:
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition duration-300 disabled:bg-gray-400"
            disabled={userName.trim() === ""}
          >
            Comenzar Test
          </button>
        </form>
      </div>
    </div>
  );
};

export default InitialScreen;
