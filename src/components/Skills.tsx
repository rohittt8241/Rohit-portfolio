"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const skills = [
  "TypeScript", "JavaScript", "Python", "Go", "C++",
  "React", "Next.js", "Vue.js", "Three.js", "Tailwind CSS",
  "Node.js", "Express", "FastAPI", "GraphQL", "REST APIs",
  "PostgreSQL", "MongoDB", "Redis", "Firebase", "Supabase",
  "Docker", "AWS", "GCP", "CI/CD", "Git",
  "Machine Learning", "LLMs", "LangChain", "OpenAI API", "Vector DBs"
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current) {
      const tags = containerRef.current.querySelectorAll('.skill-tag');
      
      gsap.fromTo(
        tags,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }
  }, []);

  return (
    <section id="skills" className="py-24 relative z-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary-500 uppercase mb-4">
            Arsenal
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold">Skills & Technologies</h3>
        </div>

        <div 
          ref={containerRef}
          className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
        >
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-tag glass px-6 py-3 rounded-full border border-white/10 hover:border-primary-500 hover:bg-primary-500/10 hover:scale-105 transition-all cursor-default text-gray-300 hover:text-white font-medium"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
