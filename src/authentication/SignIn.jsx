import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/AuthContext.jsx";
import Logopng from "../assets/cashToken2.png";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://t1q3t8t2-8000.use2.devtunnels.ms/perfil/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.token;
        const userId = responseData.user.id.toString();
        const userRole = responseData.user.perfil.toString();

        setToken(token, userId, userRole);
        navigate("/home/panel");
      } else {
        setLoginError("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al hacer la solicitud", error);
      setLoginError("Error al iniciar sesión. Inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-screen px-4">
     
      <div className="bg-[#0b3d241e] shadow-md w-full max-w-md rounded-lg mt-12">
      <div className=" h-22">
        <img
          src={Logopng}
          alt="Logo"
          className="w-64 md:w-72 lg:w-72 mx-auto "
          style={{ filter: "drop-shadow(0 0 0 #10533325)" }}
        />
      </div>
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <label className="block text-gray-700 font-medium">Usuario</label>
              <input
                type="text"
                placeholder="Usuario"
                {...register("username", {
                  required: "El usuario es obligatorio",
                })}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-700`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Contraseña"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                })}
                className={`w-full px-4 py-2 mb-5 border rounded-lg ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-700`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#0a4729a1] uppercase font-bold border border-green-900 hover:bg-green-800 text-white py-2 rounded-lg transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Ingresando..." : "Ingresar"}
            </button>

            {loginError && (
              <p className="text-red-500 text-sm text-center mt-2">
                {loginError}
              </p>
            )}

            <div className="text-center mt-4">
              <p className="text-gray-600">
                ¿No tienes cuenta?{" "}
                <Link
                  to="/signup"
                  className="text-green-600 hover:text-green-900 font-bold"
                >
                  Regístrate
                </Link>
              </p>
              <p className="text-gray-600 mt-2">
                <Link
                  to="/forgotPassword"
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
