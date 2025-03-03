
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Activity, 
  Zap, 
  Brain, 
  Shield, 
  Target, 
  Footprints,
  Gauge
} from "lucide-react";

interface PlayerAttribute {
  name: string;
  value: number;
  category: string;
  icon: React.ReactNode;
}

interface PlayerAttributes {
  physical: PlayerAttribute[];
  mental: PlayerAttribute[];
  technical: PlayerAttribute[];
  goalkeeping?: PlayerAttribute[];
}

interface PlayerAttributesModalProps {
  player: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getAttributeColor = (value: number): string => {
  if (value >= 80) return "bg-emerald-500 text-white";
  if (value >= 65) return "bg-amber-500 text-white";
  return "bg-rose-500 text-white";
};

const AttributeBar = ({ value }: { value: number }) => {
  const width = `${value}%`;
  const bgColor = value >= 80 ? "bg-emerald-500" : value >= 65 ? "bg-amber-500" : "bg-rose-500";
  
  return (
    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden flex-grow">
      <div 
        className={`h-full ${bgColor} rounded-full`} 
        style={{ width }}
      />
    </div>
  );
};

const PlayerAttributesModal: React.FC<PlayerAttributesModalProps> = ({ 
  player, 
  open, 
  onOpenChange 
}) => {
  if (!player || !player.attributes) return null;
  
  const attributes: PlayerAttributes = player.attributes;
  
  const renderAttributeSection = (title: string, attributeList: PlayerAttribute[]) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {attributeList.map((attr) => (
          <div key={attr.name} className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              {attr.icon}
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{attr.name}</span>
                <Badge className={getAttributeColor(attr.value)}>
                  {attr.value}
                </Badge>
              </div>
              <AttributeBar value={attr.value} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{player.name} - Full Profile</DialogTitle>
          <DialogDescription>
            Detailed attributes and statistics for {player.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img 
                src={player.image} 
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">{player.name}</h2>
              <div className="flex flex-wrap gap-2 mt-1">
                <Badge variant="secondary">{player.position}</Badge>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                  Rating: {player.rating}
                </Badge>
                <Badge className="bg-secondary/80 hover:bg-secondary">
                  {player.country || "International"}
                </Badge>
              </div>
            </div>
          </div>
          
          {renderAttributeSection("Physical", attributes.physical)}
          {renderAttributeSection("Mental", attributes.mental)}
          {renderAttributeSection("Technical", attributes.technical)}
          
          {attributes.goalkeeping && 
            renderAttributeSection("Goalkeeping", attributes.goalkeeping)}
          
          <div className="mt-8 border-t border-border pt-6">
            <h3 className="text-lg font-semibold mb-3">Season Statistics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-3 text-center">
                <p className="text-sm text-muted-foreground mb-1">Matches</p>
                <p className="text-2xl font-bold">{player.matches}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-3 text-center">
                <p className="text-sm text-muted-foreground mb-1">Goals</p>
                <p className="text-2xl font-bold">{player.goals}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-3 text-center">
                <p className="text-sm text-muted-foreground mb-1">Assists</p>
                <p className="text-2xl font-bold">{player.assists}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-3 text-center">
                <p className="text-sm text-muted-foreground mb-1">Pass Acc.</p>
                <p className="text-2xl font-bold">{player.passAccuracy}%</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerAttributesModal;
