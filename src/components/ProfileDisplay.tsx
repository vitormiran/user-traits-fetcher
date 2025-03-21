
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProfileDisplayProps {
  profileData: any | null;
}

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ profileData }) => {
  if (!profileData) return null;
  
  const { traits = {}, userId } = profileData;
  
  // Format JSON for display
  const formatValue = (value: any): string => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
  };

  return (
    <Card className="w-full max-w-2xl bg-card/70 backdrop-blur-sm border border-border/50 shadow-lg animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">User Profile</CardTitle>
            <CardDescription className="mt-1.5">
              ID: <span className="font-mono text-foreground/80">{userId}</span>
            </CardDescription>
          </div>
          <div className="px-2.5 py-1 bg-secondary/50 rounded-full text-xs font-medium text-secondary-foreground/70">
            Traits: {Object.keys(traits).length}
          </div>
        </div>
      </CardHeader>
      
      <Separator className="mb-0 opacity-50" />
      
      <CardContent className="pt-4">
        {Object.keys(traits).length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No traits found for this user
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {Object.entries(traits).map(([key, value], index) => (
                <div 
                  key={key} 
                  className="group p-3 rounded-md bg-background/50 hover:bg-background transition-all-200"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-sm text-foreground/90 group-hover:text-foreground">
                      {key}
                    </h3>
                    <span className="px-1.5 py-0.5 text-[10px] rounded bg-primary/10 text-primary/90 font-mono">
                      {Array.isArray(value) ? 'array' : typeof value}
                    </span>
                  </div>
                  
                  <div className="mt-1.5 font-mono text-xs text-muted-foreground break-words whitespace-pre-wrap">
                    {formatValue(value)}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileDisplay;
