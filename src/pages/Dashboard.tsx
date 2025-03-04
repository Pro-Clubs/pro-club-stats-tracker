import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StatCard from '@/components/stats/StatCard';
import StatChart from '@/components/stats/StatChart';
import VideoHighlights from '@/components/videos/VideoHighlights';
import { useToast } from "@/hooks/use-toast";
import { 
  Trophy, 
  Users, 
  BarChart,
  Award,
  Loader2,
  UserCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { 
  recentMatchesData, 
  performanceTrendsData, 
  teamResultsData,
  possessionByMatchData,
  playerStatsData
} from '@/lib/statsData';
import { fetchDashboardData } from "@/lib/api";
import { format } from 'date-fns';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [apiResponse, setApiResponse] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      try {
        console.log("Fetching dashboard data...");
        // Added a slight delay to ensure the UI renders properly
        const data = await fetchDashboardData();
        console.log("Dashboard data received:", data);
        
        if (!data || typeof data !== 'object') {
          console.error("Invalid dashboard data received:", data);
          setHasError(true);
        } else {
          setDashboardData(data);
          setApiResponse(JSON.stringify(data, null, 2));
          setHasError(false);
        }
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
        setHasError(true);
        let message = "Failed to load dashboard data";
        if (error instanceof Error) {
          message = error.message;
        }
        toast({
          variant: "destructive",
          title: "Error",
          description: message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [toast]);
  
  // Calculate aggregated stats from the sample data
  const totalMatches = recentMatchesData.length;
  const wins = recentMatchesData.filter(match => match.result === 'Win').length;
  const winRate = Math.round((wins / totalMatches) * 100);
  
  const totalGoals = playerStatsData.reduce((sum, player) => sum + player.goals, 0);
  const avgRating = (playerStatsData.reduce((sum, player) => sum + player.rating, 0) / playerStatsData.length).toFixed(1);
  
  // @ts-ignore
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
          
          {/* API Data Summary */}
          {isLoading ? (
            <div className="flex justify-center items-center py-10 mb-8 bg-card rounded-xl border border-border shadow-sm">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <span className="ml-3 text-lg font-medium">Loading dashboard data...</span>
            </div>
          ) : hasError ? (
            <div className="mb-8 p-6 bg-card rounded-xl border border-border shadow-sm">
              <div className="flex items-center text-red-500 mb-4">
                <AlertCircle className="h-5 w-5 mr-2" />
                <h2 className="text-xl font-semibold">Unable to load API data</h2>
              </div>
              <p>There was a problem fetching data from the Pro Club Stats API.</p>
            </div>
          ) : (
            <div className="mb-8 p-6 bg-card rounded-xl border border-border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Pro Club Stats API Response</h2>

              {/* Display the full API response */}
              <div className="mt-4 p-4 bg-black/5 rounded-md overflow-auto max-h-[600px]">
                <pre className="text-xs">{apiResponse || "No data received from API"}</pre>
              </div>

              {dashboardData && dashboardData.user && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Logged in as: <span className="font-medium">{dashboardData.user.email || 'Unknown'}</span>
                    {dashboardData.user.last_login_at && (
                      <> | Last login: {new Date(dashboardData.user.last_login_at).toLocaleString()}</>
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
          
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
          
          {/* Video Highlights section */}
          <div className="mb-8">
            <VideoHighlights />
          </div>
          
          {/* Recent matches - Only show when data is loaded */}
          {!isLoading && (
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Recent Matches</h2>
                  <button className="text-primary text-sm font-medium hover:underline">
                    View All
                  </button>
                </div>

                {/* Recent Form Bar - Only show if data exists */}
                {dashboardData && dashboardData.recent ? (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Recent Form</p>
                    <div className="flex space-x-1.5">
                      {dashboardData.recent.map((result, index) => {
                        const resultColor =
                          result === 'W' ? 'bg-emerald-500' :
                          result === 'L' ? 'bg-rose-500' : 'bg-amber-500';

                        return (
                          <span
                            key={index}
                            className={`${resultColor} min-w-7 h-7 flex items-center justify-center text-white font-medium rounded-md`}
                          >
                            {result}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">Waiting for recent match data...</p>
                  </div>
                )}
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
                  {dashboardData && dashboardData.results.data ? (
                      dashboardData.results.data.slice(0, 5).map((match) => (
                          <tr key={match.id} className="hover:bg-muted/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{match.created_at}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{match.away_team.name}</td>
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
                      ))
                  ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                          No match data available
                        </td>
                      </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;