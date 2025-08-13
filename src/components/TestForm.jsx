import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Question from "./Question";
import Timer from "./Timer";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";

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

const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const TestForm = ({ userName }) => {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false); // Nuevo estado
  const navigate = useNavigate();

  useEffect(() => {
    setShuffledQuestions(shuffleArray([...strategies]));
  }, []);

  const handleAnswer = (questionId, answer) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const calculateResults = () => {
    const categories_count = {
      redireccionamiento: 0,
      respiracion: 0,
      distraccion: 0,
      anticipacion: 0,
    };
    Object.keys(responses).forEach((id) => {
      const questionId = parseInt(id);
      const question = strategies.find((q) => q.id === questionId);

      if (question && responses[id] === "no") {
        categories_count[question.category]++;
      }
    });
    return categories_count;
  };

  const generateUniqueCode = () => {
    return (
      new Date().getTime().toString(36).substr(0, 5).toUpperCase() +
      Math.random().toString(36).substr(2, 4).toUpperCase()
    );
  };

  const handleSubmit = async () => {
    if (isSubmitting) return; // Evita envío múltiple
    setIsSubmitting(true);
    const uniqueCode = generateUniqueCode();
    const userResults = {
      userName,
      responses,
      categories_count: calculateResults(),
      timestamp: new Date(),
      uniqueCode,
    };

    try {
      await addDoc(collection(db, "tests_results"), userResults);
      console.log("Datos guardados con éxito en Firebase.");
      navigate("/results", { state: { userResults, uniqueCode } });
    } catch (e) {
      console.error("Error al guardar los datos: ", e);
      setIsSubmitting(false);
    }
  };

  const handleTimeout = () => {
    handleSubmit();
  };

  const handleNext = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setDirection(1);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Animación uniforme para las respuestas
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 },
    }),
  };

  const isCurrentQuestionAnswered =
    responses[shuffledQuestions[currentQuestionIndex]?.id] !== undefined;
  const isLastQuestion = currentQuestionIndex === shuffledQuestions.length - 1;

  if (shuffledQuestions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-600">Cargando preguntas...</p>
      </div>
    );
  }

  // Confirmación antes de finalizar
  const handleFinishClick = () => {
    if (
      window.confirm(
        "¿Deseas finalizar el test y ver tus resultados? Si quieres corregir alguna respuesta, presiona Cancelar."
      )
    ) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl min-h-[36rem] flex flex-col justify-between">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Hola, {userName}
          </h1>
          <div className="flex justify-center">
            <Timer duration={15 * 60} onTimeout={handleTimeout} />
          </div>
          <div className="text-center text-lg text-gray-600 font-medium mt-2">
            Pregunta {currentQuestionIndex + 1} de {shuffledQuestions.length}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full min-h-[18rem] sm:min-h-[20rem] md:min-h-[22rem] mb-4">
          <div className="w-full">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentQuestionIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <Question
                  question={shuffledQuestions[currentQuestionIndex]}
                  onAnswer={handleAnswer}
                  selectedAnswer={
                    responses[shuffledQuestions[currentQuestionIndex]?.id]
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-lg py-4 px-2 flex flex-col sm:flex-row justify-between items-center gap-2 mt-2">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0 || isSubmitting}
            className="bg-gray-400 text-white py-2 px-6 rounded-full disabled:bg-gray-300 transition duration-300 font-semibold shadow hover:bg-gray-500 w-full sm:w-auto"
          >
            Anterior
          </button>
          {isLastQuestion ? (
            <button
              onClick={handleFinishClick}
              disabled={!isCurrentQuestionAnswered || isSubmitting}
              className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700 transition duration-300 disabled:bg-gray-400 font-semibold shadow w-full sm:w-auto"
            >
              Finalizar Test
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered || isSubmitting}
              className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700 transition duration-300 disabled:bg-gray-400 font-semibold shadow w-full sm:w-auto"
            >
              Siguiente
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestForm;
