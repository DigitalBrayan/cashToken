import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header/index";
import Sidebar from "../components/Sidebar/index";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  // Condiciona la visualización del sidebar basado en la ruta
  const shouldHideSidebar = pathname === "/home/panel"; // Verifica si estás en la ruta del Dashboard

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark h-screen custom-scrollbar overflow-auto">
      <div className="flex flex-col h-full">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          className="fixed w-full z-50"
        />
        <div className={`flex flex-1 mt-10 lg:mt-5 ${shouldHideSidebar ? "" : "lg:ml-3"} overflow-hidden`}>
          {!shouldHideSidebar && (
            <>
              {/* Botón para mostrar/ocultar el sidebar */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md lg:hidden"
              >
                {sidebarOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                )}
              </button>
              {/* Sidebar visible en pantallas grandes */}
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                className={`lg:w-70 xl:w-60 lg:block ${
                  sidebarOpen ? "block" : "hidden"
                } lg:static fixed inset-y-0 z-40 transform lg:translate-x-0 ${
                  sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out`}
              />
            </>
          )}
          <div className={`flex-1 min-w-5 px-0  ${shouldHideSidebar ? "pr-2 pl-2" : "pr-2"}`}>
            <div className="mx-auto overflow-auto custom-scrollbar max-w-screen-3xl h-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
