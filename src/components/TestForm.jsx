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
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setShuffledQuestions(shuffleArray([...strategies]));

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
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

      if (question && responses[id] === "si") {
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

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: { duration: 0.5 },
    }),
  };

  const isCurrentQuestionAnswered =
    responses[shuffledQuestions[currentQuestionIndex]?.id] !== undefined;
  const isLastQuestion = currentQuestionIndex === shuffledQuestions.length - 1;

  if (shuffledQuestions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-xl text-gray-600">Cargando preguntas...</p> 
           {" "}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex flex-col items-center justify-center">
           {" "}
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-2xl">
               {" "}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 text-center sm:text-left">
                   {" "}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-0">
            Hola, {userName}
          </h1>
                    <Timer duration={15 * 60} onTimeout={handleTimeout} />     
           {" "}
        </div>
                       {" "}
        <div className="text-center text-lg text-gray-600 mb-6 font-medium">
                    {currentQuestionIndex + 1} de {shuffledQuestions.length}   
             {" "}
        </div>
                       {" "}
        <div className="relative overflow-hidden flex items-center justify-center min-h-[12rem]">
                   {" "}
          <AnimatePresence initial={false} custom={direction}>
                       {" "}
            <motion.div
              key={currentQuestionIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full"
            >
                           {" "}
              <Question
                question={shuffledQuestions[currentQuestionIndex]}
                onAnswer={handleAnswer}
                selectedAnswer={
                  responses[shuffledQuestions[currentQuestionIndex]?.id]
                }
              />
                         {" "}
            </motion.div>
                     {" "}
          </AnimatePresence>
                 {" "}
        </div>
                       {" "}
        <div className="flex justify-between mt-8">
                   {" "}
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-500 text-white py-2 px-6 rounded-full disabled:bg-gray-300 transition duration-300 flex-1 mx-1"
          >
                        Anterior          {" "}
          </button>
                   {" "}
          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={!isCurrentQuestionAnswered}
              className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700 transition duration-300 disabled:bg-gray-400 flex-1 mx-1"
            >
                            Finalizar Test            {" "}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered}
              className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700 transition duration-300 disabled:bg-gray-400 flex-1 mx-1"
            >
                            Siguiente            {" "}
            </button>
          )}
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default TestForm;
