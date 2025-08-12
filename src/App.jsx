import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import AdminPage from './pages/AdminPage';
import { AuthProvider } from './context/AuthContext'; // Asumiendo que crearás este contexto

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="font-sans antialiased text-gray-800">
          <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
              Test de Estrategias
            </Link>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/admin" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                    Admin
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;