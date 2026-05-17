"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const experienceData = [
  {
    title: "Web Development Intern",
    company: "InnovateLoop Solutions",
    duration: "24 Feb 2026 – Present (Ends 24 May 2026)",
    description: [
      "Working on modern responsive web applications",
      "Building frontend UI components",
      "Collaborating on full-stack features",
      "Improving responsive design and performance",
    ],
  },
];

const educationData = [
  {
    title: "B.Tech in Computer Science and Engineering",
    institution: "Dayananda Sagar University, Bangalore",
    duration: "2022 – 2026",
    score: null,
  },
  {
    title: "CBSE Class 12",
    institution: "DAV Public School",
    duration: "2021",
    score: "84.2%",
  },
  {
    title: "CBSE Class 10",
    institution: "DAV Public School",
    duration: "2019",
    score: "74%",
  },
];

function TimelineCard({ item, index, isExp }: { item: any; index: number; isExp: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isExp ? -50 : 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
      className="relative pl-12 md:pl-0 w-full"
    >
      {/* Glowing Timeline Indicator */}
      <div className={`absolute left-0 md:left-auto ${isExp ? 'md:-right-[21px]' : 'md:-left-[21px]'} top-8 w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center z-20 group-hover:scale-125 transition-transform duration-300 bg-[#0a0a0a]`}>
        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${isExp ? 'from-primary-400 to-primary-600' : 'from-accent-400 to-accent-600'} shadow-[0_0_15px_rgba(139,92,246,0.8)]`} />
      </div>

      <div className="glass p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden bg-[#0a0a0a]/50 backdrop-blur-xl">
        {/* Hover Glow */}
        <div className={`absolute -inset-full bg-gradient-to-r ${isExp ? 'from-primary-500/10' : 'from-accent-500/10'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl rounded-full pointer-events-none`}></div>

        <div className="relative z-10">
          <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border ${isExp ? 'bg-primary-500/10 border-primary-500/20 text-primary-400' : 'bg-accent-500/10 border-accent-500/20 text-accent-400'}`}>
            {item.duration}
          </span>
          <h4 className="text-2xl font-bold font-heading mb-2 text-white">{item.title}</h4>
          <h5 className="text-lg text-gray-400 mb-4">{item.company || item.institution}</h5>
          
          {item.description && (
            <ul className="space-y-2 mt-4 text-gray-300">
              {item.description.map((desc: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-base">
                  <span className="text-primary-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                  {desc}
                </li>
              ))}
            </ul>
          )}

          {item.score && (
            <div className="mt-4 inline-block px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              <span className="text-gray-400 text-sm">Score:</span>
              <span className="ml-2 font-bold text-white">{item.score}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-32 relative z-10 bg-[#020202] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold tracking-widest text-primary-500 uppercase mb-4">
            Journey
          </h2>
          <h3 className="text-4xl md:text-6xl font-black font-heading">Experience & Education</h3>
        </div>

        <div ref={containerRef} className="relative w-full max-w-6xl mx-auto">
          {/* Animated Central Timeline Connector */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 hidden md:block">
            <motion.div 
              style={{ height: lineHeight }} 
              className="w-full bg-gradient-to-b from-primary-500 via-accent-500 to-transparent shadow-[0_0_15px_rgba(139,92,246,0.6)]" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative z-10">
            {/* Experience Column */}
            <div className="flex flex-col gap-12">
              <div className="flex items-center gap-4 mb-4 md:justify-end md:pr-12">
                <h3 className="text-3xl font-bold font-heading">Experience</h3>
                <Briefcase className="text-primary-500" size={28} />
              </div>
              <div className="flex flex-col gap-12 md:pr-12">
                {experienceData.map((item, index) => (
                  <TimelineCard key={index} item={item} index={index} isExp={true} />
                ))}
              </div>
            </div>

            {/* Education Column */}
            <div className="flex flex-col gap-12">
              <div className="flex items-center gap-4 mb-4 pl-0 md:pl-12">
                <GraduationCap className="text-accent-500" size={32} />
                <h3 className="text-3xl font-bold font-heading">Education</h3>
              </div>
              <div className="flex flex-col gap-12 md:pl-12">
                {educationData.map((item, index) => (
                  <TimelineCard key={index} item={item} index={index} isExp={false} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Mobile animated line */}
          <div className="absolute left-[19px] top-16 bottom-0 w-[2px] bg-white/5 md:hidden">
            <motion.div 
              style={{ height: lineHeight }} 
              className="w-full bg-gradient-to-b from-primary-500 via-accent-500 to-transparent shadow-[0_0_15px_rgba(139,92,246,0.6)]" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
