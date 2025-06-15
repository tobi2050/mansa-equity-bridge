
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const SettingsTab = () => {
  const { authState } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile', authState.userId],
    queryFn: async () => {
      if (!authState.userId) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('default_contribution_mode')
        .eq('id', authState.userId)
        .maybeSingle(); // Use maybeSingle to prevent error if no row found
      
      if (error) {
        // maybeSingle handles the 'PGRST116' (0 rows) case by returning null.
        // We only throw for other, unexpected errors.
        throw error;
      }
      return data;
    },
    enabled: !!authState.userId,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (updates: { default_contribution_mode: 'investing' | 'donating' | 'supporting' }) => {
      if (!authState.userId) throw new Error("User not found");
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', authState.userId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', authState.userId] });
      toast({
        title: "Settings saved",
        description: "Your profile settings have been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error saving settings",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleModeChange = (value: 'investing' | 'donating' | 'supporting') => {
    updateProfileMutation.mutate({ default_contribution_mode: value });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Manage your investor profile settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoadingProfile ? (
            <p>Loading settings...</p>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="contribution-mode">Default Contribution Mode</Label>
              <Select
                value={profile?.default_contribution_mode || 'investing'}
                onValueChange={(value: 'investing' | 'donating' | 'supporting') => handleModeChange(value)}
                disabled={updateProfileMutation.isPending}
              >
                <SelectTrigger id="contribution-mode" className="w-[280px]">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="investing">Investing</SelectItem>
                  <SelectItem value="donating">Donating</SelectItem>
                  <SelectItem value="supporting">Supporting</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Investing provides equity, Donating is philanthropic, Supporting validates a business.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
