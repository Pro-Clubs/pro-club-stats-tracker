
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StatCard from '@/components/stats/StatCard';
import StatChart from '@/components/stats/StatChart';
import { 
  Trophy, 
  Shield, 
  BarChart3, 
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';
import { 
  teamResultsData, 
  teamStatsByPosition, 
  possessionByMatchData,
  seasonProgressionData
} from '@/lib/statsData';

const TeamStats = () => {
  // Calculate some aggregate stats
  const totalGames = teamResultsData.reduce((sum, item) => sum + item.value, 0);
  const totalWins = teamResultsData.find(item => item.name === 'Wins')?.value || 0;
  const winRate = Math.round((totalWins / totalGames) * 100);
  
  const totalGoals = teamStatsByPosition.reduce((sum, pos) => sum + pos.goals, 0);
  const totalAssists = teamStatsByPosition.reduce((sum, pos) => sum + pos.assists, 0);
  const teamAvgRating = (teamStatsByPosition.reduce((sum, pos) => sum + pos.rating, 0) / teamStatsByPosition.length).toFixed(1);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Team Statistics</h1>
            <p className="text-muted-foreground mt-1">Comprehensive analysis of your team's performance</p>
          </div>
          
          {/* Key stats overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Win Rate" 
              value={`${winRate}%`}
              description={`From ${totalGames} games played`}
              icon={<Trophy className="h-6 w-6 text-primary" />}
              trend="up"
            />
            <StatCard 
              title="Team Rating" 
              value={teamAvgRating}
              description="Average across all positions"
              icon={<Shield className="h-6 w-6 text-primary" />}
              trend="neutral"
            />
            <StatCard 
              title="Total Goals" 
              value={totalGoals}
              description={`${(totalGoals / totalGames).toFixed(1)} per game`}
              icon={<BarChart3 className="h-6 w-6 text-primary" />}
              trend="up"
            />
            <StatCard 
              title="Total Assists" 
              value={totalAssists}
              description={`${(totalAssists / totalGames).toFixed(1)} per game`}
              icon={<TrendingUp className="h-6 w-6 text-primary" />}
              trend="up"
            />
          </div>
          
          {/* Charts - top row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <StatChart 
              title="Results Distribution"
              description="Wins, draws, and losses this season"
              data={teamResultsData}
              type="bar"
              dataKeys={['value']}
            />
            <StatChart 
              title="Position Performance"
              description="Average rating, goals, and assists by position"
              data={teamStatsByPosition}
              type="bar"
              dataKeys={['goals', 'assists', 'rating']}
              colors={['#22c55e', '#3b82f6', 'hsl(var(--primary))']}
            />
          </div>
          
          {/* Charts - bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <StatChart 
              title="Possession by Match"
              description="Ball possession percentage comparison with opponents"
              data={possessionByMatchData}
              type="area"
              dataKeys={['possession', 'opponentPossession']}
              colors={['hsl(var(--primary))', '#94a3b8']}
            />
            <StatChart 
              title="Season Progression"
              description="Points accumulated and league position by week"
              data={seasonProgressionData}
              type="line"
              dataKeys={['points', 'position']}
              colors={['hsl(var(--primary))', '#f59e0b']}
            />
          </div>
          
          {/* Team strengths and weaknesses */}
          <div className="bg-card rounded-xl border border-border shadow-sm mb-8">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold">Team Analysis</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <div className="rounded-md bg-emerald-100 p-1.5 mr-2">
                      <TrendingUp className="h-5 w-5 text-emerald-600" />
                    </div>
                    Team Strengths
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-emerald-600 text-xs font-bold">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Attack Conversion</p>
                        <p className="text-sm text-muted-foreground">32% shot conversion rate (league avg: 24%)</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-emerald-600 text-xs font-bold">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Set Piece Effectiveness</p>
                        <p className="text-sm text-muted-foreground">42% of goals from set pieces (league avg: 30%)</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-emerald-600 text-xs font-bold">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Home Form</p>
                        <p className="text-sm text-muted-foreground">86% win rate at home venues (league avg: 58%)</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <div className="rounded-md bg-rose-100 p-1.5 mr-2">
                      <TrendingUp className="h-5 w-5 text-rose-600 transform rotate-180" />
                    </div>
                    Areas to Improve
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-rose-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-rose-600 text-xs font-bold">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Defensive Organization</p>
                        <p className="text-sm text-muted-foreground">1.8 goals conceded per game (league avg: 1.2)</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-rose-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-rose-600 text-xs font-bold">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Away Performance</p>
                        <p className="text-sm text-muted-foreground">Only 40% win rate in away games (league avg: 45%)</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-rose-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-rose-600 text-xs font-bold">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Second Half Control</p>
                        <p className="text-sm text-muted-foreground">75% of goals conceded in second half (league avg: 55%)</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Team formation and tactics */}
          <div className="bg-card rounded-xl border border-border shadow-sm">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold">Formation and Tactics</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  {/* Formation visualization */}
                  <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 aspect-[4/3] rounded-lg flex items-center justify-center p-4 mb-4">
                    <div className="relative w-full max-w-md aspect-[4/3]">
                      {/* This is a simplified illustration of a 4-3-3 formation */}
                      <div className="absolute top-[10%] left-[50%] transform -translate-x-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <span className="text-emerald-900 text-xs font-bold">GK</span>
                      </div>
                      
                      {/* Defenders */}
                      <div className="absolute top-[25%] left-[20%] transform -translate-x-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <span className="text-emerald-900 text-xs font-bold">LB</span>
                      </div>
                      <div className="absolute top-[25%] left-[40%] transform -translate-x-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <span className="text-emerald-900 text-xs font-bold">CB</span>
                      </div>
                      <div className="absolute top-[25%] left-[60%] transform -translate-x-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <span className="text-emerald-900 text-xs font-bold">CB</span>
                      </div>
                      <div className="absolute top-[25%] left-[80%] transform -translate-x-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <span className="text-emerald-900 text-xs font-bold">RB</span>
                      </div>
                      
                      {/* Midfielders */}
                      <div className="absolute top-[50%] left-[30%] transform -translate-x-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <span className="text-emerald-900 text-xs font-bold">CM</span>
                      </div>
                      <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <span className="text-emerald-900 text-xs font-bold">CM</span>
                      </div>
                      <div className="absolute top-[50%] left-[70%] transform -translate-x-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <span className="text-emerald-900 text-xs font-bold">CM</span>
                      </div>
                      
                      {/* Forwards */}
                      <div className="absolute top-[75%] left-[30%] transform -translate-x-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <span className="text-emerald-900 text-xs font-bold">LW</span>
                      </div>
                      <div className="absolute top-[75%] left-[50%] transform -translate-x-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <span className="text-emerald-900 text-xs font-bold">ST</span>
                      </div>
                      <div className="absolute top-[75%] left-[70%] transform -translate-x-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <span className="text-emerald-900 text-xs font-bold">RW</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <span className="bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">
                      4-3-3 Formation
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Tactical Analysis</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                        <h4 className="font-medium">Attacking Style</h4>
                      </div>
                      <p className="text-sm text-muted-foreground pl-5">
                        Possession-based build-up with quick transitions to attack when openings appear. Emphasis on wing play and crosses.
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                        <h4 className="font-medium">Defensive Approach</h4>
                      </div>
                      <p className="text-sm text-muted-foreground pl-5">
                        High pressing when possible, dropping into a mid-block when under pressure. Defenders maintain compact shape.
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                        <h4 className="font-medium">Set Pieces</h4>
                      </div>
                      <p className="text-sm text-muted-foreground pl-5">
                        Corner routines focused on near-post flicks and back-post runners. Free kicks utilize decoy runners and practiced routines.
                      </p>
                    </div>
                    
                    <div className="flex justify-center mt-6">
                      <button className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                        <Users className="mr-2 h-4 w-4" />
                        Tactical Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamStats;
