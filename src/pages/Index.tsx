
import React, { useState, useEffect } from 'react';
import UserIdForm from '@/components/UserIdForm';
import ProfileDisplay from '@/components/ProfileDisplay';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getUserTraitsFromStorage, getStoredUserIds } from '@/lib/storage';

const Index = () => {
  const [profileData, setProfileData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recentUserIds, setRecentUserIds] = useState<string[]>([]);

  useEffect(() => {
    // Load previously stored user IDs
    const storedIds = getStoredUserIds();
    setRecentUserIds(storedIds);
    
    // If we have recent users, load the latest one
    if (storedIds.length > 0) {
      const latestUserId = storedIds[0];
      const storedData = getUserTraitsFromStorage(latestUserId);
      if (storedData) {
        setProfileData(storedData);
      }
    }
  }, []);

  const handleProfileFetched = (data: any) => {
    setProfileData(data);
    
    // Update recent users list
    setRecentUserIds(prev => {
      const newList = [data.userId, ...prev.filter(id => id !== data.userId)];
      return newList.slice(0, 5); // Keep only the 5 most recent
    });
  };

  const loadSavedProfile = (userId: string) => {
    const storedData = getUserTraitsFromStorage(userId);
    if (storedData) {
      setProfileData(storedData);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <AnimatedBackground />
      
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-block px-3 py-1 mb-3 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wide">
            User Profile System
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            User Traits Fetcher
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Enter a user ID to fetch and display profile traits. Results will be saved both in local storage and cookies.
          </p>
        </header>
        
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-start">
          <div className="space-y-6 w-full">
            <UserIdForm 
              onProfileFetched={handleProfileFetched}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            
            {recentUserIds.length > 0 && (
              <div className="bg-card/70 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-sm animate-fade-in">
                <h3 className="text-sm font-medium text-foreground/90 mb-3">Recent Users</h3>
                <div className="flex flex-wrap gap-2">
                  {recentUserIds.map(userId => (
                    <Button
                      key={userId}
                      variant="outline"
                      size="sm"
                      className="bg-background/50 text-xs"
                      onClick={() => loadSavedProfile(userId)}
                    >
                      {userId}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Vertical separator for desktop */}
          <div className="hidden md:block h-[500px]">
            <Separator orientation="vertical" className="h-full opacity-30" />
          </div>
          
          {/* Horizontal separator for mobile */}
          <div className="md:hidden">
            <Separator className="opacity-30" />
          </div>
          
          <div className="w-full">
            {profileData ? (
              <ProfileDisplay profileData={profileData} />
            ) : (
              <div className="h-[400px] flex flex-col items-center justify-center text-center p-8 animate-pulse-subtle">
                <div className="w-16 h-16 mb-4 rounded-full bg-secondary/80"></div>
                <h3 className="text-lg font-medium text-foreground/70">No Profile Selected</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                  Enter a user ID and click "Fetch User Traits" to display profile information
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
