"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "react-feather";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { href: "#home", text: "ANA SAYFA" },
    { href: "#about", text: "HAKKIMIZDA" },
    { href: "#shop", text: "SUNUCULAR" },
    { href: "#faq", text: "SSS" },
    { href: "#contact", text: "İLETİŞİM" },
  ];

  return (
    <nav className=" top-0 left-0 w-full z-50 transition-transform duration-300 backdrop-blur-xl bg-opacity-70 $">
      <div className="container mx-auto flex justify-between items-center px-4 py-8">
        <div className="flex items-center space-x-4">
          <motion.img
            src="/logo.png"
            alt="Logo"
            className="w-12 h-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white"
          >
            EMIR2-WON
          </motion.div>
        </div>
        <div className="hidden md:flex space-x-8 items-center text-2xl">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              className={`hover:text-yellow-500 transition duration-300 ${
                activeSection === item.href.slice(1)
                  ? "text-yellow-500"
                  : "text-white"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.text}
            </motion.a>
          ))}
        </div>
        <div className="hidden md:flex">
          <motion.a
            href="https://discord.com"
            target="_blank"
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center transition duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="/discord-icon.png"
              alt="Discord"
              className="mr-2"
              style={{
                width: "40px",
                height: "40px",
              }}
            />
            DISCORD
          </motion.a>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-800 bg-opacity-20"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className="block py-3 px-4 text-white hover:bg-gray-700 transition duration-300"
                onClick={toggleMenu}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.text}
              </motion.a>
            ))}
            <motion.a
              href="https://discord.com"
              target="_blank"
              className="block py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white text-center rounded-lg transition duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              DISCORD
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
