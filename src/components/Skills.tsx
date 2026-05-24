"use client";

import { useRef, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

const skillCategories = [
  {
    name: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "TypeScript", "JavaScript"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Python", "Java", "SQL"],
  },
  {
    name: "AI & Tools",
    skills: ["AI / OpenAI", "Firebase", "Git", "GitHub"],
  },
];

const allSkills = skillCategories.flatMap((c) => c.skills);

function FloatingOrbs() {
  const orbs = useMemo(
    () =>
      Array.from({ length: 3 }).map((_, i) => ({
        left: `${20 + i * 30}%`,
        top: `${10 + i * 25}%`,
        size: 280 + i * 60,
        duration: 8 + i * 2,
        delay: i * 1.5,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.left,
            top: orb.top,
            background:
              i === 0
                ? "radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)"
                : i === 1
                ? "radial-gradient(circle, rgba(59,130,246,0.08), transparent 70%)"
                : "radial-gradient(circle, rgba(236,72,153,0.08), transparent 70%)",
          }}
          animate={{
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}

function MarqueeRow({ skills, reverse = false }: { skills: string[]; reverse?: boolean }) {
  const duplicated = useMemo(() => [...skills, ...skills], [skills]);

  return (
    <div
      className="relative overflow-hidden w-full py-3"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
      }}
    >
      <div
        className={`flex gap-3 md:gap-4 w-max ${
          reverse ? "marquee-track-reverse" : "marquee-track"
        }`}
      >
        {duplicated.map((skill, i) => (
          <div
            key={`${skill}-${i}`}
            className="glass px-4 py-2 rounded-full border border-white/5 whitespace-nowrap text-xs md:text-sm text-gray-500 hover:text-gray-300 transition-colors duration-300"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillPill({ skill, index }: { skill: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 20, stiffness: 200 });
  const springY = useSpring(y, { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        className="group relative cursor-default"
      >
        <div className="relative rounded-full p-[1.5px] overflow-hidden">
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 gradient-animate"
            style={{
              background:
                "linear-gradient(90deg, #8b5cf6, #3b82f6, #ec4899, #8b5cf6)",
            }}
          />
          <div className="absolute -inset-3 rounded-full bg-primary-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          <div className="relative rounded-full bg-[#0a0a0a] px-5 py-2.5 md:px-6 md:py-3 border border-white/10 group-hover:border-transparent transition-colors duration-500">
            <span className="text-sm md:text-base font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
              {skill}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SkillCategory({
  category,
  index,
}: {
  category: (typeof skillCategories)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="mb-10 md:mb-12 last:mb-0"
    >
      <div className="flex items-center gap-4 mb-4 md:mb-5">
        <h4 className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-primary-500">
          {category.name}
        </h4>
        <div className="h-px flex-1 bg-gradient-to-r from-primary-500/30 to-transparent" />
      </div>
      <div className="flex flex-wrap gap-2 md:gap-3">
        {category.skills.map((skill, i) => (
          <SkillPill key={skill} skill={skill} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

function SectionHeading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center mb-10 md:mb-16"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-sm font-bold tracking-[0.2em] text-primary-500 uppercase mb-4"
      >
        Arsenal
      </motion.p>
      <h3 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading">
        <span className="text-gradient">Tech Arsenal</span>
      </h3>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-4 text-gray-500 text-sm md:text-base max-w-xl mx-auto"
      >
        Cutting-edge tools and technologies I wield to build modern digital
        experiences
      </motion.p>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative z-10 py-24 md:py-32 overflow-hidden"
    >
      <FloatingOrbs />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading />

        <div className="mb-8 md:mb-14">
          <MarqueeRow skills={allSkills} />
        </div>

        <div className="max-w-4xl mx-auto">
          {skillCategories.map((cat, i) => (
            <SkillCategory key={cat.name} category={cat} index={i} />
          ))}
        </div>

        <div className="mt-8 md:mt-14">
          <MarqueeRow skills={allSkills} reverse />
        </div>
      </div>
    </section>
  );
}
