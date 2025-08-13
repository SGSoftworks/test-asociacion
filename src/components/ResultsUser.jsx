import React from "react";

const ResultsUser = ({ userResults }) => {
  const { userName, responses } = userResults;

  // Estrategias y significados
  const strategies = [
    {
      id: 1,
      text: "Cuando una persona se enoja conmigo, busco entender las razones por las que está enojada.",
      category: "redireccionamiento",
      tip: "Practica la empatía y busca comprender el origen de las emociones ajenas.",
      meaning: "Redireccionamiento: Capacidad de enfocar la atención en comprender y modificar la causa de una emoción, en vez de reaccionar impulsivamente."
    },
    {
      id: 2,
      text: "Cuando siento enojo o rabia, tomo una respiración profunda antes de actuar.",
      category: "respiracion",
      tip: "Realiza ejercicios de respiración consciente para calmarte antes de responder.",
      meaning: "Respiración: Uso de técnicas de respiración para regular y transformar emociones intensas."
    },
    {
      id: 3,
      text: "Logro anticipar situaciones que me pueden generar emociones desagradables y tomo acciones para evitar que estas emociones escalen.",
      category: "distraccion",
      tip: "Identifica señales tempranas y toma medidas preventivas para evitar el malestar.",
      meaning: "Distracción: Capacidad de anticipar y evitar situaciones que pueden generar emociones negativas."
    },
    {
      id: 4,
      text: "Cuando algo me causa malestar, busco una actividad para distraerme: ver películas, comer algo dulce u otras.",
      category: "anticipacion",
      tip: "Busca actividades saludables que te ayuden a cambiar el foco de atención.",
      meaning: "Anticipación: Buscar alternativas para distraerse y evitar que las emociones negativas dominen la situación."
    },
    {
      id: 5,
      text: "Cuando siento frustración, busco comprender cuáles son los obstáculos que me están impidiendo lograr mi objetivo.",
      category: "redireccionamiento",
      tip: "Analiza los obstáculos y busca soluciones en vez de quedarte en la frustración.",
      meaning: "Redireccionamiento: Capacidad de analizar y modificar el origen de la emoción para lograr el objetivo."
    },
    {
      id: 6,
      text: "Hago ejercicios de respiración recurrentes para encontrar la calma.",
      category: "respiracion",
      tip: "Dedica unos minutos al día a ejercicios de respiración y relajación.",
      meaning: "Respiración: Práctica regular de técnicas para mantener la calma y el equilibrio emocional."
    },
    {
      id: 7,
      text: "Si una situación me genera estrés, la suspendo y prefiero hacer otra cosa.",
      category: "distraccion",
      tip: "Permítete pausar y cambiar de actividad para evitar el estrés excesivo.",
      meaning: "Distracción: Saber cuándo detenerse y cambiar de actividad para proteger el bienestar emocional."
    },
    {
      id: 8,
      text: "Evito ciertas situaciones de las cuales tengo certeza que me pueden generar malestar.",
      category: "anticipacion",
      tip: "Reconoce y evita situaciones que sabes que te afectan negativamente.",
      meaning: "Anticipación: Capacidad de prever y evitar situaciones que pueden causar malestar."
    },
    {
      id: 9,
      text: "Cuando una situación me causa mucha alegría o satisfacción, comprendo qué factores incidieron en el resultado de esto, para replicarlos.",
      category: "redireccionamiento",
      tip: "Identifica los factores positivos y busca replicarlos en el futuro.",
      meaning: "Redireccionamiento: Analizar los factores que generan emociones positivas para repetirlos."
    },
    {
      id: 10,
      text: "Realizo prácticas de meditación para transformar mis emociones.",
      category: "respiracion",
      tip: "Incluye la meditación en tu rutina para transformar emociones negativas.",
      meaning: "Respiración: Uso de la meditación como herramienta para la gestión emocional."
    },
    {
      id: 11,
      text: "Sé qué hacer para no exasperarme cuando hay situaciones que me pueden generar malestar.",
      category: "distraccion",
      tip: "Desarrolla estrategias personales para mantener la calma ante el malestar.",
      meaning: "Distracción: Tener recursos personales para evitar la exasperación en situaciones difíciles."
    },
    {
      id: 12,
      text: "Cuando algo me molesta, prefiero quedarme callado/a.",
      category: "anticipacion",
      tip: "Evalúa si expresar tus emociones puede ayudarte a gestionarlas mejor.",
      meaning: "Anticipación: Decidir cuándo es mejor guardar silencio para evitar conflictos o malestar."
    },
  ];

  // Filtrar solo las estrategias donde la respuesta fue 'no'
  const strategiesToShow = strategies.filter(
    (question) => responses[question.id] === "no"
  );

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">
        Resultados de Estrategias de Mejora
      </h2>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Estrategias asociadas a tus respuestas "No"
      </h3>
      {strategiesToShow.length > 0 ? (
        <div className="space-y-4">
          {strategiesToShow.map((question) => (
            <div key={question.id} className="p-4 rounded-lg bg-red-100">
              <p className="font-semibold text-gray-800 mb-2">{question.text}</p>
              <p className="text-sm text-red-700 mb-1">
                <span className="font-bold capitalize">{question.category}</span>: {question.meaning}
              </p>
              <p className="text-sm text-gray-700 italic">Tip de mejora: {question.tip}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-700 mb-6">
          No seleccionaste ninguna estrategia con respuesta "No". ¡Sigue así!
        </p>
      )}
    </div>
  );
};

export default ResultsUser;
