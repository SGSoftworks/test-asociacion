import React from "react";

const ResultsUser = ({ userResults }) => {
  const { userName, responses } = userResults;

  // Estrategias y significados
  const strategies = [
    {
      id: 1,
      text: "Cuando una persona se enoja conmigo, busco entender las razones por las que está enojada.",
      category: "redireccionamiento",
      tip: "Concéntrate en lo que la otra persona dice, no en lo que vas a responder, intenta reconocer lo que siente, incluso si no estás de acuerdo con su punto de vista, Haz el ejercicio mental: '¿Cómo me sentiría yo si estuviera en su situación?'",
      meaning:
        "Redireccionamiento: Capacidad de enfocar la atención en comprender y modificar la causa de una emoción, en vez de reaccionar impulsivamente.",
    },
    {
      id: 2,
      text: "Cuando siento enojo o rabia, tomo una respiración profunda antes de actuar.",
      category: "respiracion",
      tip: "'Realiza ejercicios de respiración consciente para calmarte antes de responder, toma el tiempo para reconocer la situación y vuelve al dialogo cuando estes listo (a)'",
      meaning:
        "Respiración: Uso de técnicas de respiración para regular y transformar emociones intensas.",
    },
    {
      id: 3,
      text: "Logro anticipar situaciones que me pueden generar emociones desagradables y tomo acciones para evitar que estas emociones escalen.",
      category: "distraccion",
      tip: "Conócete y detecta tus detonantes, El cuerpo suele avisar antes que la mente: tensión muscular, respiración rápida, sudoración, calor en la cara, detectarlas temprano te da tiempo para regularte, Si sabes que un lugar, horario o persona te afecta, busca opciones para reducir la exposición o modificar el contexto.",
      meaning:
        "Distracción: Capacidad de anticipar y evitar situaciones que pueden generar emociones negativas.",
    },
    {
      id: 4,
      text: "Cuando algo me causa malestar, busco una actividad para distraerme: ver películas, comer algo dulce u otras.",
      category: "anticipacion",
      tip: "Busca actividades saludables que te ayuden a cambiar el foco de atención e intenta modificar los pensamientos negativos por positivos.",
      meaning:
        "Anticipación: Buscar alternativas para distraerse y evitar que las emociones negativas dominen la situación.",
    },
    {
      id: 5,
      text: "Cuando siento frustración, busco comprender cuáles son los obstáculos que me están impidiendo lograr mi objetivo.",
      category: "redireccionamiento",
      tip: "Detecta los pensamientos asociados: frases como “Esto no es justo”, “No debería pasar”, “Nunca va a funcionar”, Identifica expectativas no cumplidas: gran parte de la frustración nace cuando la realidad no coincide con lo que esperabas, Revisa tu nivel de control: pregúntate “¿Esto depende de mí o no?”. Si no depende de ti, la estrategia es aceptar y ajustar.",
      meaning:
        "Redireccionamiento: Capacidad de analizar y modificar el origen de la emoción para lograr el objetivo.",
    },
    {
      id: 6,
      text: "Hago ejercicios de respiración recurrentes para encontrar la calma.",
      category: "respiracion",
      tip: "Dedica unos minutos al día a ejercicios de respiración y relajación convierte estas técnicas en un hábito aplicar al final del día.",
      meaning:
        "Respiración: Práctica regular de técnicas para mantener la calma y el equilibrio emocional.",
    },
    {
      id: 7,
      text: "Si una situación me genera estrés, la suspendo y prefiero hacer otra cosa.",
      category: "distraccion",
      tip: "Permítete pausar y cambiar de actividad para evitar el estrés excesivo, cuando te calmas logras concentrarte y pensar mejor.",
      meaning:
        "Distracción: Saber cuándo detenerse y cambiar de actividad para proteger el bienestar emocional.",
    },
    {
      id: 8,
      text: "Evito ciertas situaciones de las cuales tengo certeza que me pueden generar malestar.",
      category: "anticipacion",
      tip: "Conócete y detecta tus detonantes, Pregúntate: “¿Qué pasó antes, durante y después la última vez que me sentí así?”.Crea frases ancla o recordatorios mentales que te ayuden a mantener la calma: “Esto pasará”, “Puedo manejarlo”, “Respira y piensa”.",
      meaning:
        "Anticipación: Capacidad de prever y evitar situaciones que pueden causar malestar.",
    },
    {
      id: 9,
      text: "Cuando una situación me causa mucha alegría o satisfacción, comprendo qué factores incidieron en el resultado de esto, para replicarlos.",
      category: "redireccionamiento",
      tip: "Observa tus momentos de energía alta y sonrisa genuina, Identifica tus actividades “flujo” Son esas que te absorben tanto que pierdes la noción del tiempo (pintar, bailar, cocinar, conversar…), Son un gran indicador de lo que tu mente y corazón disfrutan.",
      meaning:
        "Redireccionamiento: Analizar los factores que generan emociones positivas para repetirlos.",
    },
    {
      id: 10,
      text: "Realizo prácticas de meditación para transformar mis emociones.",
      category: "respiracion",
      tip: " Incluye la meditación en tu rutina para transformar emociones negativas y así retomar el control de tu mente y cuerpo.",
      meaning:
        "Respiración: Uso de la meditación como herramienta para la gestión emocional.",
    },
    {
      id: 11,
      text: "Sé qué hacer para no exasperarme cuando hay situaciones que me pueden generar malestar.",
      category: "distraccion",
      tip: "Usa el “tiempo fuera” mental, Dite a ti mismo frases como: “No necesito responder ahora”, “Voy a esperar antes de actuar”, Evita el lenguaje hiriente, Detecta y cuestiona pensamientos extremos cambia “¡Todo está mal!” por “Esto me molesta, pero puedo buscar soluciones” Apártate unos minutos de la situación para evitar reacciones impulsivas..",
      meaning:
        "Distracción: Tener recursos personales para evitar la exasperación en situaciones difíciles.",
    },
    {
      id: 12,
      text: "Cuando algo me molesta, prefiero quedarme callado/a.",
      category: "anticipacion",
      tip: "Si la ira es intensa, haz una pausa antes de hablar. Incluso decir: 'Necesito unos minutos para calmarme y luego seguimos' ayuda a prevenir palabras impulsivas, Usa la respiración profunda, bebe agua o cambia de espacio antes de iniciar la conversación, Controla el tono de voz y el volumen, Escucha aunque estés molesto (a), deja que la otra persona explique su parte.",
      meaning:
        "Anticipación: Decidir cuándo es mejor guardar silencio para evitar conflictos o malestar.",
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
        Estrategias asociadas a tus respuestas "Negativas"
      </h3>
      {strategiesToShow.length > 0 ? (
        <div className="space-y-4">
          {strategiesToShow.map((question) => (
            <div key={question.id} className="p-4 rounded-lg bg-red-100">
              <p className="font-semibold text-gray-800 mb-2">
                {question.text}
              </p>
              <p className="text-sm text-red-700 mb-1">
                <span className="font-bold capitalize">
                  {question.category}
                </span>
                : {question.meaning}
              </p>
              <p className="text-sm text-gray-700 italic">
                Tip de mejora: {question.tip}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-700 mb-6">
          No seleccionaste ninguna estrategia con respuesta "Negativa". ¡Sigue así!
        </p>
      )}
    </div>
  );
};

export default ResultsUser;
