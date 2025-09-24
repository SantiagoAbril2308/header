"use client";

import React, { useState } from 'react';
import Image from "next/image"
const TailwindRegisterComponent = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Intentando registrar usuario:', { username, email, password });
    // Aquí iría tu lógica de registro (API call, etc.)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-2xl max-w-5xl w-full overflow-hidden">
        {/* Columna de Imagen */}
        <div className="md:w-1/2 bg-blue-600 text-white flex items-center justify-center p-8 md:p-12">
          <div className="text-center">
            <div className="w-72 h-72 bg-blue-500 rounded-lg mx-auto mt-6 flex items-center justify-center relative overflow-hidden">
                <Image
                src="/stonks.jpg"
                    alt="Register"
                    fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
                sizes="288px"
                         />
            </div>

          </div>
        </div>

        {/* Columna del Formulario */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Crea tu cuenta</h2>
          <p className="text-gray-500 mb-8">Por favor, rellena los campos para registrarte.</p>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Usuario */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nombre de usuario
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tu nombre de usuario"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@dominio.com"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  required
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? '👁️' : '🔒'}
                </button>
              </div>
            </div>
            {/* Botón de registro */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Registrarse
            </button>
          </form>

          {/* Separador y Registro con Google */}
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">O</span>
            </div>
          </div>
          <button
            className="w-full mt-6 flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="mr-2 text-lg">G</span>
            Registrarse con Google
          </button>

          {/* Opción ya tienes cuenta */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">¿Ya tienes cuenta? </span>
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Inicia sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailwindRegisterComponent;
