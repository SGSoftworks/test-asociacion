import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const GeneralStats = ({ userResults }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    percentages: {},
  });
  const [lastUpdate, setLastUpdate] = useState(0);

  // Calcula la categoría del usuario con más respuestas 'sí'
  const getUserTopCategory = () => {
    if (!userResults || !userResults.categories_count) return null;
    const { categories_count } = userResults;
    let maxCount = -1;
    let topCategory = null;

    for (const category in categories_count) {
      if (categories_count[category] > maxCount) {
        maxCount = categories_count[category];
        topCategory = category;
      }
    }
    return topCategory;
  };

  const userTopCategory = getUserTopCategory();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tests_results"),
      (snapshot) => {
        const allResults = snapshot.docs.map((doc) => doc.data());

        const totalUsers = allResults.length;
        const categoryCounts = {
          redireccionamiento: 0,
          respiracion: 0,
          distraccion: 0,
          anticipacion: 0,
        };

        allResults.forEach((doc) => {
          for (const category in doc.categories_count) {
            categoryCounts[category] += doc.categories_count[category];
          }
        });

        const percentages = {};
        const totalPositiveResponses = Object.values(categoryCounts).reduce(
          (sum, count) => sum + count,
          0
        );

        for (const category in categoryCounts) {
          percentages[category] =
            totalPositiveResponses > 0
              ? (
                  (categoryCounts[category] / totalPositiveResponses) *
                  100
                ).toFixed(2)
              : 0;
        }

        setStats({ totalUsers, percentages });
        setLastUpdate(new Date().toLocaleTimeString());
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date().toLocaleTimeString());
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">
        Estadísticas Generales 📈
      </h2>
      <p className="text-lg text-gray-700 mb-4">
        Número de personas que han respondido:{" "}
        <span className="font-bold">{stats.totalUsers}</span>
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Última actualización: {lastUpdate}
      </p>
      {userTopCategory && (
        <div className="bg-yellow-100 p-4 rounded-lg mb-6 text-yellow-800">
          <p className="text-lg font-semibold">¡Tus Resultados Destacan!</p>
          <p>
            Eres parte del{" "}
            <span className="font-bold">
              {stats.percentages[userTopCategory]}%
            </span>{" "}
            de personas que sobresalen en la estrategia de{" "}
            <span className="font-bold capitalize">{userTopCategory}</span>.
          </p>
        </div>
      )}
      <div className="space-y-4">
        {Object.keys(stats.percentages).map((category) => (
          <div key={category}>
            <div className="flex justify-between font-semibold">
              <span className="capitalize">{category}</span>
              <span>{stats.percentages[category]}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
              <div
                className="bg-indigo-500 h-4 rounded-full"
                style={{ width: `${stats.percentages[category]}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralStats;
