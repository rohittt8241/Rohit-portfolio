"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Phone, Send } from "lucide-react";

import { useState } from "react";
import SocialIcon from "./SocialIcon";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("rohitt9702@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    if (infoRef.current) {
      tl.fromTo(
        infoRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
      );
    }

    if (formRef.current) {
      tl.fromTo(
        formRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );
    }
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-32 relative z-10 px-6 bg-[#020202] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div ref={infoRef}>
            <h2 className="text-sm font-bold tracking-widest text-primary-500 uppercase mb-4">
              Get in Touch
            </h2>
            <h3 className="text-4xl md:text-5xl font-black font-heading mb-8 leading-tight">
              Let's create something <span className="text-gradient">extraordinary</span> together.
            </h3>
            <p className="text-gray-400 text-lg mb-12 max-w-lg">
              Have a project in mind or want to discuss potential opportunities? I'm always open to talking about new collaborations.
            </p>

            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 rounded-full glass border border-white/10 flex items-center justify-center text-primary-500">
                  <Mail size={24} />
                </div>
                <div>
                  <h5 className="text-sm text-gray-500 mb-1 uppercase tracking-wider font-bold">Email</h5>
                  <div className="flex items-center gap-3">
                    <a href="mailto:rohitt9702@gmail.com" className="text-xl font-medium hover:text-primary-500 transition-colors">
                      rohitt9702@gmail.com
                    </a>
                    <button 
                      onClick={handleCopy}
                      className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 rounded border border-white/10 transition-colors"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 rounded-full glass border border-white/10 flex items-center justify-center text-secondary-500">
                  <Phone size={24} />
                </div>
                <div>
                  <h5 className="text-sm text-gray-500 mb-1 uppercase tracking-wider font-bold">Phone</h5>
                  <a href="tel:+917294980319" className="text-xl font-medium hover:text-secondary-500 transition-colors">
                    +91-7294980319
                  </a>
                </div>
              </div>

              {/* Socials */}
              <div className="pt-4 flex gap-4">
                <SocialIcon href="https://github.com/rohittt8241" icon="github" label="GitHub" />
                <SocialIcon href="https://www.linkedin.com/in/rohit-raj-31253b281/" icon="linkedin" label="LinkedIn" />
              </div>
            </div>
          </div>

          <form ref={formRef} className="glass p-8 md:p-12 rounded-3xl border border-white/10 flex flex-col gap-6 relative overflow-hidden group hover:border-white/20 hover:-translate-y-2 transition-all duration-300 bg-[#0a0a0a]/50 backdrop-blur-xl">
            {/* Background glow effect */}
            <div className={`absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none translate-x-1/2 -translate-y-1/2`}></div>

            <h4 className="text-2xl font-bold mb-4 relative z-10 text-white font-heading">Send a Message</h4>
            
            <div className="relative z-10">
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                placeholder="John Doe"
              />
            </div>
            
            <div className="relative z-10">
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                placeholder="john@example.com"
              />
            </div>
            
            <div className="relative z-10">
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea 
                id="message" 
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            
            <button 
              type="button"
              className="relative z-10 mt-4 bg-white text-black font-semibold rounded-xl px-6 py-4 flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors group/btn"
            >
              Send Message
              <Send size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
