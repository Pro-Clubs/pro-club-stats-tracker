import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RecentResultsStreakProps {
  results: string[]; // Array of 'W', 'L', 'D' strings
  className?: string;
}

const RecentResultsStreak: React.FC<RecentResultsStreakProps> = ({ 
  results,
  className = ""
}) => {
  // Map result codes to full text and colors
  const resultMap = {
    'W': { text: 'Win', color: 'bg-emerald-500 hover:bg-emerald-600' },
    'L': { text: 'Loss', color: 'bg-rose-500 hover:bg-rose-600' },
    'D': { text: 'Draw', color: 'bg-amber-500 hover:bg-amber-600' }
  };

  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Form</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-1.5">
          {results.map((result, index) => {
            const resultInfo = resultMap[result as keyof typeof resultMap] || 
                              { text: 'Unknown', color: 'bg-gray-500 hover:bg-gray-600' };
            
            return (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge 
                      className={`${resultInfo.color} min-w-8 h-8 flex items-center justify-center text-white font-bold`}
                    >
                      {result}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{resultInfo.text}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentResultsStreak;