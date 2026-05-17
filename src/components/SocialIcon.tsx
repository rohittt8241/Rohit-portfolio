"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface SocialIconProps {
  href: string;
  icon: "github" | "linkedin";
  label: string;
}

export default function SocialIcon({ href, icon, label }: SocialIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] bg-[#0a0a0a]/50"
      >
        {icon === "github" ? <FaGithub size={18} /> : <FaLinkedin size={18} />}
      </a>
      
      {/* Animated Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? -45 : 10, scale: isHovered ? 1 : 0.9 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute pointer-events-none whitespace-nowrap px-3 py-1.5 glass bg-[#0a0a0a] border border-white/10 rounded-lg text-xs font-medium text-white shadow-xl z-50"
      >
        {label}
        {/* Tooltip Arrow */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0a0a0a] border-b border-r border-white/10 rotate-45"></div>
      </motion.div>
    </div>
  );
}
