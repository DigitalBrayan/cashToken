import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import {
  BiSolidHome,
  BiReceipt,
  BiSolidUserPlus,
  BiSolidClinic,
  BiSolidBrightness,
} from "react-icons/bi";
import LogoIcon from "../../assets/cashToken.png";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [selectedButton, setSelectedButton] = useState(null);

  return (
    <aside
      className={`absolute left-0 top-0 z-9999 flex  border border-black/20 w-64 flex-col  duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        !sidebarOpen ? "hidden lg:block " : ""
      }`}
    >
      <button
        onClick={() => setSidebarOpen(false)}
        className="lg:hidden absolute top-0 left-0 mt-6 z-50"
      >
        <FaTimes className="h-4 w-6 text-black" />
      </button>
      
      <div className="flex items-center mt-2">
        <Link className="block flex-shrink-0" to="/">
          <img src={LogoIcon} alt="Logo" className="h-28 " />
        </Link>
      </div>
      <div className="flex flex-col flex-grow  overflow-y-auto custom-scrollbar duration-300 ease-linear">
        <nav className="flex flex-col flex-grow">
          <div className="flex flex-col mb-6 mx-4 w-100 text-black/70">
            <Link
              to="/home/principal"
              className={`mb-2 py-1 px-4 w-full flex text-left border-[#0367A6] rounded-lg  hover:bg-gray-300 transition duration-300 ease-in-out ${
                selectedButton === "Inicio" ? "border-b-4" : ""
              }`}
              onClick={() => setSelectedButton("Inicio")}
            >
              <BiSolidHome className="mr-2 size-5 font-bold text-[#0367A6]" />{" "}
              <span className="text-[#0367A6]">Inicio</span>
            </Link>
            <h3 className="mb-6  mt-4 text-sm font-medium text-bodydark2">
               ADMINISTRACION
            </h3>
            <Link
              to="/home/usuarios"
              className={`mb-2 py-1 px-4 w-full flex text-left rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out ${
                selectedButton === "Usuarios" ? "border-b-4" : ""
              }`}
              onClick={() => setSelectedButton("Usuarios")}
            >
              <BiSolidUserPlus className="mr-2 size-5 font-bold text-[#0367A6]" />{" "}
              <span className="text-[#0367A6]">Usuarios</span>
            </Link>

            <Link
              to="/home/Areas"
              className={`mb-2 py-1 px-4 w-full flex text-left border-[#0367A6] rounded-lg bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out ${
                selectedButton === "Areas Medicas" ? "border-b-4" : ""
              }`}
              onClick={() => setSelectedButton("Areas Medicas")}
            >
              <BiSolidClinic className="mr-2 size-5 font-bold text-[#0367A6]" />{" "}
              <span className="text-[#0367A6]">Areas Medicas</span>
            </Link>
            <h3 className="mb-6  mt-4 text-sm font-medium text-bodydark2">
               GESTIÓN
            </h3>
            <Link
              to="/home/encuestas"
              className={`mb-2 py-1 px-4 w-full flex text-left border-[#0367A6] rounded-lg bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out ${
                selectedButton === "Mis encuestas" ? "border-b-4" : ""
              }`}
              onClick={() => setSelectedButton("Mis encuestas")}
            >
              <BiReceipt className="mr-2 size-5 text-[#0367A6]" /> 
              <span className="text-[#0367A6]">Mis encuestas</span>
            </Link>

            {/* <Link
              to="#"
              className={`mb-2 py-4 px-4 w-full flex text-left border-black/20 rounded-lg bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out ${
                selectedButton === "Nueva encuesta" ? "border-b-4" : ""
              }`}
              onClick={() => setSelectedButton("Nueva encuesta")}
            >
              <BiReceipt className="mr-2 size-5 text-[#0367A6]" /> 
              <span className="text-[#0367A6]">jijijijijij</span>
            </Link> */}
        <h3 className="mb-6  mt-4 text-sm font-medium ">
               CONFIGURACIÓN
            </h3>
            {/* <Link
              to="#"
              className={`mb-2 py-4 px-4 w-full flex text-left border-black/20 rounded-lg bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out ${
                selectedButton === "jojojojojoj" ? "border-b-4" : ""
              }`}
              onClick={() => setSelectedButton("jojojojojoj")}
            >
              <BiReceipt className="mr-2 size-5 text-[#0367A6]" /> 
              <span className="text-[#0367A6]">jojojojojoj</span>
            </Link> */}
          </div>
        </nav>

        {/* Contenedor para la última opción, siempre en la parte inferior visible */}
        <div className="mt-auto mb-15 mx-2">
          <Link
            to="/home/Configuración"
            className={`py-1 px-4 w-full flex text-left border-black/20 rounded-lg bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out ${
              selectedButton === "Configuración del Sistema" ? "border-b-4" : ""
            }`}
            onClick={() => setSelectedButton("Configuración del Sistema")}
          >
            <BiSolidBrightness  className=" size-5 text-[#0367A6]" /> 
            <span className="text-[#0367A6]">Configuración del Sistema</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
