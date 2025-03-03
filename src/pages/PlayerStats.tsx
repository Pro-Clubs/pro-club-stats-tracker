
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StatCard from '@/components/stats/StatCard';
import StatChart from '@/components/stats/StatChart';
import PlayerTransferSearch from '@/components/stats/PlayerTransferSearch';
import PlayerAttributesModal from '@/components/stats/PlayerAttributesModal';
import { playerStatsData, performanceTrendsData } from '@/lib/statsData';
import { Search, Trophy, Star, BarChart3, ListFilter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PlayerStats = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(playerStatsData[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [attributesModalOpen, setAttributesModalOpen] = useState(false);
  
  const filteredPlayers = playerStatsData.filter(player => 
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTransferPlayerSelect = (playerId: number) => {
    // Find the corresponding player in playerStatsData (if available)
    const player = playerStatsData.find(p => p.id === playerId);
    if (player) {
      setSelectedPlayer(player);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Player Statistics</h1>
            <p className="text-muted-foreground mt-1">Detailed performance data for each player</p>
          </div>
          
          <Tabs defaultValue="stats" className="mb-8">
            <TabsList>
              <TabsTrigger value="stats">Player Stats</TabsTrigger>
              <TabsTrigger value="transfers">Transfers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stats">
              {/* Search and filter */}
              <div className="mb-8">
                <div className="bg-card rounded-xl border border-border shadow-sm p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                        placeholder="Search by name or position..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                        <ListFilter className="h-4 w-4 mr-2" />
                        Filters
                      </button>
                      <button className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                        Add New Player
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Player list */}
                <div className="lg:col-span-1">
                  <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-border">
                      <h2 className="font-semibold">Team Roster</h2>
                    </div>
                    <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
                      {filteredPlayers.map((player) => (
                        <div 
                          key={player.id}
                          className={`p-4 flex items-center gap-4 cursor-pointer transition-colors ${
                            selectedPlayer.id === player.id ? 'bg-primary/5' : 'hover:bg-muted/30'
                          }`}
                          onClick={() => setSelectedPlayer(player)}
                        >
                          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                            <img 
                              src={player.image} 
                              alt={player.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-sm">{player.name}</h3>
                                <p className="text-xs text-muted-foreground">{player.position}</p>
                              </div>
                              <div className="flex items-center">
                                <div className="bg-secondary rounded-md px-2 py-0.5 text-xs font-medium">
                                  {player.rating}
                                </div>
                              </div>
                            </div>
                            <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{player.goals} goals</span>
                              <span>{player.assists} assists</span>
                              <span>{player.matches} matches</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Player details */}
                <div className="lg:col-span-2">
                  {selectedPlayer && (
                    <>
                      {/* Player header */}
                      <div className="bg-card rounded-xl border border-border shadow-sm p-6 mb-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0">
                            <img 
                              src={selectedPlayer.image} 
                              alt={selectedPlayer.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow text-center md:text-left">
                            <h2 className="text-2xl font-bold">{selectedPlayer.name}</h2>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
                              <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium">
                                {selectedPlayer.position}
                              </span>
                              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Star className="h-4 w-4 text-amber-500" />
                                {selectedPlayer.rating} Rating
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {selectedPlayer.matches} Matches Played
                              </span>
                            </div>
                            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                              <button 
                                className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                                onClick={() => setAttributesModalOpen(true)}
                              >
                                Full Profile
                              </button>
                              <button className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                                Edit Stats
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Player stats cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <StatCard 
                          title="Goals" 
                          value={selectedPlayer.goals}
                          description={`${(selectedPlayer.goals / selectedPlayer.matches).toFixed(1)} per match`}
                        />
                        <StatCard 
                          title="Assists" 
                          value={selectedPlayer.assists}
                          description={`${(selectedPlayer.assists / selectedPlayer.matches).toFixed(1)} per match`}
                        />
                        <StatCard 
                          title="Pass Accuracy" 
                          value={`${selectedPlayer.passAccuracy}%`}
                          description="Successful passes"
                        />
                        <StatCard 
                          title="Shots on Target" 
                          value={selectedPlayer.shotsOnTarget}
                          description={`${(selectedPlayer.shotsOnTarget / selectedPlayer.matches).toFixed(1)} per match`}
                        />
                      </div>
                      
                      {/* Performance chart */}
                      <StatChart 
                        title="Performance Over Last 10 Matches"
                        description="Rating, goals and assists progress"
                        data={performanceTrendsData}
                        type="line"
                        dataKeys={['rating', 'goals', 'assists']}
                        colors={['hsl(var(--primary))', '#22c55e', '#3b82f6']}
                      />
                    </>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="transfers">
              <PlayerTransferSearch onPlayerSelect={handleTransferPlayerSelect} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      
      {/* Player Attributes Modal */}
      <PlayerAttributesModal 
        player={selectedPlayer}
        open={attributesModalOpen}
        onOpenChange={setAttributesModalOpen}
      />
    </div>
  );
};

export default PlayerStats;
