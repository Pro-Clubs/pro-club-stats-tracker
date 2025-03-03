
import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  change?: number;
  className?: string;
  trend?: 'up' | 'down' | 'neutral';
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  change,
  className,
  trend = 'neutral'
}: StatCardProps) => {
  const renderTrendIcon = () => {
    if (trend === 'up') {
      return <TrendingUp className="h-4 w-4 text-emerald-500" />;
    } else if (trend === 'down') {
      return <TrendingDown className="h-4 w-4 text-rose-500" />;
    } else {
      return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-emerald-500';
    if (trend === 'down') return 'text-rose-500';
    return 'text-muted-foreground';
  };

  return (
    <div 
      className={cn(
        "bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow duration-300",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          
          {description && (
            <p className="text-xs text-muted-foreground mt-1">
              {description}
            </p>
          )}
          
          {change !== undefined && (
            <div className="flex items-center mt-3">
              {renderTrendIcon()}
              <span className={cn("text-xs font-medium ml-1", getTrendColor())}>
                {change > 0 ? '+' : ''}{change}%
              </span>
              <span className="text-xs text-muted-foreground ml-2">vs last match</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="rounded-lg bg-primary/10 p-2">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
