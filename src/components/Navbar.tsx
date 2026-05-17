"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import Link from "next/link";
import SocialIcon from "./SocialIcon";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-4 glass shadow-lg" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="#home" className="text-2xl font-bold tracking-tighter text-gradient">
          Rohit Raj
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center space-x-4 pl-4 border-l border-white/10">
            <SocialIcon href="https://github.com/rohittt8241" icon="github" label="GitHub" />
            <SocialIcon href="https://www.linkedin.com/in/rohit-raj-31253b281/" icon="linkedin" label="LinkedIn" />
          </div>

          <a
            href="/resume.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md hover:scale-105 active:scale-95 group"
          >
            <span>Resume</span>
            <Download size={16} className="group-hover:text-primary-400 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 mt-4 px-6 py-4 flex flex-col space-y-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-500 px-4 py-3 rounded-xl text-white font-medium transition-all mt-4 active:scale-95 group"
            >
              <span>Download Resume</span>
              <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
            </a>

            <div className="flex items-center justify-center space-x-6 pt-4 border-t border-white/10 mt-2">
              <SocialIcon href="https://github.com/rohittt8241" icon="github" label="GitHub" />
              <SocialIcon href="https://www.linkedin.com/in/rohit-raj-31253b281/" icon="linkedin" label="LinkedIn" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
