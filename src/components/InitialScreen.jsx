import React from "react";

const InitialScreen = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="relative bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-lg mx-auto">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
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
          Bienvenido al Test de Gestión Emocional
        </h1>

        {/* Sección de Autopromoción para JG Softworks */}
        <div className="bg-blue-50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6 border-l-4 border-blue-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-2">
            ¡Una demo de JG Softworks! 🚀
          </h2>
          <p className="text-sm sm:text-base text-gray-700">
            En JG Softworks creamos aplicaciones web y móviles personalizadas
            para potenciar tu negocio. Este test es una muestra de nuestro
            trabajo. Si necesitas una solución a medida, ¡contáctanos!
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

        {/* Sección de Instrucciones */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
            Instrucciones
          </h2>
          <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-2">
            <li>
              <span className="font-semibold">Ingresa tu nombre:</span> Escribe
              tu nombre en la página principal para empezar el test.
            </li>
            <li>
              <span className="font-semibold">Responde con sinceridad:</span>{" "}
              Lee cada pregunta y selecciona "Sí" o "No" según tu comportamiento
              habitual.
            </li>
            <li>
              <span className="font-semibold">Sin límite de tiempo:</span>{" "}
              Tienes 15 minutos para responder todas las preguntas.
            </li>
            <li>
              <span className="font-semibold">Guarda tus resultados:</span> Al
              finalizar, se generará un código para que puedas consultar tus
              resultados más tarde.
            </li>
          </ul>
        </div>

        {/* Botón para cerrar la ventana modal */}
        <button
          onClick={onClose}
          className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition duration-300 font-bold"
        >
          Entendido, cerrar
        </button>
      </div>
    </div>
  );
};

export default InitialScreen;
