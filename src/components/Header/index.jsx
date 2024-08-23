import React, { useEffect } from 'react';
import { useAuth } from '../../authentication/AuthContext';
import {jwtDecode} from 'jwt-decode';
import LogoIcon from '../../assets/token.jpeg';
import desLogouth from '../../assets/token.jpeg';
import { Link } from 'react-router-dom';
import { BiExpand, BiHelpCircle } from 'react-icons/bi';

const Header = () => {
  const { userName, setUserName, userRole, setUserRole, logout, setSidebarOpen, sidebarOpen } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   console.log('Token en localStorage:', token);

  //   if (token) {
  //     try {
  //       const decodedToken = jwtDecode(token);
  //       console.log('Token decodificado:', decodedToken);
  //       setUserName(decodedToken.name);
  //       setUserRole(decodedToken.role[0]); 
  //     } catch (error) {
  //       console.error('Error al decodificar el token:', error);
  //       window.location.href = '/login'; 
  //     }
  //   } else {
  //     window.location.href = '/login'; 
  //   }
  // }, [setUserName, setUserRole]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const screen = () => {
    console.log('Pantalla grande');
  };

  return (
    <header className="sticky top-4 z-999 flex justify-center items-center h-[50px] w-[100%] max-w-[99%] bg-[#07110e] text-white border drop-shadow-1 rounded-tl-lg rounded-tr-lg dark:bg-boxdark dark:drop-shadow-none mx-auto">
      <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            {/* Icono de menú */}
          </button>
          <div className="flex items-center">
            <Link className="block flex-shrink-0 lg:hidden bg-black z-9999" to="/">
              <img src={LogoIcon} alt="Logo" className="h-10" />
            </Link>
            <h1 className="ml-2">CREACION DE ENCUESTAS</h1>
          </div>
        </div>
        <div className="flex">
          <button onClick={screen}>
            <BiExpand className="size-6 mr-5" />
          </button>
          <Link to="#">
            <BiHelpCircle className="size-6 mr-10" />
          </Link>
        </div>
        <div className="hidden sm:flex flex-grow">
          <h1 className="flex items-center text-lg font-medium text-white">
          CREACION DE ENCUESTAS
          </h1>
        </div>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-white cursor-pointer flex items-center ml-2 lg:ml-0"
          >
            <img src={desLogouth} alt="Deslogueo" className="h-8 mx-3 rounded-full bg-white" />
            <div className="flex-col">
              <p className="text-start">{userName}</p>
              <p className="text-start">{userRole}</p>
            </div>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
              <Link
                to="/gestion-usuario"
                className="block px-4 py-2 text-black hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Gestión de Usuario
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
              >
                Salir
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
