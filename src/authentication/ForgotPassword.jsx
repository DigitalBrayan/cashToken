import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/token.jpeg";
import Logopng from "../assets/cashToken2.png";

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [resetError, setResetError] = useState(null);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://t1q3t8t2-8000.use2.devtunnels.ms/perfil/recover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        navigate('/password-reset-success');
      } else {
        setResetError('Error al enviar el correo de recuperación. Inténtalo de nuevo más tarde.');
      }
    } catch (error) {
      console.error('Error al hacer la solicitud', error);
      setResetError('Error al enviar el correo de recuperación. Inténtalo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-screen bg-gray-100">
      <img
        src={Logopng}
        alt="Logo"
        className="absolute top-12 left-1/2 transform -translate-x-1/2 w-80 sm:w-32 md:w-52 lg:w-96"
        style={{ filter: "drop-shadow(0 0 0 #10533325)" }}
      />
      <div className="bg-[#0b3d241e] shadow-md w-full max-w-md rounded-lg mt-12">
        <div className="p-6">
          <h4 className="mb-9 text-2xl font-medium text-gray-800 dark:text-white text-center">
            Recuperar contraseña
          </h4>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <label className="block text-gray-700 font-medium">Correo Electrónico</label>
              <input
                type="email"
                placeholder="Correo electrónico"
                {...register('email', { required: 'El correo es obligatorio' })}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-green-700`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-[#0a4729a1] uppercase font-bold border border-green-900 hover:bg-green-800 text-white py-2 rounded-lg transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Enviar'}
            </button>
            {resetError && (
              <p className="text-red-500 text-sm text-center mt-2">{resetError}</p>
            )}
            <div className="text-center mt-4">
              <p className="text-gray-600">
                ¿Ya tienes cuenta?{' '}
                <Link to="/auth/signin" className="text-green-600 hover:text-green-900 font-bold">
                  Inicia sesión
                </Link>
              </p>
              <p className="text-gray-600 mt-2">
                ¿No tienes cuenta?{' '}
                <Link to="/auth/signup" className="text-green-600 hover:text-green-900 font-bold">
                  Regístrate
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
