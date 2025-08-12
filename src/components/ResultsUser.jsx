import React from "react";

const ResultsUser = ({ userResults }) => {
  const { userName, responses } = userResults;

  // Array de estrategias con las respuestas correctas
  const strategies = [
    {
      id: 1,
      text: "Cuando una persona se enoja conmigo, busco entender las razones por las que está enojada.",
      category: "redireccionamiento",
      correct: "si",
    },
    {
      id: 2,
      text: "Cuando siento enojo o rabia, tomo una respiración profunda antes de actuar.",
      category: "respiracion",
      correct: "si",
    },
    {
      id: 3,
      text: "Logro anticipar situaciones que me pueden generar emociones desagradables y tomo acciones para evitar que estas emociones escalen.",
      category: "distraccion",
      correct: "si",
    },
    {
      id: 4,
      text: "Cuando algo me causa malestar, busco una actividad para distraerme: ver películas, comer algo dulce u otras.",
      category: "distraccion",
      correct: "si",
    },
    {
      id: 5,
      text: "Cuando siento frustración, busco comprender cuáles son los obstáculos que me están impidiendo lograr mi objetivo.",
      category: "redireccionamiento",
      correct: "si",
    },
    {
      id: 6,
      text: "Hago ejercicios de respiración recurrentes para encontrar la calma.",
      category: "respiracion",
      correct: "si",
    },
    {
      id: 7,
      text: "Si una situación me genera estrés, la suspendo y prefiero hacer otra cosa.",
      category: "distraccion",
      correct: "si",
    },
    {
      id: 8,
      text: "Evito ciertas situaciones de las cuales tengo certeza que me pueden generar malestar.",
      category: "anticipacion",
      correct: "si",
    },
    {
      id: 9,
      text: "Cuando una situación me causa mucha alegría o satisfacción, comprendo qué factores incidieron en el resultado de esto, para replicarlos.",
      category: "redireccionamiento",
      correct: "si",
    },
    {
      id: 10,
      text: "Realizo prácticas de meditación para transformar mis emociones.",
      category: "respiracion",
      correct: "si",
    },
    {
      id: 11,
      text: "Sé qué hacer para no exasperarme cuando hay situaciones que me pueden generar malestar.",
      category: "distraccion",
      correct: "si",
    },
    {
      id: 12,
      text: "Cuando algo me molesta, prefiero quedarme callado/a.",
      category: "anticipacion",
      correct: "no", // <-- La respuesta correcta para esta es 'no'.
    },
  ];

  // Filtramos las preguntas donde la respuesta del usuario NO coincide con la respuesta correcta
  const strategiesToImprove = strategies.filter(
    (question) => responses[question.id] !== question.correct
  );

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">
        ¡Felicidades, {userName}! 🎉
      </h2>

      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Estrategias a Mejorar
      </h3>

      {strategiesToImprove.length > 0 ? (
        <p className="text-lg text-gray-700 mb-6">
          Aquí están las estrategias en las que hay oportunidades de mejora.
          Practicar estas habilidades puede ayudarte a gestionar mejor tus
          emociones.
        </p>
      ) : (
        <p className="text-lg text-gray-700 mb-6">
          ¡Excelente! Respondiste de manera óptima a todas las estrategias. Esto
          indica una gran capacidad de gestión emocional.
        </p>
      )}

      {strategiesToImprove.length > 0 && (
        <div className="space-y-4">
          {strategiesToImprove.map((question) => (
            <div key={question.id} className="p-4 rounded-lg bg-red-100">
              <p className="font-semibold text-gray-800">{question.text}</p>
              <p className="mt-1 text-sm italic text-red-700">
                Oportunidad de mejora en la estrategia de{" "}
                <span className="font-bold capitalize">
                  {question.category}
                </span>
                .
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsUser;
