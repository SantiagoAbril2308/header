"use client"

import Link from "next/link";
import Image from "next/image"


import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

const banner = '/hola.jpg'

export default function Header(){
  return (
    <header className="bg-gray-800 text-white p-4">


      <nav className="flex justify-between text-white mx-4 mt-6 relative">
        
        <div className="flex-1">
          <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition duration-300">
            Mi Tienda
          </Link>
        </div>

        <div className="flex-1 text-center hidden md:flex">
          <ul className="flex space-x-6 mx-auto">
            <li>
              <Link href="/inicio" className="hover:text-gray-300 transition duration-300">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/Hombre" className="hover:text-gray-300 transition duration-300">
                Hombre
              </Link>
            </li>
            <li>
              <Link href="/Mujeres" className="hover:text-gray-300 transition duration-300">
                Mujeres
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex-1 flex justify-end space-x-4">
          <Link href="/carrito" className="flex items-center hover:text-gray-300 transition duration-300">
            <FaShoppingCart size={24} />
            <span className="ml-1 hidden sm:inline">Carrito</span>
          </Link>
          <Link href="/login" className="flex items-center hover:text-gray-300 transition duration-300">
            <FaUserCircle size={24} />
            <span className="ml-1 hidden sm:inline">Login</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};
