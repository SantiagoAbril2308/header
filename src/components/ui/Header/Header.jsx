'use client'; 
import { useState } from 'react';
import Link from "next/link";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";


export default function Header(){
  // Para controlar la apertura/cierre del menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 
  return (
    <header className="relative bg-cover bg-center text-white shadow-md p-4 min-h-60"
    style={{
      backgroundImage: "url('portal.png')",
      backgroundColor: "oklch(60% 0.118 184.704)", 
      }}>

    <div className="relative z-10 p-15 min-h-48">
      <nav className="relative z-10 flex justify-between items-center mx-auto">


     
        <div className="flex-shrink-0">
          <Link href="/inicio" className="text-2xl font-bold hover:text-black transition duration-300">
            Mi Tienda
          </Link>
        </div>

        
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex space-x-6 mx-auto">
            <li>
              <Link href="/inicio" className={`font-sans text-xl font-bold hover:text-black transition duration-300`}>
                Inicio
              </Link>
            </li>
          </ul>
        </div>

        
        <div className="flex items-center space-x-4">
          <Link href="/carrito" className={`flex items-center hover:text-black transition duration-300`}>
            <FaShoppingCart size={24} />
            <span className="ml-1 hidden sm:inline">Carrito</span>
          </Link>
          <Link href="/login" className={`flex items-center hover:text-black transition duration-300`}>
            <FaUserCircle size={24} />
            <span className="ml-1 hidden sm:inline">Login</span>
          </Link>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {/* Icono de hamburguesa o X */}
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg> 
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            )}
          </button>
        </div>
      </nav>
      </div>

      <div 
        className={`md:hidden bg-[oklch(60%_0.118_184.704)] ${isMenuOpen ? 'block' : 'hidden'} border-t border-yellow-200 mt-4 pt-4`}
      >
        <ul className="flex flex-col space-y-3">
          <li>
            <Link 
              href="/inicio" 
              className={`block p-2 text-xl font-bold hover:text-amber-400`}
              onClick={() => setIsMenuOpen(false)} 
            >
              Inicio
            </Link>
          </li>
          {/* Opcional: Si quieres Carrito/Login en el menú desplegable */}
          <li className="p-2 border-t border-yellow-200">
            <Link href="/carrito" className={`block hover:text-amber-400`} onClick={() => setIsMenuOpen(false)}>Carrito</Link>
          </li>
          <li className="p-2">
            <Link href="/login" className={`block hover:text-amber-400`} onClick={() => setIsMenuOpen(false)}>Login</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};