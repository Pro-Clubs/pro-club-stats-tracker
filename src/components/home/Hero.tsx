
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wider uppercase animate-fade-in">
            Track. Analyze. Improve.
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in [animation-delay:200ms]">
            Elevate Your Pro Clubs Performance with Precision Stats
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in [animation-delay:400ms]">
            Track detailed match and player statistics, analyze team performance, and elevate your game with comprehensive insights designed for EA FC Pro Clubs players.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in [animation-delay:600ms]">
            <Link to="/dashboard" className="btn-primary text-base">
              <span>Get Started</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
            <Link to="/player-stats" className="btn-secondary text-base">
              <span>View Demo</span>
            </Link>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="mt-16 md:mt-20 relative mx-auto max-w-5xl animate-fade-in [animation-delay:800ms]">
          <div className="aspect-[16/9] overflow-hidden rounded-xl shadow-2xl border border-white/20">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 w-full h-full flex items-center justify-center">
              <div className="glass-card rounded-lg p-6 md:p-8 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 rounded-md p-4 flex flex-col items-center">
                    <span className="text-primary font-bold text-2xl">87%</span>
                    <span className="text-xs text-white/70">Pass Accuracy</span>
                  </div>
                  <div className="bg-white/10 rounded-md p-4 flex flex-col items-center">
                    <span className="text-primary font-bold text-2xl">24</span>
                    <span className="text-xs text-white/70">Goals Scored</span>
                  </div>
                  <div className="bg-white/10 rounded-md p-4 flex flex-col items-center">
                    <span className="text-primary font-bold text-2xl">8.5</span>
                    <span className="text-xs text-white/70">Avg Rating</span>
                  </div>
                  
                  <div className="md:col-span-3 mt-4 bg-white/10 rounded-md p-4">
                    <div className="h-12 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">ST</div>
                        <span className="ml-2 text-white text-sm">Striker Performance</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-2 h-8 rounded-sm bg-primary/20"></div>
                        <div className="w-2 h-8 rounded-sm bg-primary/40"></div>
                        <div className="w-2 h-8 rounded-sm bg-primary/60"></div>
                        <div className="w-2 h-8 rounded-sm bg-primary/80"></div>
                        <div className="w-2 h-8 rounded-sm bg-primary"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 backdrop-blur-xl rounded-lg rotate-12 -z-10"></div>
          <div className="absolute -bottom-4 -left-4 w-40 h-20 bg-blue-500/10 backdrop-blur-xl rounded-lg -rotate-6 -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
