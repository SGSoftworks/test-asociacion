import React from "react";

const Question = ({ question, onAnswer, selectedAnswer }) => {
  if (!question) {
    return null;
  }

  const handleButtonClick = (answer) => {
    onAnswer(question.id, answer);
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <p className="text-xl sm:text-2xl text-gray-800 font-semibold text-center mb-6">
        {question.text}
      </p>
      <div className="flex flex-col sm:flex-row justify-center w-full gap-4">
        <button
          onClick={() => handleButtonClick("si")}
          className={`py-3 px-8 rounded-full font-bold transition duration-300 w-full sm:w-auto ${
            selectedAnswer === "si"
              ? "bg-green-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Sí
        </button>
        <button
          onClick={() => handleButtonClick("no")}
          className={`py-3 px-8 rounded-full font-bold transition duration-300 w-full sm:w-auto ${
            selectedAnswer === "no"
              ? "bg-red-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default Question;
