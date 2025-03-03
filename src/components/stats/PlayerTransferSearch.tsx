
import React, { useState } from 'react';
import { Search, Filter, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { playerTransfersData } from '@/lib/statsData';

interface PlayerTransferSearchProps {
  onPlayerSelect?: (playerId: number) => void;
}

const PlayerTransferSearch: React.FC<PlayerTransferSearchProps> = ({ onPlayerSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [viewHistory, setViewHistory] = useState(false);
  
  const filteredPlayers = playerTransfersData.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         player.currentTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         player.previousTeam.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPosition = positionFilter === '' || player.position === positionFilter;
    
    return matchesSearch && matchesPosition;
  });

  return (
    <Card className="p-6 bg-card rounded-xl border border-border shadow-sm">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Player Transfers</h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setViewHistory(!viewHistory)}
          >
            {viewHistory ? 'Recent Transfers' : 'Transfer History'}
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="text"
              className="pl-10"
              placeholder="Search by player or team name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={positionFilter} onValueChange={setPositionFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Positions</SelectItem>
              <SelectItem value="GK">Goalkeeper</SelectItem>
              <SelectItem value="CB">Center Back</SelectItem>
              <SelectItem value="LB">Left Back</SelectItem>
              <SelectItem value="RB">Right Back</SelectItem>
              <SelectItem value="CDM">Defensive Midfielder</SelectItem>
              <SelectItem value="CM">Central Midfielder</SelectItem>
              <SelectItem value="CAM">Attacking Midfielder</SelectItem>
              <SelectItem value="LW">Left Winger</SelectItem>
              <SelectItem value="RW">Right Winger</SelectItem>
              <SelectItem value="ST">Striker</SelectItem>
            </SelectContent>
          </Select>
          
          <Button size="icon" variant="outline" className="md:hidden">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4 mt-2">
          {filteredPlayers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No transfers found matching your search criteria
            </div>
          ) : (
            filteredPlayers.map((player) => (
              <div 
                key={player.id}
                className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg border border-border bg-card/50 hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => onPlayerSelect && onPlayerSelect(player.id)}
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={player.image} 
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{player.name}</h3>
                    <p className="text-sm text-muted-foreground">{player.position}</p>
                  </div>
                </div>
                
                <div className="flex flex-grow items-center justify-center gap-2 my-4 sm:my-0">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground">From</span>
                    <span className="font-medium">{player.previousTeam}</span>
                  </div>
                  <div className="mx-4 flex items-center">
                    <ArrowRight className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground">To</span>
                    <span className="font-medium">{player.currentTeam}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-1">
                  <Badge variant={player.transferType === 'Free' ? 'secondary' : 'default'}>
                    {player.transferType}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {player.transferDate}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
};

export default PlayerTransferSearch;
