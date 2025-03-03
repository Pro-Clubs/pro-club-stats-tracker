
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        
        {/* Call to action section */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to elevate your Pro Clubs performance?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of Pro Clubs players who are using StatTrackerFC to improve their game and climb the ranks.
            </p>
            <a 
              href="/dashboard" 
              className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Get Started Today
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
