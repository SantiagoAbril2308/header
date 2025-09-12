"use client"

import Link from "next/link";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        
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
              <Link href="/hombre" className="hover:text-gray-300 transition duration-300">
                Hombre
              </Link>
            </li>
            <li>
              <Link href="/mujeres" className="hover:text-gray-300 transition duration-300">
                Mujeres
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex-1 flex justify-end space-x-4">
          <Link href="/cart" className="flex items-center hover:text-gray-300 transition duration-300">
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

export default Header;