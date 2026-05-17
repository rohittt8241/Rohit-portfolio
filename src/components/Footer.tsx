"use client";

import SocialIcon from "./SocialIcon";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#050505] pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="text-2xl font-bold tracking-tighter text-gradient">
            Rohit Raj
          </div>
          
          <div className="flex items-center gap-4">
            <SocialIcon href="https://github.com/rohittt8241" icon="github" label="GitHub" />
            <SocialIcon href="https://www.linkedin.com/in/rohit-raj-31253b281/" icon="linkedin" label="LinkedIn" />
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Rohit Raj. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
