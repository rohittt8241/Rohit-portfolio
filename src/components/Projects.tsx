"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";

const projects = [
  {
    title: "RAILMADAD AI",
    description: "An AI-powered grievance redressal system for Indian Railways. Automatically categorizes complaints, assigns them to respective departments, and generates automated responses using LLMs to reduce resolution time.",
    tech: ["Next.js", "Python", "FastAPI", "OpenAI API", "PostgreSQL"],
    link: "#",
    github: "https://github.com/rohittt8241",
    color: "from-blue-500 to-indigo-500",
    image: "/projects/railmadad.png"
  },
  {
    title: "NFT Marketplace",
    description: "A decentralized platform for minting, buying, and selling digital assets. Features smart contract integration, real-time bidding, and a seamless Web3 wallet authentication experience.",
    tech: ["React", "Solidity", "Ethers.js", "Tailwind", "IPFS"],
    link: "#",
    github: "https://github.com/rohittt8241",
    color: "from-purple-500 to-pink-500",
    image: "/projects/nft.png"
  },
  {
    title: "CloudCat",
    description: "A robust cloud file storage and sharing platform built for high-performance teams. Supports real-time collaboration, file versioning, and end-to-end encryption for maximum security.",
    tech: ["Vue.js", "Node.js", "AWS S3", "GraphQL", "Redis"],
    link: "#",
    github: "https://github.com/rohittt8241",
    color: "from-emerald-400 to-cyan-500",
    image: "/projects/cloudcat.png"
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    
    // For Tilt
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;
    
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);

    // For Spotlight
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { damping: 30, stiffness: 200 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformPerspective: 2000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full rounded-3xl overflow-hidden glass border border-white/10 group bg-[#0a0a0a]/80"
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.06),
              transparent 80%
            )
          `,
        }}
      />

      {/* Glow Behind */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br ${project.color} blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none z-0`}></div>

      {/* Content Container */}
      <div className="relative z-20 flex flex-col p-8 md:p-10 h-full">
        
        {/* Header: Title and Links */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
          <h4 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-lg font-heading">
            {project.title}
          </h4>
          <div className="flex gap-3 shrink-0">
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group/github relative h-10 w-10 md:h-12 md:w-12 rounded-full glass border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-white/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              <FaGithub size={20} className="relative z-10" />
              {/* Tooltip */}
              <span className="absolute -top-12 scale-0 opacity-0 transition-all duration-300 group-hover/github:scale-100 group-hover/github:opacity-100 bg-[#111] text-xs font-semibold text-white px-3 py-1.5 rounded-lg border border-white/10 whitespace-nowrap shadow-xl pointer-events-none z-50">
                View Source Code
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#111] border-b border-r border-white/10 rotate-45"></span>
              </span>
            </a>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="h-10 w-10 md:h-12 md:w-12 rounded-full glass border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-white/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              <ArrowUpRight size={20} />
            </a>
          </div>
        </div>

        {/* Project Preview with Image */}
        <div className="w-full aspect-[16/9] mb-8 relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center group/image glass shadow-2xl">
           {project.image ? (
             <>
               <Image
                 src={project.image}
                 alt={`${project.title} Preview`}
                 fill
                 className="object-cover transition-transform duration-700 ease-out group-hover/image:scale-105"
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                 loading="lazy"
                 quality={90}
               />
               <div className="absolute inset-0 bg-[#0a0a0a]/20 group-hover/image:bg-transparent transition-colors duration-500 z-10"></div>
               <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover/image:opacity-30 transition-opacity duration-500 mix-blend-overlay z-20`}></div>
               <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] pointer-events-none rounded-2xl z-30"></div>
             </>
           ) : (
             <div className="relative w-full h-full flex items-center justify-center">
               <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover/image:opacity-40 transition-opacity duration-500`}></div>
               <span className="text-gray-500 font-medium tracking-widest uppercase relative z-10 drop-shadow-md">Preview Unavailable</span>
             </div>
           )}
        </div>

        {/* Description & Tech Stack */}
        <div className="mt-auto">
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 drop-shadow-md">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {project.tech.map((t, i) => (
              <span key={i} className="text-xs md:text-sm font-semibold px-3 py-1.5 md:px-4 md:py-2 bg-white/5 border border-white/10 rounded-full text-gray-200 backdrop-blur-md">
                {t}
              </span>
            ))}
          </div>
        </div>
        
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen relative z-10 flex flex-col justify-center bg-[#020202] py-24 md:py-32">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-20">
        
        {/* Heading Section */}
        <div className="mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary-500 uppercase mb-4">
            Featured Work
          </h2>
          <h3 className="text-4xl md:text-6xl font-black font-heading text-white">
            Selected Projects
          </h3>
        </div>

        {/* CSS Grid for Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 w-full">
          {projects.map((project, index) => (
            <ProjectCard key={index} index={index} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}
