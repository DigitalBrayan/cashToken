import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false); // Nuevo estado para mostrar el mensaje
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://your-api-endpoint.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.status === true) {
        setConfirmationMessage('Su información ha sido enviada. Espere la respuesta por el correo que registró.');
        setShowConfirmation(true); // Mostrar el mensaje de confirmación
        setSubmissionStatus(null);
        // Navegar si es necesario
        navigate('/success');
      } else {
        setSubmissionStatus('Error al enviar el formulario. Inténtelo nuevamente.');
        setConfirmationMessage('');
        setShowConfirmation(false);
      }
    } catch (error) {
      setSubmissionStatus('Error de red. Inténtelo nuevamente.');
      setConfirmationMessage('');
      setShowConfirmation(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh] bg-black/5  w-full">
      <div className="max-w-4xl w-full mx-auto shadow-lg rounded-lg overflow-hidden bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <section className="p-10 bg-white">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">Regístrate ahora</h2>
              <p className="mt-4 text-gray-600">Completa el formulario para registrarte.</p>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tu correo electrónico"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tu ubicación actual"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Enviar
                </button>
              </form>

              {/* Mensaje de confirmación */}
              {showConfirmation && (
                <p className="mt-4 text-green-600">{confirmationMessage}</p>
              )}
              {submissionStatus && (
                <p className="mt-4 text-red-600">{submissionStatus}</p>
              )}
            </div>
          </section>

          <section className="flex items-center justify-center bg-green-50 p-10">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-blue-800">Bienvenido a Nuestro Portal</h3>
              <p className="mt-4 text-blue-600">Estamos encantados de tenerte aquí. Por favor, proporciona la información solicitada para continuar con tu registro.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
