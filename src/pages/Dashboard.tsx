
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StatCard from '@/components/stats/StatCard';
import StatChart from '@/components/stats/StatChart';
import { 
  Trophy, 
  Users, 
  TrendingUp, 
  BarChart,
  Calendar,
  Award
} from 'lucide-react';
import { 
  recentMatchesData, 
  performanceTrendsData, 
  teamResultsData,
  possessionByMatchData,
  playerStatsData
} from '@/lib/statsData';

const Dashboard = () => {
  // Calculate aggregated stats from the sample data
  const totalMatches = recentMatchesData.length;
  const wins = recentMatchesData.filter(match => match.result === 'Win').length;
  const winRate = Math.round((wins / totalMatches) * 100);
  
  const totalGoals = playerStatsData.reduce((sum, player) => sum + player.goals, 0);
  const avgRating = (playerStatsData.reduce((sum, player) => sum + player.rating, 0) / playerStatsData.length).toFixed(1);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Your team's performance at a glance</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="btn-primary">
                Record New Match
              </button>
            </div>
          </div>
          
          {/* Key stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Win Rate" 
              value={`${winRate}%`}
              description="Based on last 10 matches"
              icon={<Trophy className="h-6 w-6 text-primary" />}
              change={5}
              trend="up"
            />
            <StatCard 
              title="Team Avg Rating" 
              value={avgRating}
              description="Across all positions"
              icon={<Award className="h-6 w-6 text-primary" />}
              change={0.2}
              trend="up"
            />
            <StatCard 
              title="Goals Scored" 
              value={totalGoals}
              description="Total goals this season"
              icon={<BarChart className="h-6 w-6 text-primary" />}
              change={-2}
              trend="down"
            />
            <StatCard 
              title="Active Players" 
              value={playerStatsData.length}
              description="Regular team members"
              icon={<Users className="h-6 w-6 text-primary" />}
              trend="neutral"
            />
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <StatChart 
              title="Performance Trends"
              description="Rating, goals and assists over the last 10 matches"
              data={performanceTrendsData}
              type="line"
              dataKeys={['rating', 'goals', 'assists']}
              colors={['hsl(var(--primary))', '#22c55e', '#3b82f6']}
            />
            <StatChart 
              title="Team Results"
              description="Win, draw and loss distribution this season"
              data={teamResultsData}
              type="bar"
              dataKeys={['value']}
              colors={['hsl(var(--primary))']}
            />
          </div>
          
          {/* Possession chart */}
          <div className="mb-8">
            <StatChart 
              title="Possession by Match"
              description="Ball possession percentage comparison with opponents"
              data={possessionByMatchData}
              type="area"
              dataKeys={['possession', 'opponentPossession']}
              colors={['hsl(var(--primary))', '#94a3b8']}
            />
          </div>
          
          {/* Recent matches */}
          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Matches</h2>
                <button className="text-primary text-sm font-medium hover:underline">
                  View All
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Opponent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Result</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Possession</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Pass Acc.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentMatchesData.slice(0, 5).map((match) => (
                    <tr key={match.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{match.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{match.opponent}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            match.result === 'Win' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : match.result === 'Loss' 
                                ? 'bg-rose-100 text-rose-800' 
                                : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {match.result}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{match.score}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{match.possession}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{match.passAccuracy}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
