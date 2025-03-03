
import React, { useState } from 'react';
import { Play, Film, ChevronRight, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface VideoHighlight {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
  duration: string;
  views: number;
  match: string;
  category: 'goals' | 'skills' | 'saves' | 'team-play';
}

// Sample data for video highlights
const videoHighlightsData: VideoHighlight[] = [
  {
    id: '1',
    title: 'Amazing Team Goal vs United FC',
    date: '2023-05-15',
    thumbnail: 'https://placehold.co/640x360/3b82f6/FFFFFF/png?text=Team+Goal',
    duration: '0:45',
    views: 1250,
    match: 'vs United FC',
    category: 'goals'
  },
  {
    id: '2',
    title: 'Goalkeeper Triple Save',
    date: '2023-05-10',
    thumbnail: 'https://placehold.co/640x360/3b82f6/FFFFFF/png?text=Triple+Save',
    duration: '0:32',
    views: 980,
    match: 'vs City Rangers',
    category: 'saves'
  },
  {
    id: '3',
    title: 'Skill Move Exhibition',
    date: '2023-05-02',
    thumbnail: 'https://placehold.co/640x360/3b82f6/FFFFFF/png?text=Skill+Moves',
    duration: '1:12',
    views: 1560,
    match: 'vs Athletic 92',
    category: 'skills'
  },
  {
    id: '4',
    title: 'Perfect Counter Attack',
    date: '2023-04-28',
    thumbnail: 'https://placehold.co/640x360/3b82f6/FFFFFF/png?text=Counter+Attack',
    duration: '0:58',
    views: 870,
    match: 'vs Rovers United',
    category: 'team-play'
  },
  {
    id: '5',
    title: 'Last Minute Winner',
    date: '2023-04-20',
    thumbnail: 'https://placehold.co/640x360/3b82f6/FFFFFF/png?text=Last+Minute+Winner',
    duration: '1:05',
    views: 2100,
    match: 'vs West Tigers',
    category: 'goals'
  },
  {
    id: '6',
    title: 'Defensive Masterclass',
    date: '2023-04-15',
    thumbnail: 'https://placehold.co/640x360/3b82f6/FFFFFF/png?text=Defensive+Masterclass',
    duration: '1:28',
    views: 760,
    match: 'vs North Lions',
    category: 'team-play'
  }
];

const VideoHighlights: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const filteredVideos = activeCategory === 'all' 
    ? videoHighlightsData 
    : videoHighlightsData.filter(video => video.category === activeCategory);

  const formatViews = (views: number): string => {
    return views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views.toString();
  };

  return (
    <Card className="bg-card rounded-xl border border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Video Highlights</CardTitle>
          <CardDescription>Watch the best moments from recent matches</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <Film className="h-4 w-4" />
          <span className="hidden sm:inline">View All Videos</span>
        </Button>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="w-full sm:w-auto justify-start overflow-x-auto">
            <TabsTrigger value="all" onClick={() => setActiveCategory('all')}>All</TabsTrigger>
            <TabsTrigger value="goals" onClick={() => setActiveCategory('goals')}>Goals</TabsTrigger>
            <TabsTrigger value="skills" onClick={() => setActiveCategory('skills')}>Skills</TabsTrigger>
            <TabsTrigger value="saves" onClick={() => setActiveCategory('saves')}>Saves</TabsTrigger>
            <TabsTrigger value="team-play" onClick={() => setActiveCategory('team-play')}>Team Play</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVideos.map((video) => (
            <div 
              key={video.id}
              className="group relative overflow-hidden rounded-lg border border-border hover:border-primary transition-all hover:shadow-md"
            >
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                    <Play className="h-6 w-6 text-white fill-current" />
                  </div>
                </div>
                <Badge className="absolute bottom-2 right-2 bg-black/70">{video.duration}</Badge>
              </div>
              
              <div className="p-3">
                <h3 className="font-medium truncate">{video.title}</h3>
                <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{video.date}</span>
                  </div>
                  <span>{formatViews(video.views)} views</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{video.match}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoHighlights;
