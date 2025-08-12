import React from "react";

const Question = ({ question, onAnswer, selectedAnswer }) => {
  if (!question) {
    return null;
  }

  const handleButtonClick = (answer) => {
    onAnswer(question.id, answer);
  };

  return (
    <div className="p-4">
      <p className="text-xl text-gray-800 font-semibold text-center mb-6">
        {question.text}
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => handleButtonClick("si")}
          className={`py-2 px-6 rounded-full text-lg transition duration-300
            ${
              selectedAnswer === "si"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          Sí
        </button>
        <button
          onClick={() => handleButtonClick("no")}
          className={`py-2 px-6 rounded-full text-lg transition duration-300
            ${
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
