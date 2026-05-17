"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, CheckCircle } from "lucide-react";

const certs = [
  {
    title: "Google Analytics Certification",
    issuer: "Google",
    date: "Dec 2025",
    color: "from-blue-500 to-indigo-500"
  },
  {
    title: "Linux Fundamentals",
    issuer: "Springboard",
    date: "Aug 2025",
    color: "from-primary-500 to-accent-500"
  },
  {
    title: "Technology Job Simulation",
    issuer: "Deloitte",
    date: "Jul 2025",
    color: "from-emerald-500 to-teal-500"
  }
];

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="certifications" className="py-32 relative z-10 px-6 bg-[#020202] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10" ref={containerRef}>
        
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold tracking-widest text-primary-500 uppercase mb-4">
            Credentials
          </h2>
          <h3 className="text-4xl md:text-6xl font-black font-heading">Certifications</h3>
        </div>

        <motion.div style={{ y, opacity }} className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] bg-primary-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

          {certs.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              className="relative glass p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 group hover:-translate-y-2 bg-[#0a0a0a]/50 backdrop-blur-xl z-10 overflow-hidden"
            >
              {/* Inner Hover Glow */}
              <div className={`absolute -inset-full bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl pointer-events-none rounded-full`}></div>

              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br ${cert.color} shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-300`}>
                  <Award size={28} className="text-white" />
                </div>
                
                <h4 className="text-2xl font-bold mb-3 text-white leading-tight">{cert.title}</h4>
                
                <div className="flex items-center gap-2 mb-6 text-gray-400">
                  <CheckCircle size={16} className="text-primary-400" />
                  <span className="font-medium text-lg">{cert.issuer}</span>
                </div>
                
                <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold border bg-white/5 border-white/10 text-gray-300 backdrop-blur-md">
                  {cert.date}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
