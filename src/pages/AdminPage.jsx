import React from 'react';
import { useAuth } from '../context/AuthContext';
import Login from '../components/Login';
import ResultsAdmin from '../components/ResultsAdmin';

const AdminPage = () => {
  const { currentUser } = useAuth(); // Asume que tienes un contexto de autenticación.

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Panel de Administración
      </h1>
      <ResultsAdmin />
    </div>
  );
};

export default AdminPage;