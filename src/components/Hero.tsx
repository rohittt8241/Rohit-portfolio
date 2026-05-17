"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Typewriter from "typewriter-effect";
import SocialIcon from "./SocialIcon";
import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

// --- Main Hero Component ---

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // GSAP Cinematic Intro
    const tl = gsap.timeline();

    tl.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.8, filter: "blur(20px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power4.out", delay: 0.2 }
    )
    .fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(
      buttonsRef.current?.children || [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.6"
    );

    // Mouse Parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // Max 20px shift
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      id="home" 
      ref={containerRef} 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#020202]"
    >
      {/* Dynamic Glow Gradients */}
      <div 
        className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-primary-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 ease-out z-0"
        style={{ transform: `translate(calc(-50% + ${mousePosition.x * 2}px), calc(-50% + ${mousePosition.y * 2}px))` }}
      />

      {/* R3F Canvas */}
      <div className="absolute inset-0 z-0">
        <Hero3D />
      </div>

      {/* Content */}
      <div 
        className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center transition-transform duration-300 ease-out"
        style={{ transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)` }}
      >
        
        {/* Massive Animated Heading */}
        <h1 
          ref={textRef}
          className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter mb-4 leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 drop-shadow-2xl uppercase mix-blend-screen font-heading"
        >
          Hi, I'm <br className="md:hidden" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400">
            Rohit Raj
          </span>
        </h1>

        {/* Typewriter Subtitle */}
        <div ref={subtitleRef} className="text-xl md:text-3xl font-light text-gray-300 mb-12 tracking-wide h-10">
          <Typewriter
            options={{
              strings: [
                'Full Stack Developer',
                'AI Enthusiast',
                'Creative Technologist'
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
              cursorClassName: "text-primary-500 animate-pulse"
            }}
          />
        </div>

        {/* Glassmorphism Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto">
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 glass border border-white/10 text-white font-semibold rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md"
          >
            Contact Me
          </a>
          <a
            href="/resume.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 glass border border-primary-500/30 text-primary-400 font-semibold rounded-2xl hover:bg-primary-500/10 hover:border-primary-500/50 transition-all duration-300 backdrop-blur-md active:scale-95 flex items-center justify-center gap-2 group"
          >
            <span>Download Resume</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-1 transition-transform"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </a>
          
          <div className="flex space-x-4 mt-2 sm:mt-0 sm:pl-4 sm:border-l sm:border-white/10">
            <SocialIcon href="https://github.com/rohittt8241" icon="github" label="GitHub" />
            <SocialIcon href="https://www.linkedin.com/in/rohit-raj-31253b281/" icon="linkedin" label="LinkedIn" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-50 hover:opacity-100 transition-opacity">
        <span className="text-xs text-gray-400 uppercase tracking-[0.3em] font-medium">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-gray-400 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-down"></div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll-down {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scroll-down {
          animation: scroll-down 1.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}</style>
    </section>
  );
}
