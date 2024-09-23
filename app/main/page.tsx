"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronRight,
  Star,
  Clock,
  Shield,
  CreditCard,
} from "lucide-react";
import Image from "next/image";
import ServerList from "../components/ServerList";
import Navbar from "@/components/navbar";
import DiscordWidget from "@/components/DiscordWidget";

export default function LandingPage() {
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

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.slice(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center justify-center"
        id="home"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/bg.jpeg')",
            filter: "brightness(0.4)",
          }}
        ></div>

        <img
          src="/gifs/Coin-1.gif"
          alt="Overlay GIF"
          className="absolute z-20 object-cover w-1/5 sm:w-1/4 md:w-1/6 lg:w-1/12 xl:w-1/12"
          style={{
            height: "auto",
            top: "calc(35% - 80px)",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div className="mt-10 container mx-auto relative z-10 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className=" mt-20 text-5xl md:text-7xl font-bold mb-4 text-yellow-500"
            >
              EMIR2-WON
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              EN GÜVENILIR METIN2 YANG MAĞAZASI
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mb-8 text-xl"
            >
              Hızlı teslimat, uygun fiyatlar ve 7/24 müşteri desteği ile Metin2
              dünyasında bir adım öne geçin!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="space-y-4 md:space-y-0 md:space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#D97706" }}
                onClick={() => {
                  window.open("https://discord.com", "_blank");
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto bg-yellow-600 text-white font-bold py-3 px-8 rounded-full transition duration-300"
              >
                HEMEN SATIN AL
              </motion.button>
              <motion.button
                onClick={() => {
                  const element = document.getElementById("shop");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#FBBF24",
                  color: "#1F2937",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto border-2 border-yellow-500 text-yellow-500 font-bold py-3 px-8 rounded-full transition duration-300"
              >
                SUNUCULARI İNCELE
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="about"
        className="py-20 bg-gray-800"
      >
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-yellow-500">
            Neden EMIR2-WON?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Clock size={48} className="text-yellow-500 mb-4" />,
                title: "Anında Teslimat",
                description:
                  "Satın aldığınız Yang'lar dakikalar içinde hesabınıza aktarılır.",
              },
              {
                icon: <Shield size={48} className="text-yellow-500 mb-4" />,
                title: "%100 Güvenli",
                description:
                  "SSL korumalı altyapımız ile ödemeleriniz ve kişisel bilgileriniz güvende.",
              },
              {
                icon: <CreditCard size={48} className="text-yellow-500 mb-4" />,
                title: "Çoklu Ödeme Seçeneği",
                description:
                  "Kredi kartı, banka havalesi ve diğer popüler ödeme yöntemleriyle ödemelerinizi kolayca yapın.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-700 p-8 rounded-lg shadow-lg hover:shadow-yellow-500/20 transition duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-gray-900"
        id="shop"
      >
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-yellow-500">
            Popüler Sunucular
          </h2>
          <ServerList />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative py-20 bg-gray-800"
        id="faq"
      >
        <div className="container mx-auto text-center px-4 relative">
          <img
            src="/images/saman.png"
            alt="FAQ"
            className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 object-cover"
            style={{ width: "30%", height: "auto" }}
          />

          <img
            src="/images/saman.png"
            alt="FAQ"
            className="lg:hidden block mx-auto mb-12"
            style={{ width: "80%", height: "auto" }}
          />
          <img
            src="/images/Sura.webp"
            alt="FAQ"
            className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 object-cover"
            style={{ width: "30%", height: "auto" }}
          />

          <div className="lg:pl-1/3">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-yellow-500">
                Sıkça Sorulan Sorular
              </h2>
              <div className="space-y-8 max-w-3xl mx-auto">
                {[
                  {
                    question: "Yang'lar ne kadar sürede hesabıma aktarılır?",
                    answer:
                      "Ödemeniz onaylandıktan sonra genellikle 5-15 dakika içerisinde Yang'larınız hesabınıza aktarılır.",
                  },
                  {
                    question: "Hangi ödeme yöntemlerini kullanabilirim?",
                    answer:
                      "Kredi kartı, banka havalesi, EFT ve popüler online ödeme sistemlerini kullanabilirsiniz.",
                  },
                  {
                    question: "Hesap bilgilerim güvende mi?",
                    answer:
                      "Evet, tüm işlemleriniz SSL korumalı altyapımız üzerinden gerçekleştirilir ve bilgileriniz şifrelenerek saklanır.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-gray-700 p-6 rounded-lg text-left"
                  >
                    <h3 className="text-xl font-semibold mb-2 text-yellow-500">
                      {item.question}
                    </h3>
                    <p className="text-gray-300">{item.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <img
            src="/images/Sura.webp"
            alt="FAQ"
            className="lg:hidden block mx-auto mt-12"
            style={{ width: "80%", height: "auto" }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-gray-900"
        id="contact"
      >
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-yellow-500">
            Bize Ulaşın
          </h2>
          <div className="max-w-3xl mx-auto">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Adınız"
                  className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                  type="email"
                  placeholder="E-posta Adresiniz"
                  className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <input
                type="text"
                placeholder="Konu"
                className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <textarea
                placeholder="Mesajınız"
                rows={5}
                className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              ></textarea>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#D97706" }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto bg-yellow-600 text-white font-bold py-3 px-8 rounded-full transition duration-300"
              >
                Gönder
              </motion.button>
            </motion.form>
          </div>
        </div>
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-black py-12"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-yellow-500 mb-4">
                EMIR2-WON
              </h3>
              <p className="text-gray-400">
                En güvenilir ve hızlı Metin2 Yang satış platformu.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-yellow-500 mb-4">
                Hızlı Linkler
              </h4>
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-yellow-500 transition duration-300"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-yellow-500 mb-4">
                İletişim
              </h4>
              <p className="text-gray-400 mb-2">E-posta: info@emir2-won.com</p>
              <p className="text-gray-400 mb-2">Telefon: +90 123 456 7890</p>
              <div className="flex space-x-4 mt-4">
                {["Facebook", "Twitter", "Instagram", "Discord"].map(
                  (social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="text-gray-400 hover:text-yellow-500 transition duration-300"
                    >
                      {social}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 EMIR2-WON. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
