
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { fetchUserTraits } from '@/lib/api';
import { saveUserTraits } from '@/lib/storage';

interface UserIdFormProps {
  onProfileFetched: (profileData: any) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const UserIdForm: React.FC<UserIdFormProps> = ({ 
  onProfileFetched, 
  isLoading, 
  setIsLoading 
}) => {
  const [userId, setUserId] = useState('');
  const [isValid, setIsValid] = useState(true);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!userId.trim()) {
      setIsValid(false);
      toast({
        title: "User ID required",
        description: "Please enter a valid user ID",
        variant: "destructive",
      });
      return;
    }
    
    setIsValid(true);
    setIsLoading(true);
    
    try {
      const profileData = await fetchUserTraits(userId);
      
      // Save the data
      saveUserTraits(userId, profileData);
      
      // Update the UI
      onProfileFetched(profileData);
      
      toast({
        title: "Profile data retrieved",
        description: "User traits have been successfully fetched and saved",
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to fetch profile data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-card/70 backdrop-blur-sm border border-border/50 shadow-lg animate-fade-in">
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="space-y-2">
          <Label 
            htmlFor="userId" 
            className="text-sm font-medium text-foreground/90"
          >
            User ID
          </Label>
          <Input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
            className={`transition-all-200 ${!isValid ? 'border-destructive ring-destructive/20' : 'hover:border-primary/50 focus:border-primary'}`}
            aria-invalid={!isValid}
          />
          {!isValid && (
            <p className="text-sm text-destructive animate-slide-down">
              Please enter a valid user ID
            </p>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full transition-all-300 bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Fetching Profile...
            </div>
          ) : (
            'Fetch User Traits'
          )}
        </Button>
      </form>
    </Card>
  );
};

export default UserIdForm;
