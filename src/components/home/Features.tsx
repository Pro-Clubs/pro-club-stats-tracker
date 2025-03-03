
import React from 'react';
import { 
  ChartBar, 
  Users, 
  Trophy, 
  LineChart, 
  BarChart, 
  TrendingUp,
  Medal
} from 'lucide-react';

const features = [
  {
    icon: <ChartBar className="h-10 w-10 text-primary" />,
    title: 'Comprehensive Match Statistics',
    description: 'Track detailed match data including possession, shots, passes, tackles and more for complete game analysis.'
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Individual Player Metrics',
    description: 'Monitor performance metrics for each player including position heatmaps, pass success rate, and defensive contributions.'
  },
  {
    icon: <Trophy className="h-10 w-10 text-primary" />,
    title: 'Season Progress Tracking',
    description: 'Follow your team\'s development throughout seasons with detailed progression charts and milestone achievements.'
  },
  {
    icon: <LineChart className="h-10 w-10 text-primary" />,
    title: 'Performance Trends',
    description: 'Identify patterns in performance with advanced trend analysis to highlight strengths and areas for improvement.'
  },
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: 'Comparative Analysis',
    description: 'Compare stats with previous matches, seasons, or even against other clubs to benchmark performance.'
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    title: 'Customizable Dashboards',
    description: 'Create personalized views focusing on the stats that matter most to you and your team.'
  }
];

const Features = () => {
  return (
    <section className="py-20 md:py-32 bg-secondary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-40 -right-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-20 left-40 w-60 h-60 rounded-full bg-blue-500/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Medal className="h-4 w-4" />
            <span>Key Features</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Powerful tools to take your Pro Clubs team to the next level
          </h2>
          
          <p className="text-muted-foreground text-lg">
            Our comprehensive suite of analytics features gives you unprecedented insight into every aspect of your team's performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-background rounded-xl p-6 border border-border shadow-sm hover-scale transition-all duration-300"
            >
              <div className="rounded-lg bg-primary/10 p-3 w-fit mb-6">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
