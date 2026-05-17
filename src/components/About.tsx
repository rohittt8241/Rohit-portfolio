"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, Code2, Cpu } from "lucide-react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 80%",
        toggleActions: "play none none reverse",
      },
    });

    if (textRef.current) {
      tl.fromTo(
        textRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" }
      );
    }

    if (cardsRef.current) {
      tl.fromTo(
        cardsRef.current.children,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" },
        "-=0.4"
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 relative z-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div ref={textRef} className="space-y-6">
            <h2 className="text-sm font-bold tracking-widest text-primary-500 uppercase">
              About Me
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold leading-tight">
              Bridging the gap between <span className="text-gray-400">design</span> and <span className="text-white">engineering</span>.
            </h3>
            <p className="text-lg text-gray-400 leading-relaxed">
              I am a passionate software engineer specializing in building exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products at the intersection of modern web development and Artificial Intelligence.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              When I'm not at the computer, I'm usually exploring the outdoors, reading about the latest tech trends, or experimenting with new generative AI models.
            </p>
          </div>

          {/* Cards / Visuals */}
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass p-8 rounded-3xl border border-white/10 hover:border-primary-500/50 transition-colors group">
              <div className="bg-white/5 p-4 rounded-full w-fit mb-6 group-hover:scale-110 transition-transform">
                <Terminal className="text-primary-500" size={28} />
              </div>
              <h4 className="text-xl font-bold mb-2">Frontend Dev</h4>
              <p className="text-gray-400 text-sm">React, Next.js, Three.js, GSAP</p>
            </div>
            
            <div className="glass p-8 rounded-3xl border border-white/10 hover:border-secondary-500/50 transition-colors group sm:-translate-y-6">
              <div className="bg-white/5 p-4 rounded-full w-fit mb-6 group-hover:scale-110 transition-transform">
                <Code2 className="text-secondary-500" size={28} />
              </div>
              <h4 className="text-xl font-bold mb-2">Backend Eng</h4>
              <p className="text-gray-400 text-sm">Node.js, Python, PostgreSQL, Redis</p>
            </div>
            
            <div className="glass p-8 rounded-3xl border border-white/10 hover:border-accent-500/50 transition-colors group sm:col-span-2">
              <div className="bg-white/5 p-4 rounded-full w-fit mb-6 group-hover:scale-110 transition-transform flex items-center gap-4">
                <Cpu className="text-accent-500" size={28} />
              </div>
              <h4 className="text-xl font-bold mb-2">AI Integration</h4>
              <p className="text-gray-400 text-sm">Implementing LLMs, AI Agents, and Machine Learning workflows into scalable applications.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
